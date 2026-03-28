// src/components/Layout.jsx
import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  BarChart2,
  LogOut,
  ChevronUp,
  User,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const navItems = [
  { label: 'Dashboard',  path: '/dashboard', icon: LayoutDashboard },
  { label: 'Chat',       path: '/chat',       icon: MessageSquare   },
  { label: 'Calendar',   path: '/calendar',   icon: Calendar        },
  { label: 'Analytics',  path: '/analytics',  icon: BarChart2       },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">

        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-700">
          <span className="text-xl font-bold">TeamSpace</span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User Menu — bottom of sidebar */}
        <div className="px-4 py-4 border-t border-gray-700 relative">

          {/* Popup Menu — shows above when clicked */}
          {menuOpen && (
            <div className="absolute bottom-20 left-4 right-4 bg-gray-800 rounded-md shadow-lg overflow-hidden">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 w-full text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}

          {/* User Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            {/* Avatar Circle */}
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : <User size={14} />}
            </div>

            {/* Name + arrow */}
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-white truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.email || ''}
              </p>
            </div>

            <ChevronUp
              size={16}
              className={`text-gray-400 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
            />
          </button>

        </div>

      </aside>

      {/* Right side — topbar + page content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
          <h1 className="text-lg font-semibold text-gray-700">
            Team Workspace
          </h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  )
}