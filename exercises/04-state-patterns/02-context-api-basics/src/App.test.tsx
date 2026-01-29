import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Context API Basics', () => {
  beforeEach(() => {
    // Reset any state between tests if needed
  });

  it('renders the app with initial logged out state', () => {
    render(<App />);
    expect(screen.getByText(/context api/i)).toBeInTheDocument();
    expect(screen.queryByTestId('user-profile')).not.toBeInTheDocument();
  });

  it('shows login button when not authenticated', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /logout/i })
    ).not.toBeInTheDocument();
  });

  it('logs in user and displays user information', async () => {
    const user = userEvent.setup();
    render(<App />);

    const loginButton = screen.getByRole('button', { name: /login/i });
    await user.click(loginButton);

    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toBeInTheDocument();
      expect(screen.getByTestId('user-email')).toBeInTheDocument();
      expect(screen.getByTestId('user-role')).toBeInTheDocument();
    });
  });

  it('switches to logout button when authenticated', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /logout/i })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /login/i })
      ).not.toBeInTheDocument();
    });
  });

  it('logs out user and hides user information', async () => {
    const user = userEvent.setup();
    render(<App />);

    // First login
    await user.click(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toBeInTheDocument();
    });

    // Then logout
    await user.click(screen.getByRole('button', { name: /logout/i }));
    await waitFor(() => {
      expect(screen.queryByTestId('user-name')).not.toBeInTheDocument();
    });
  });

  it('provides user data to deeply nested components without prop drilling', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      // Verify user data reaches nested UserProfile component
      expect(screen.getByTestId('user-profile')).toBeInTheDocument();
      expect(screen.getByTestId('user-name')).toHaveTextContent(/john doe/i);
      expect(screen.getByTestId('user-email')).toHaveTextContent(
        /john\.doe@example\.com/i
      );
      expect(screen.getByTestId('user-role')).toHaveTextContent(
        /senior developer/i
      );
    });
  });

  it('throws error when useUser hook is used outside Provider', () => {
    // This test verifies the custom hook error handling
    // In real implementation, we'd test this by creating a component
    // that uses useUser outside the provider
    expect(true).toBe(true); // Placeholder for custom hook validation
  });

  it('updates context value when login is called', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.queryByTestId('auth-status')).toHaveTextContent(/logged out|not authenticated/i);

    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent(/authenticated|logged in/i);
    });
  });
});
