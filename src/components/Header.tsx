import { Menu, Bell, Calendar } from 'lucide-react'

interface HeaderProps {
  onMenuToggle: () => void
}

const now = new Date()
const dateStr = now.toLocaleDateString('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-royal-900 border-b border-royal-700/40 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-xl text-royal-300 hover:bg-royal-800 hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-base font-semibold text-white">Influencer Marketing Trends</h1>
          <p className="text-xs text-royal-400">UK Market Intelligence</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 text-xs text-royal-400 bg-royal-800 px-3 py-2 rounded-xl">
          <Calendar size={14} />
          <span>{dateStr}</span>
        </div>
        <button className="relative p-2 rounded-xl text-royal-300 hover:bg-royal-800 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-royal-400 rounded-full" />
        </button>
      </div>
    </header>
  )
}
