import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('State Machine Pattern', () => {
  it('starts on personal step', () => {
    render(<App />);
    expect(screen.getByText(/personal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  it('navigates to address step', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(screen.getByText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/street/i)).toBeInTheDocument();
  });

  it('can go back to previous step', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/name/i), 'John');
    await user.click(screen.getByRole('button', { name: /next/i }));
    await user.click(screen.getByRole('button', { name: /previous/i }));

    expect(screen.getByText(/personal/i)).toBeInTheDocument();
  });

  it('navigates to review step', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/name/i), 'John');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.click(screen.getByRole('button', { name: /next/i }));

    await user.type(screen.getByLabelText(/street/i), '123 Main St');
    await user.type(screen.getByLabelText(/city/i), 'Springfield');
    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(screen.getByText(/review/i)).toBeInTheDocument();
  });

  it('shows submit button only on review step', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.queryByRole('button', { name: /submit/i })).not.toBeInTheDocument();

    await user.type(screen.getByLabelText(/name/i), 'John');
    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.queryByRole('button', { name: /submit/i })).not.toBeInTheDocument();

    await user.type(screen.getByLabelText(/street/i), '123 Main');
    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('displays entered data on review step', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.click(screen.getByRole('button', { name: /next/i }));

    await user.type(screen.getByLabelText(/street/i), '123 Main St');
    await user.type(screen.getByLabelText(/city/i), 'Springfield');
    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/123 main st/i)).toBeInTheDocument();
    expect(screen.getByText(/springfield/i)).toBeInTheDocument();
  });

  it('resets form after submission', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/name/i), 'John');
    await user.click(screen.getByRole('button', { name: /next/i }));
    await user.type(screen.getByLabelText(/street/i), '123 Main');
    await user.click(screen.getByRole('button', { name: /next/i }));
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/personal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toHaveValue('');
  });

  it('shows current step indicator', () => {
    render(<App />);
    expect(screen.getByText(/step 1|personal/i)).toBeInTheDocument();
  });

  it('preserves data when going back', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.click(screen.getByRole('button', { name: /next/i }));
    await user.click(screen.getByRole('button', { name: /previous/i }));

    expect(screen.getByLabelText(/name/i)).toHaveValue('John Doe');
  });

  it('hides previous button on first step', () => {
    render(<App />);
    expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument();
  });
});
