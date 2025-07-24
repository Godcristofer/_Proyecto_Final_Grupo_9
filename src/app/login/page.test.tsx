/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './page';
import { useToast } from '@/hooks/use-toast';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

// Mock the necessary hooks and modules
jest.mock('@/hooks/use-toast');
jest.mock('firebase/auth');
jest.mock('next/navigation');
jest.mock('@/hooks/use-auth', () => ({
  useAuth: () => ({ user: null, loading: false }),
}));

describe('LoginPage', () => {
  const mockToast = jest.fn();
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (signInWithEmailAndPassword as jest.Mock).mockClear();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    mockToast.mockClear();
    mockRouterPush.mockClear();
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

  it('shows a success toast and redirects on successful login', async () => {
    const user = userEvent.setup();
    const mockUserCredential = {
      user: { uid: '123', email: 'test@example.com' },
    };
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/Correo Electrónico/i), 'test@example.com');
    await user.type(screen.getByLabelText(/Contraseña/i), 'password123');

    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
    });
    
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: '¡Bienvenido de nuevo!',
        description: 'Has iniciado sesión correctamente.',
      });
      expect(mockRouterPush).toHaveBeenCalledWith('/');
    });
  });
});
