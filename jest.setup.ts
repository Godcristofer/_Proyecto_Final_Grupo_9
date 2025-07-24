import '@testing-library/jest-dom'

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
    createSale: jest.fn(),
    createSaleDetail: jest.fn(),
    createShipment: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      refresh: jest.fn(),
    };
  },
  usePathname() {
    return '/';
  }
}));