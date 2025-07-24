/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckoutPage from './page';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { createSale, createSaleDetail, createShipment } from '@firebasegen/default-2-connector';

jest.mock('@/hooks/use-cart');
jest.mock('@/hooks/use-auth');
jest.mock('@/hooks/use-toast');

describe('CheckoutPage', () => {
  const mockToast = jest.fn();
  const mockClearCart = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ user: { uid: 'test-user-id' }, loading: false });
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [{ product: { id: 'prod1', name: 'Test Product', price: 100 }, quantity: 1 }],
      cartTotal: 100,
      clearCart: mockClearCart,
      isLoading: false,
    });
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (createSale as jest.Mock).mockClear();
    (createSaleDetail as jest.Mock).mockClear();
    (createShipment as jest.Mock).mockClear();
    mockClearCart.mockClear();
  });

  it('shows validation errors when submitting with empty required fields', async () => {
    render(<CheckoutPage />);

    fireEvent.click(screen.getByRole('button', { name: /Realizar Pedido/i }));

    await waitFor(() => {
      expect(screen.getByText('La dirección debe tener al menos 5 caracteres.')).toBeInTheDocument();
      expect(screen.getByText('La ciudad debe tener al menos 2 caracteres.')).toBeInTheDocument();
    });

    expect(createSale).not.toHaveBeenCalled();
  });

  it('successfully submits the form with valid data', async () => {
    const user = userEvent.setup();
    (createSale as jest.Mock).mockResolvedValue({ data: { sales_insert: { id: 'sale123' } } });

    render(<CheckoutPage />);

    await user.type(screen.getByLabelText(/Dirección/i), '123 Main St');
    await user.type(screen.getByLabelText(/Ciudad/i), 'Anytown');

    fireEvent.click(screen.getByRole('button', { name: /Realizar Pedido/i }));

    await waitFor(() => {
      expect(createSale).toHaveBeenCalledWith(
        expect.anything(), 
        expect.objectContaining({
          userId: 'test-user-id',
          total: 100,
        })
      );
    });

    await waitFor(() => {
      expect(createSaleDetail).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
            saleId: 'sale123',
            productId: 'prod1',
            quantity: 1
        })
      );
    });

    await waitFor(() => {
        expect(createShipment).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({
                saleId: 'sale123',
                address: '123 Main St',
                city: 'Anytown'
            })
        );
    });


    await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith({
            title: '¡Compra exitosa!',
            description: 'Tu pedido ha sido realizado correctamente.',
        });
        expect(mockClearCart).toHaveBeenCalled();
    });
  });
});