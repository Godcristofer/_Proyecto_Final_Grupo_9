/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from './product-card';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';
import { useRouter } from 'next/navigation';

// Mock hooks
jest.mock('@/hooks/use-cart');
jest.mock('@/hooks/use-auth');
jest.mock('@/hooks/use-toast');

const mockProduct: Product = {
  id: 'prod123',
  name: 'Teclado Mecánico RGB',
  price: 250,
  category: 'Teclados',
  image: 'https://placehold.co/600x400.png',
  description: 'Un teclado increíble.',
  data_ai_hint: 'mechanical keyboard',
};

describe('ProductCard', () => {
  const mockAddToCart = jest.fn();
  const mockToast = jest.fn();
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
    });
    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
    });
    (useRouter as jest.Mock).mockReturnValue({
        push: mockRouterPush,
    });
    mockAddToCart.mockClear();
    mockToast.mockClear();
    mockRouterPush.mockClear();
  });

  it('calls addToCart when the user is logged in', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { uid: 'test-user' } });
    render(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole('button', { name: /Agregar al carrito/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
      expect(mockAddToCart).toHaveBeenCalledTimes(1);
    });
    
    // Check that the "Adding..." state is temporary
    expect(await screen.findByRole('button', { name: /Agregar al carrito/i })).toBeInTheDocument();
  });

  it('shows a toast and does not call addToCart if the user is not logged in', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole('button', { name: /Agregar al carrito/i });
    await user.click(addButton);
    
    expect(mockAddToCart).not.toHaveBeenCalled();
    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Inicia Sesión',
      description: 'Debes iniciar sesión para agregar productos al carrito.',
      variant: 'destructive'
    }));
  });
});
