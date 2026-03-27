import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  Trello,
  MessageSquare,
  Calendar,
  BarChart2,
} from 'lucide-react'

// Navigation items — path and icon for each link
const navItems = [
  { label: 'Dashboard',  path: '/dashboard', icon: LayoutDashboard },
  { label: 'Chat',       path: '/chat',       icon: MessageSquare   },
  { label: 'Calendar',   path: '/calendar',   icon: Calendar        },
  { label: 'Analytics',  path: '/analytics',  icon: BarChart2       },
]

export default function Layout() {
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