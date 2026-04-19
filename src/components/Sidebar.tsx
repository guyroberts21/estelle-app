import { NavLink } from 'react-router-dom'
import { LayoutDashboard, TrendingUp, Scale, ShieldAlert } from 'lucide-react'

const navItems = [
  { to: '/overview',    icon: LayoutDashboard, label: 'Overview' },
  { to: '/platforms',   icon: TrendingUp,      label: 'Platform Trends' },
  { to: '/cma-impact',  icon: Scale,           label: 'CMA Impact' },
  { to: '/compliance',  icon: ShieldAlert,     label: 'Compliance' },
]

interface SidebarProps {
  open: boolean
}

export default function Sidebar({ open }: SidebarProps) {
  return (
    <aside
      className={`
        ${open ? 'w-60' : 'w-16'}
        flex-shrink-0 flex flex-col bg-royal-900 border-r border-royal-700/40
        transition-all duration-300 overflow-hidden
      `}
    >
      <div className="flex items-center gap-3 px-4 py-5 border-b border-royal-700/40">
        <div className="w-8 h-8 rounded-lg bg-royal-500 flex items-center justify-center flex-shrink-0">
          <TrendingUp size={16} className="text-white" />
        </div>
        {open && (
          <div>
            <p className="text-sm font-bold text-white leading-tight">InfluenceIQ</p>
            <p className="text-xs text-royal-400">UK Market Dashboard</p>
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
              ${isActive
                ? 'bg-royal-500 text-white shadow-lg shadow-royal-500/30'
                : 'text-royal-300 hover:bg-royal-800 hover:text-white'
              }`
            }
          >
            <Icon size={18} className="flex-shrink-0" />
            {open && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {open && (
        <div className="p-4 border-t border-royal-700/40">
          <div className="bg-royal-800 rounded-xl p-3">
            <p className="text-xs font-semibold text-royal-300 mb-1">Data Sources</p>
            <p className="text-xs text-royal-400 leading-relaxed">
              CMA public records · ASA adjudications · Statista 2024 · Influencer Marketing Hub
            </p>
          </div>
        </div>
      )}
    </aside>
  )
}
