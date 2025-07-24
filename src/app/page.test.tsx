/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import HomePage from './page'
 
// Mocking listProducts because it's a server-side async function.
// This is a common pattern for testing components that fetch data.
jest.mock('@firebasegen/default-2-connector', () => ({
  ...jest.requireActual('@firebasegen/default-2-connector'),
  listProducts: jest.fn().mockResolvedValue({ data: { productss: [] } }),
}));

// Mocking getFirebaseApp to avoid Firebase initialization errors in a test environment.
jest.mock('@/lib/firebase', () => ({
  getFirebaseApp: jest.fn(() => ({})),
}));

describe('HomePage', () => {
  it('renders a heading with the company name', async () => {
    // Since HomePage is now an async component, we must await its rendering.
    render(await HomePage())
 
    const heading = screen.getByRole('heading', {
      name: /comcorp/i,
      level: 1, // Specifies that it should be an <h1> tag
    })
 
    expect(heading).toBeInTheDocument()
  })
})