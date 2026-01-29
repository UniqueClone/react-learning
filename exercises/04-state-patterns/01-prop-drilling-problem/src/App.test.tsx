import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Prop Drilling Problem', () => {
  it('renders the app with all nested components', () => {
    render(<App />);
    expect(screen.getByText('Prop Drilling Example')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('User Menu')).toBeInTheDocument();
    expect(screen.getByText('User Profile')).toBeInTheDocument();
  });

  it('passes user data through all 6 levels to reach UserProfile', () => {
    render(<App />);
    expect(screen.getByTestId('user-name')).toHaveTextContent('Name: John Doe');
    expect(screen.getByTestId('user-role')).toHaveTextContent(
      'Role: Senior Developer'
    );
    expect(screen.getByTestId('user-department')).toHaveTextContent(
      'Department: Engineering'
    );
    expect(screen.getByTestId('user-id')).toHaveTextContent('ID: 1');
  });

  it('applies theme styles to the UserProfile component', () => {
    render(<App />);
    const userProfile = screen.getByTestId('user-name').parentElement;
    expect(userProfile).toHaveStyle({
      color: 'rgb(59, 130, 246)', // #3b82f6 in rgb
      fontSize: '16px',
    });
  });

  it('demonstrates that intermediate components only pass props without using them', () => {
    render(<App />);
    // This test verifies that the data reaches the end component
    // In a real scenario, intermediate components are just prop conduits
    const userProfile = screen.getByText('User Profile');
    expect(userProfile).toBeInTheDocument();
    expect(screen.getByTestId('user-name')).toBeInTheDocument();
  });

  it('shows the maintenance problem: data travels through multiple levels', () => {
    render(<App />);
    // Count the header levels - each represents a component level
    expect(screen.getByRole('heading', { name: 'Prop Drilling Example' }))
      .toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sidebar' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Navigation' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'User Menu' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'User Profile' })).toBeInTheDocument();
  });

  it('works functionally but has code smell issues', () => {
    render(<App />);
    // The code works - all data reaches its destination
    expect(screen.getByTestId('user-name')).toHaveTextContent('John Doe');

    // But imagine adding a new field like "email":
    // 1. Update User interface
    // 2. Update DashboardProps
    // 3. Update SidebarProps
    // 4. Update NavigationProps
    // 5. Update UserMenuProps
    // 6. Update UserProfileProps
    // 7. Pass email through Dashboard
    // 8. Pass email through Sidebar
    // 9. Pass email through Navigation
    // 10. Pass email through UserMenu
    // 11. Finally use it in UserProfile
    // That's 11 changes across 6 files! This is the problem.
  });

  it('verifies the component hierarchy depth', () => {
    const { container } = render(<App />);

    // Verify nested structure exists
    const dashboard = container.querySelector('.dashboard');
    expect(dashboard).toBeInTheDocument();

    const sidebar = container.querySelector('.sidebar');
    expect(sidebar).toBeInTheDocument();

    const navigation = container.querySelector('.navigation');
    expect(navigation).toBeInTheDocument();

    const userMenu = container.querySelector('.user-menu');
    expect(userMenu).toBeInTheDocument();

    const userProfile = container.querySelector('.user-profile');
    expect(userProfile).toBeInTheDocument();
  });

  it('illustrates tight coupling between components', () => {
    render(<App />);

    // All these components are tightly coupled through props
    // Changing the User type affects 6 component interfaces
    // This makes refactoring difficult and error-prone
    expect(screen.getByTestId('user-name')).toBeInTheDocument();
    expect(screen.getByTestId('user-role')).toBeInTheDocument();
    expect(screen.getByTestId('user-department')).toBeInTheDocument();
    expect(screen.getByTestId('user-id')).toBeInTheDocument();
  });
});
