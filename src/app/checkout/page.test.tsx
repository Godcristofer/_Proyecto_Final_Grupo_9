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

// Mock hooks and modules
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

    // Click the submit button without filling out the form
    fireEvent.click(screen.getByRole('button', { name: /Realizar Pedido/i }));

    // Check for validation messages
    await waitFor(() => {
      expect(screen.getByText('La dirección debe tener al menos 5 caracteres.')).toBeInTheDocument();
      expect(screen.getByText('La ciudad debe tener al menos 2 caracteres.')).toBeInTheDocument();
    });

    // Verify that the createSale mutation was NOT called
    expect(createSale).not.toHaveBeenCalled();
  });

  it('successfully submits the form with valid data', async () => {
    const user = userEvent.setup();
    // Mock a successful response from the createSale mutation
    (createSale as jest.Mock).mockResolvedValue({ data: { sales_insert: { id: 'sale123' } } });

    render(<CheckoutPage />);

    // Fill the form with valid data
    await user.type(screen.getByLabelText(/Dirección/i), '123 Main St');
    await user.type(screen.getByLabelText(/Ciudad/i), 'Anytown');

    // Click the submit button
    fireEvent.click(screen.getByRole('button', { name: /Realizar Pedido/i }));

    // Wait for the submission to process and check results
    await waitFor(() => {
      // Check that the mutation was called with the correct data
      expect(createSale).toHaveBeenCalledWith(
        expect.anything(), // dataConnect instance
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


    // Check that the success toast was shown and the cart was cleared
    await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith({
            title: '¡Compra exitosa!',
            description: 'Tu pedido ha sido realizado correctamente.',
        });
        expect(mockClearCart).toHaveBeenCalled();
    });
  });
});