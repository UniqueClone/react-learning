import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Context with Reducer - Shopping Cart', () => {
  it('renders the shopping cart application', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /shopping cart with context \+ reducer/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /products/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /shopping cart/i })).toBeInTheDocument();
  });

  it('displays all products', () => {
    render(<App />);
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Mouse')).toBeInTheDocument();
    expect(screen.getByText('Keyboard')).toBeInTheDocument();
    expect(screen.getByText('Monitor')).toBeInTheDocument();
    expect(screen.getByText('$999')).toBeInTheDocument();
    expect(screen.getByText('$29')).toBeInTheDocument();
    expect(screen.getByText('$79')).toBeInTheDocument();
    expect(screen.getByText('$299')).toBeInTheDocument();
  });

  it('shows empty cart initially', () => {
    render(<App />);
    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  });

  it('adds item to cart when clicking Add to Cart button', async () => {
    const user = userEvent.setup();
    render(<App />);

    const laptopButton = screen.getAllByRole('button', { name: /add to cart/i })[0];
    await user.click(laptopButton);

    expect(screen.queryByText(/cart is empty/i)).not.toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText(/quantity: 1/i)).toBeInTheDocument();
  });

  it('increases quantity when adding the same item multiple times', async () => {
    const user = userEvent.setup();
    render(<App />);

    const mouseButton = screen.getAllByRole('button', { name: /add to cart/i })[1];
    await user.click(mouseButton);
    await user.click(mouseButton);
    await user.click(mouseButton);

    expect(screen.getByText(/quantity: 3/i)).toBeInTheDocument();
  });

  it('increases and decreases quantity with + and - buttons', async () => {
    const user = userEvent.setup();
    render(<App />);

    const keyboardButton = screen.getAllByRole('button', { name: /add to cart/i })[2];
    await user.click(keyboardButton);

    const increaseButton = screen.getByRole('button', { name: '+' });
    await user.click(increaseButton);
    await user.click(increaseButton);

    expect(screen.getByText(/quantity: 3/i)).toBeInTheDocument();

    const decreaseButton = screen.getByRole('button', { name: '-' });
    await user.click(decreaseButton);

    expect(screen.getByText(/quantity: 2/i)).toBeInTheDocument();
  });

  it('removes item when quantity reaches 0', async () => {
    const user = userEvent.setup();
    render(<App />);

    const monitorButton = screen.getAllByRole('button', { name: /add to cart/i })[3];
    await user.click(monitorButton);

    expect(screen.getByText('Monitor')).toBeInTheDocument();

    const decreaseButton = screen.getByRole('button', { name: '-' });
    await user.click(decreaseButton);

    expect(screen.queryByText('Monitor')).not.toBeInTheDocument();
    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  });

  it('removes item when clicking Remove button', async () => {
    const user = userEvent.setup();
    render(<App />);

    const laptopButton = screen.getAllByRole('button', { name: /add to cart/i })[0];
    await user.click(laptopButton);

    expect(screen.getByText('Laptop')).toBeInTheDocument();

    const removeButton = screen.getByRole('button', { name: /remove/i });
    await user.click(removeButton);

    expect(screen.queryByText('Laptop')).not.toBeInTheDocument();
    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  });

  it('calculates total price correctly', async () => {
    const user = userEvent.setup();
    render(<App />);

    const laptopButton = screen.getAllByRole('button', { name: /add to cart/i })[0];
    const mouseButton = screen.getAllByRole('button', { name: /add to cart/i })[1];

    await user.click(laptopButton);
    await user.click(mouseButton);
    await user.click(mouseButton);

    // Laptop: $999, Mouse: $29 x 2 = $1057
    expect(screen.getByText(/total: \$1057/i)).toBeInTheDocument();
  });

  it('clears all items when clicking Clear Cart button', async () => {
    const user = userEvent.setup();
    render(<App />);

    const laptopButton = screen.getAllByRole('button', { name: /add to cart/i })[0];
    const mouseButton = screen.getAllByRole('button', { name: /add to cart/i })[1];

    await user.click(laptopButton);
    await user.click(mouseButton);

    expect(screen.queryByText(/cart is empty/i)).not.toBeInTheDocument();

    const clearButton = screen.getByRole('button', { name: /clear cart/i });
    await user.click(clearButton);

    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  });

  it('handles multiple different items in cart', async () => {
    const user = userEvent.setup();
    render(<App />);

    const addToCartButtons = screen.getAllByRole('button', { name: /add to cart/i });

    // Add all products
    await user.click(addToCartButtons[0]); // Laptop
    await user.click(addToCartButtons[1]); // Mouse
    await user.click(addToCartButtons[2]); // Keyboard
    await user.click(addToCartButtons[3]); // Monitor

    // Add duplicates
    await user.click(addToCartButtons[1]); // Mouse x2
    await user.click(addToCartButtons[2]); // Keyboard x2

    // Total: $999 + $29*2 + $79*2 + $299 = $1514
    expect(screen.getByText(/total: \$1514/i)).toBeInTheDocument();
  });
});
