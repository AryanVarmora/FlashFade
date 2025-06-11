// components/MainLayout.jsx
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  Brain, 
  Zap, 
  Home, 
  BookOpen, 
  Plus, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../App';

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Decks', href: '/decks', icon: BookOpen },
    { name: 'Create Deck', href: '/create', icon: Plus },
    { name: 'Statistics', href: '/stats', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActivePath = (path) => location.pathname === path;

  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    left: sidebarOpen ? 0 : '-256px',
    height: '100vh',
    width: '256px',
    background: 'linear-gradient(to bottom, #1e293b, #334155)',
    transition: 'left 0.3s ease-in-out',
    zIndex: 50,
    boxShadow: '4px 0 6px -1px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 40,
    display: sidebarOpen ? 'block' : 'none'
  };

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '64px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1rem',
    zIndex: 30
  };

  const mainContentStyle = {
    marginTop: '64px',
    minHeight: 'calc(100vh - 64px)',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              color: '#4b5563'
            }}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ position: 'relative' }}>
              <Brain className="w-8 h-8" style={{ color: '#4f46e5' }} />
              <Zap className="w-4 h-4" style={{
                color: '#eab308',
                position: 'absolute',
                top: '-0.25rem',
                right: '-0.25rem'
              }} />
            </div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              margin: 0,
              background: 'linear-gradient(to right, #4f46e5, #9333ea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              FlashFade
            </h1>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            Welcome back, {user?.username || user?.email || 'User'}!
          </span>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(to right, #ef4444, #dc2626)',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(to right, #dc2626, #b91c1c)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(to right, #ef4444, #dc2626)';
            }}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Sidebar Overlay */}
      <div style={overlayStyle} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div style={{ padding: '1rem' }}>
          {/* Sidebar Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Brain className="w-6 h-6" style={{ color: '#a78bfa' }} />
              <span style={{ color: 'white', fontWeight: '600' }}>Menu</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '0.25rem'
              }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.href);
              
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setSidebarOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    background: isActive 
                      ? 'rgba(79, 70, 229, 0.2)' 
                      : 'transparent',
                    color: isActive ? '#a78bfa' : '#e2e8f0',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.background = 'rgba(148, 163, 184, 0.1)';
                      e.target.style.color = '#f1f5f9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#e2e8f0';
                    }
                  }}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          right: '1rem',
          padding: '1rem',
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '0.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ color: '#94a3b8', fontSize: '0.75rem', textAlign: 'center' }}>
            <p style={{ margin: '0.25rem 0' }}>FlashFade v1.0</p>
            <p style={{ margin: '0.25rem 0' }}>© 2025 Memory Learning</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={mainContentStyle}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;