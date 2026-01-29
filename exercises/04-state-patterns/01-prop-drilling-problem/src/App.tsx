import { useState } from 'react';
import './index.css';

interface User {
  id: number;
  name: string;
  role: string;
  department: string;
}

interface Theme {
  primaryColor: string;
  fontSize: string;
}

// Level 1: App component (top level)
function App() {
  const [user] = useState<User>({
    id: 1,
    name: 'John Doe',
    role: 'Senior Developer',
    department: 'Engineering',
  });

  const [theme] = useState<Theme>({
    primaryColor: '#3b82f6',
    fontSize: '16px',
  });

  return (
    <div className="app">
      <h1>Prop Drilling Example</h1>
      <p className="subtitle">Data flows through 5+ component levels</p>
      <Dashboard user={user} theme={theme} />
    </div>
  );
}

// Level 2: Dashboard (just passes props down)
interface DashboardProps {
  user: User;
  theme: Theme;
}

function Dashboard({ user, theme }: DashboardProps) {
  // This component doesn't use user or theme, just passes them down
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <Sidebar user={user} theme={theme} />
    </div>
  );
}

// Level 3: Sidebar (just passes props down)
interface SidebarProps {
  user: User;
  theme: Theme;
}

function Sidebar({ user, theme }: SidebarProps) {
  // This component doesn't use user or theme, just passes them down
  return (
    <aside className="sidebar">
      <h3>Sidebar</h3>
      <Navigation user={user} theme={theme} />
    </aside>
  );
}

// Level 4: Navigation (just passes props down)
interface NavigationProps {
  user: User;
  theme: Theme;
}

function Navigation({ user, theme }: NavigationProps) {
  // This component doesn't use user or theme, just passes them down
  return (
    <nav className="navigation">
      <h4>Navigation</h4>
      <UserMenu user={user} theme={theme} />
    </nav>
  );
}

// Level 5: UserMenu (just passes props down)
interface UserMenuProps {
  user: User;
  theme: Theme;
}

function UserMenu({ user, theme }: UserMenuProps) {
  // This component doesn't use user or theme, just passes them down
  return (
    <div className="user-menu">
      <h5>User Menu</h5>
      <UserProfile user={user} theme={theme} />
    </div>
  );
}

// Level 6: UserProfile (finally uses the props!)
interface UserProfileProps {
  user: User;
  theme: Theme;
}

function UserProfile({ user, theme }: UserProfileProps) {
  // Finally! This component actually uses the data
  return (
    <div
      className="user-profile"
      style={{
        color: theme.primaryColor,
        fontSize: theme.fontSize,
      }}
    >
      <h6>User Profile</h6>
      <p data-testid="user-name">Name: {user.name}</p>
      <p data-testid="user-role">Role: {user.role}</p>
      <p data-testid="user-department">Department: {user.department}</p>
      <p data-testid="user-id">ID: {user.id}</p>
    </div>
  );
}

export default App;
