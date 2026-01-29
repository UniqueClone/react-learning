import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Render Props Pattern', () => {
  it('renders the render props application', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /render props pattern/i })
    ).toBeInTheDocument();
  });

  it('displays mouse tracker section', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /mouse tracker examples/i })
    ).toBeInTheDocument();
  });

  it('displays toggle section', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /toggle examples/i })
    ).toBeInTheDocument();
  });

  it('tracks mouse position', () => {
    render(<App />);

    fireEvent.mouseMove(window, { clientX: 100, clientY: 200 });

    expect(screen.getByText(/x: 100/i)).toBeInTheDocument();
    expect(screen.getByText(/y: 200/i)).toBeInTheDocument();
  });

  it('updates mouse position on mouse move', () => {
    render(<App />);

    fireEvent.mouseMove(window, { clientX: 50, clientY: 75 });
    expect(screen.getByText(/x: 50/i)).toBeInTheDocument();

    fireEvent.mouseMove(window, { clientX: 150, clientY: 225 });
    expect(screen.getByText(/x: 150/i)).toBeInTheDocument();
  });

  it('toggles state when button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggleButtons = screen.getAllByRole('button', { name: /toggle/i });
    const firstToggle = toggleButtons[0];

    expect(screen.getByText(/status: off/i)).toBeInTheDocument();

    await user.click(firstToggle);

    expect(screen.getByText(/status: on/i)).toBeInTheDocument();
  });

  it('maintains independent state for multiple toggle instances', async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggleButtons = screen.getAllByRole('button', { name: /toggle/i });

    await user.click(toggleButtons[0]);

    const statusTexts = screen.getAllByText(/status:/i);
    expect(statusTexts[0]).toHaveTextContent('Status: ON');
    expect(statusTexts[1]).toHaveTextContent('Status: OFF');
  });

  it('shows visual indicator that follows mouse', () => {
    const { container } = render(<App />);

    fireEvent.mouseMove(window, { clientX: 100, clientY: 200 });

    const indicator = container.querySelector('.mouse-indicator');
    expect(indicator).toBeInTheDocument();
  });
});
