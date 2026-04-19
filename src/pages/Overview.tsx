import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from 'recharts'
import { TrendingUp, Users, DollarSign, BarChart2, Instagram, Youtube, Video } from 'lucide-react'
import StatCard from '../components/StatCard'
import { platformGrowthData, marketShareData, adSpendData, topCategories } from '../data/trends'

const TOOLTIP_STYLE = {
  backgroundColor: '#162d72',
  border: '1px solid #2651c7',
  borderRadius: '12px',
  color: '#fff',
  fontSize: 12,
}

export default function Overview() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h2 className="section-title">Market Overview</h2>
        <p className="section-subtitle">
          UK influencer marketing landscape — Instagram, TikTok &amp; YouTube
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Global Market Size (2024)"
          value="£13.2B"
          subtext="Influencer marketing spend"
          icon={DollarSign}
          trend={{ value: '34.7%', positive: true }}
          accent="bg-royal-500"
        />
        <StatCard
          label="UK Active Influencers"
          value="186K+"
          subtext="Across all major platforms"
          icon={Users}
          trend={{ value: '18%', positive: true }}
          accent="bg-indigo-500"
        />
        <StatCard
          label="Avg. Engagement Rate"
          value="3.86%"
          subtext="Across all tiers & platforms"
          icon={TrendingUp}
          trend={{ value: '0.4pp', positive: false }}
          accent="bg-violet-500"
        />
        <StatCard
          label="Brands Using Influencers"
          value="89%"
          subtext="Of UK brands in 2024"
          icon={BarChart2}
          trend={{ value: '7pp', positive: true }}
          accent="bg-sky-500"
        />
      </div>

      {/* Platform usage growth + Market share */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <h3 className="text-base font-semibold text-white mb-1">Platform Usage Among Brands</h3>
          <p className="text-xs text-royal-400 mb-5">% of UK brands using each platform for influencer campaigns</p>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={platformGrowthData} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
              <defs>
                <linearGradient id="ig" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="tt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4169e1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4169e1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="yt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2651c7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2651c7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d6b" />
              <XAxis dataKey="month" tick={{ fill: '#a5b4fc', fontSize: 11 }} tickLine={false} />
              <YAxis tick={{ fill: '#a5b4fc', fontSize: 11 }} tickLine={false} unit="%" />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`]} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#a5b4fc' }} />
              <Area type="monotone" dataKey="instagram" name="Instagram" stroke="#818cf8" fill="url(#ig)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="tiktok"    name="TikTok"    stroke="#4169e1" fill="url(#tt)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="youtube"   name="YouTube"   stroke="#2651c7" fill="url(#yt)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-base font-semibold text-white mb-1">Campaign Share by Platform</h3>
          <p className="text-xs text-royal-400 mb-4">% of influencer campaigns, 2024</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={marketShareData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {marketShareData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`]} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#a5b4fc' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-2">
            {marketShareData.map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.fill }} />
                  <span className="text-royal-300">{d.name}</span>
                </div>
                <span className="font-semibold text-white">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ad spend + Top categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-base font-semibold text-white mb-1">Global Influencer Ad Spend</h3>
          <p className="text-xs text-royal-400 mb-5">Billions USD, 2020–2025 estimate</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={adSpendData} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d6b" />
              <XAxis dataKey="year" tick={{ fill: '#a5b4fc', fontSize: 11 }} tickLine={false} />
              <YAxis tick={{ fill: '#a5b4fc', fontSize: 11 }} tickLine={false} unit="B" />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`$${v}B`]} />
              <Bar dataKey="spend" name="Ad Spend" fill="#4169e1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-base font-semibold text-white mb-1">Top Influencer Categories</h3>
          <p className="text-xs text-royal-400 mb-4">% of total UK influencer campaigns</p>
          <div className="space-y-3">
            {topCategories.map(({ category, share }) => (
              <div key={category}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-royal-200">{category}</span>
                  <span className="text-royal-300 font-semibold">{share}%</span>
                </div>
                <div className="h-2 bg-royal-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-royal-500 to-royal-400 transition-all duration-700"
                    style={{ width: `${(share / 22) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: Instagram,
            name: 'Instagram',
            color: 'text-pink-400',
            bg: 'bg-pink-500/10',
            stats: [
              { label: 'UK Active Users', value: '34M' },
              { label: 'Avg. Engagement', value: '2.1%' },
              { label: 'Top Format', value: 'Reels' },
              { label: 'Avg. Influencer Rate', value: '£0.012 / follower' },
            ],
          },
          {
            icon: Video,
            name: 'TikTok',
            color: 'text-cyan-400',
            bg: 'bg-cyan-500/10',
            stats: [
              { label: 'UK Active Users', value: '23M' },
              { label: 'Avg. Engagement', value: '5.3%' },
              { label: 'Top Format', value: 'Short Video' },
              { label: 'Avg. Influencer Rate', value: '£0.018 / follower' },
            ],
          },
          {
            icon: Youtube,
            name: 'YouTube',
            color: 'text-red-400',
            bg: 'bg-red-500/10',
            stats: [
              { label: 'UK Active Users', value: '44M' },
              { label: 'Avg. Engagement', value: '2.8%' },
              { label: 'Top Format', value: 'Long-form' },
              { label: 'Avg. Influencer Rate', value: '£20–50 / 1K views' },
            ],
          },
        ].map(({ icon: Icon, name, color, bg, stats }) => (
          <div key={name} className="card">
            <div className={`inline-flex items-center gap-2 ${bg} px-3 py-1.5 rounded-lg mb-4`}>
              <Icon size={16} className={color} />
              <span className={`text-sm font-semibold ${color}`}>{name}</span>
            </div>
            <div className="space-y-3">
              {stats.map(s => (
                <div key={s.label} className="flex justify-between text-sm">
                  <span className="text-royal-400">{s.label}</span>
                  <span className="text-white font-medium">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
