import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  subtext?: string
  icon: LucideIcon
  trend?: { value: string; positive: boolean }
  accent?: string
}

export default function StatCard({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  accent = 'bg-royal-500',
}: StatCardProps) {
  return (
    <div className="card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${accent} bg-opacity-20 flex items-center justify-center`}>
          <Icon size={18} className="text-royal-300" />
        </div>
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              trend.positive
                ? 'bg-emerald-500/15 text-emerald-400'
                : 'bg-red-500/15 text-red-400'
            }`}
          >
            {trend.positive ? '▲' : '▼'} {trend.value}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm font-medium text-royal-200">{label}</p>
      {subtext && <p className="text-xs text-royal-400 mt-1">{subtext}</p>}
    </div>
  )
}
