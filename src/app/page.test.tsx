/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import HomePage from './page'
 

jest.mock('@firebasegen/default-2-connector', () => ({
  ...jest.requireActual('@firebasegen/default-2-connector'),
  listProducts: jest.fn().mockResolvedValue({ data: { productss: [] } }),
}));

jest.mock('@/lib/firebase', () => ({
  getFirebaseApp: jest.fn(() => ({})),
}));

describe('HomePage', () => {
  it('renders a heading with the company name', async () => {
    render(await HomePage())
 
    const heading = screen.getByRole('heading', {
      name: /comcorp/i,
      level: 1,
    })
 
    expect(heading).toBeInTheDocument()
  })
})