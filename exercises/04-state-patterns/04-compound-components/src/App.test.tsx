import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Compound Component Pattern - Accordion', () => {
  it('renders the accordion application', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /compound component pattern/i })
    ).toBeInTheDocument();
  });

  it('displays all accordion items', () => {
    render(<App />);
    expect(screen.getByText('What is React?')).toBeInTheDocument();
    expect(screen.getByText('What is TypeScript?')).toBeInTheDocument();
    expect(screen.getByText('What is Vite?')).toBeInTheDocument();
  });

  it('hides all content initially', () => {
    render(<App />);
    expect(
      screen.queryByText(/React is a JavaScript library/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/TypeScript is a typed superset/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Vite is a build tool/i)).not.toBeInTheDocument();
  });

  it('shows content when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const trigger = screen.getByText('What is React?');
    await user.click(trigger);

    expect(
      screen.getByText(/React is a JavaScript library/i)
    ).toBeInTheDocument();
  });

  it('hides content when trigger is clicked again', async () => {
    const user = userEvent.setup();
    render(<App />);

    const trigger = screen.getByText('What is TypeScript?');
    await user.click(trigger);

    expect(
      screen.getByText(/TypeScript is a typed superset/i)
    ).toBeInTheDocument();

    await user.click(trigger);

    expect(
      screen.queryByText(/TypeScript is a typed superset/i)
    ).not.toBeInTheDocument();
  });

  it('only allows one item to be open at a time', async () => {
    const user = userEvent.setup();
    render(<App />);

    const reactTrigger = screen.getByText('What is React?');
    const typescriptTrigger = screen.getByText('What is TypeScript?');

    await user.click(reactTrigger);
    expect(
      screen.getByText(/React is a JavaScript library/i)
    ).toBeInTheDocument();

    await user.click(typescriptTrigger);
    expect(
      screen.queryByText(/React is a JavaScript library/i)
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/TypeScript is a typed superset/i)
    ).toBeInTheDocument();
  });

  it('applies correct styles to open and closed items', async () => {
    const user = userEvent.setup();
    render(<App />);

    const trigger = screen.getByText('What is Vite?');
    const item = trigger.closest('.accordion-item');

    expect(item).not.toHaveClass('open');

    await user.click(trigger);

    expect(item).toHaveClass('open');
  });

  it('handles multiple clicks correctly', async () => {
    const user = userEvent.setup();
    render(<App />);

    const reactTrigger = screen.getByText('What is React?');
    const typescriptTrigger = screen.getByText('What is TypeScript?');
    const viteTrigger = screen.getByText('What is Vite?');

    await user.click(reactTrigger);
    expect(
      screen.getByText(/React is a JavaScript library/i)
    ).toBeInTheDocument();

    await user.click(viteTrigger);
    expect(screen.queryByText(/React is a JavaScript library/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Vite is a build tool/i)).toBeInTheDocument();

    await user.click(typescriptTrigger);
    expect(screen.queryByText(/Vite is a build tool/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/TypeScript is a typed superset/i)
    ).toBeInTheDocument();

    await user.click(typescriptTrigger);
    expect(
      screen.queryByText(/TypeScript is a typed superset/i)
    ).not.toBeInTheDocument();
  });
});
