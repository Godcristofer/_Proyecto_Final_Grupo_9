/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './page';
import { useToast } from '@/hooks/use-toast';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Mock the necessary hooks and modules
jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(() => ({
    toast: jest.fn(),
  })),
}));
jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock('@/hooks/use-auth', () => ({
  useAuth: () => ({ user: null, loading: false }),
}));

describe('LoginPage', () => {
  const mockToast = jest.fn();

  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (signInWithEmailAndPassword as jest.Mock).mockClear();
    mockToast.mockClear();
  });

  it('shows an error toast for incorrect credentials', async () => {
    const user = userEvent.setup();
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue({
      code: 'auth/invalid-credential',
    });

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/Correo Electrónico/i), 'wrong@example.com');
    await user.type(screen.getByLabelText(/Contraseña/i), 'wrongpassword');

    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        variant: 'destructive',
        title: 'Error al iniciar sesión',
        description: 'Correo electrónico o contraseña incorrectos.',
      });
    });
  });
});