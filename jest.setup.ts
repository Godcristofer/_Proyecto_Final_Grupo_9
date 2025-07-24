import '@testing-library/jest-dom';
import '@testing-library/user-event';

jest.mock('@/lib/firebase', () => ({
  getFirebaseApp: jest.fn(() => ({})),
  getFirebaseAuth: jest.fn(() => ({})),
}));

jest.mock('@/lib/users', () => ({
  ...jest.requireActual('@/lib/users'),
  createUser: jest.fn(),
  getUserById: jest.fn(),
  getUsers: jest.fn(),
  updateUserRole: jest.fn(),
}));

jest.mock('@firebasegen/default-2-connector', () => ({
    ...jest.requireActual('@firebasegen/default-2-connector'),
    listProducts: jest.fn().mockResolvedValue({ data: { productss: [] } }),
    createSale: jest.fn().mockResolvedValue({ data: { sales_insert: { id: 'mock-sale-id' } } }),
    createSaleDetail: jest.fn().mockResolvedValue({ data: { saleDetails_insert: { id: 'mock-detail-id' } } }),
    createShipment: jest.fn().mockResolvedValue({ data: { shipments_insert: { id: 'mock-shipment-id' } } }),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  usePathname() {
    return '/';
  }
}));
