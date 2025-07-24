/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignupPage from './page';
import { useToast } from '@/hooks/use-toast';
import { createUser } from '@/lib/users';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';

// Mock the necessary hooks and modules
jest.mock('@/hooks/use-toast');
jest.mock('firebase/auth');
jest.mock('@/lib/users');
jest.mock('next/navigation');


describe('SignupPage', () => {
  const mockToast = jest.fn();
  const mockRouterPush = jest.fn();
  
  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (createUser as jest.Mock).mockClear();
    (createUserWithEmailAndPassword as jest.Mock).mockClear();
    (updateProfile as jest.Mock).mockClear();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    mockToast.mockClear();
    mockRouterPush.mockClear();
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

  it('successfully creates an account and shows success toast', async () => {
    const user = userEvent.setup();
    const mockUserCredential = {
      user: { uid: '123', email: 'new@example.com' },
    };
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);
    (createUser as jest.Mock).mockResolvedValue({ success: true });
     (updateProfile as jest.Mock).mockResolvedValue(undefined);

    render(<SignupPage />);

    await user.type(screen.getByLabelText(/Nombre/i), 'New User');
    await user.type(screen.getByLabelText(/Correo Electrónico/i), 'new@example.com');
    await user.type(screen.getByLabelText(/Contraseña/i), 'password123');

    fireEvent.click(screen.getByRole('button', { name: /Crear Cuenta/i }));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'new@example.com',
        'password123'
      );

      expect(updateProfile).toHaveBeenCalledWith(mockUserCredential.user, {
        displayName: 'New User'
      });

      expect(createUser).toHaveBeenCalledWith({
        id: '123',
        email: 'new@example.com',
        name: 'New User',
        dni: '',
        phone: '',
      });
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: '¡Cuenta creada!',
        description: 'Tu cuenta ha sido creada exitosamente.',
      });
      expect(mockRouterPush).toHaveBeenCalledWith('/');
    });
  });
});
