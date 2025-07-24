/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignupPage from './page';
import { useToast } from '@/hooks/use-toast';
import { getFirebaseAuth } from '@/lib/firebase';
import { createUser } from '@/lib/users';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Mock the necessary hooks and modules
jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(() => ({
    toast: jest.fn(),
  })),
}));
jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  createUserWithEmailAndPassword: jest.fn(),
}));


describe('SignupPage', () => {
  const mockToast = jest.fn();
  
  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (createUser as jest.Mock).mockClear();
    (createUserWithEmailAndPassword as jest.Mock).mockClear();
    mockToast.mockClear();
  });

  it('shows an error toast when signup fails because email is already in use', async () => {
    const user = userEvent.setup();
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue({
      code: 'auth/email-already-in-use',
    });

    render(<SignupPage />);

    await user.type(screen.getByLabelText(/Nombre/i), 'Test User');
    await user.type(screen.getByLabelText(/Correo Electrónico/i), 'test@example.com');
    await user.type(screen.getByLabelText(/Contraseña/i), 'password123');

    fireEvent.click(screen.getByRole('button', { name: /Crear Cuenta/i }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        variant: 'destructive',
        title: 'Error al crear la cuenta',
        description: 'Este correo electrónico ya está en uso.',
      });
    });
  });

  it('shows validation errors for invalid form data', async () => {
    const user = userEvent.setup();
    render(<SignupPage />);

    await user.type(screen.getByLabelText(/Nombre/i), 'A');
    await user.type(screen.getByLabelText(/Correo Electrónico/i), 'not-an-email');
    await user.type(screen.getByLabelText(/Contraseña/i), '123');
    
    fireEvent.click(screen.getByRole('button', { name: /Crear Cuenta/i }));

    await waitFor(() => {
        expect(screen.getByText('El nombre debe tener al menos 2 caracteres.')).toBeInTheDocument();
        expect(screen.getByText('Dirección de correo electrónico inválida.')).toBeInTheDocument();
        expect(screen.getByText('La contraseña debe tener al menos 6 caracteres.')).toBeInTheDocument();
    });
  });
});