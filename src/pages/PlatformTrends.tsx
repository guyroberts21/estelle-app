import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts'
import { contentTypeData, engagementByTier, platformGrowthData } from '../data/trends'

const TOOLTIP_STYLE = {
  backgroundColor: '#162d72',
  border: '1px solid #2651c7',
  borderRadius: '12px',
  color: '#fff',
  fontSize: 12,
}

const trendingFormats = [
  { platform: 'Instagram', format: 'Reels (15–60s)', growth: '+42%', why: 'Algorithm heavily favours short-form video; drives 3× more reach than static posts.' },
  { platform: 'Instagram', format: 'Carousel Posts', growth: '+18%', why: 'High save rates signal quality content; brands use for tutorials and product showcases.' },
  { platform: 'TikTok', format: 'Duets & Stitch', growth: '+67%', why: 'Co-creation amplifies reach; brand challenges drive viral loops at low cost.' },
  { platform: 'TikTok', format: 'TikTok Shop Lives', growth: '+95%', why: 'In-stream commerce growing rapidly; influencers earn commission on live sales.' },
  { platform: 'YouTube', format: 'YouTube Shorts', growth: '+58%', why: 'Cross-pollination with long-form channel grows subscriber base quickly.' },
  { platform: 'YouTube', format: 'Integrated Sponsorships', growth: '+22%', why: 'Embedded mid-roll sponsors outperform pre-roll ads in brand recall.' },
]

const radarData = [
  { metric: 'Reach', instagram: 82, tiktok: 74, youtube: 90 },
  { metric: 'Engagement', instagram: 62, tiktok: 88, youtube: 54 },
  { metric: 'Commerce', instagram: 70, tiktok: 85, youtube: 52 },
  { metric: 'Trust', instagram: 65, tiktok: 55, youtube: 78 },
  { metric: 'Ad Revenue', instagram: 60, tiktok: 52, youtube: 88 },
  { metric: 'Creator Tools', instagram: 72, tiktok: 80, youtube: 84 },
]

export default function PlatformTrends() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h2 className="section-title">Platform Trends</h2>
        <p className="section-subtitle">
          Detailed breakdown of content, engagement, and format trends across Instagram, TikTok &amp; YouTube
        </p>
      </div>

      {/* Radar + Engagement by tier */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-base font-semibold text-white mb-1">Platform Capability Index</h3>
          <p className="text-xs text-royal-400 mb-4">Composite scores across key marketing dimensions</p>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1e2d6b" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#a5b4fc', fontSize: 11 }} />
              <Radar name="Instagram" dataKey="instagram" stroke="#818cf8" fill="#818cf8" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="TikTok"    dataKey="tiktok"    stroke="#4169e1" fill="#4169e1" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="YouTube"   dataKey="youtube"   stroke="#2651c7" fill="#2651c7" fillOpacity={0.15} strokeWidth={2} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#a5b4fc' }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-base font-semibold text-white mb-1">Engagement Rate by Influencer Tier</h3>
          <p className="text-xs text-royal-400 mb-4">Average engagement %, 2024 — smaller creators often outperform</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={engagementByTier} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d6b" />
              <XAxis dataKey="tier" tick={{ fill: '#a5b4fc', fontSize: 10 }} tickLine={false} />
              <YAxis tick={{ fill: '#a5b4fc', fontSize: 11 }} tickLine={false} unit="%" />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`]} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#a5b4fc' }} />
              <Bar dataKey="instagram" name="Instagram" fill="#818cf8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="tiktok"    name="TikTok"    fill="#4169e1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="youtube"   name="YouTube"   fill="#2651c7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Content type usage */}
      <div className="card">
        <h3 className="text-base font-semibold text-white mb-1">Content Format Usage by Platform</h3>
        <p className="text-xs text-royal-400 mb-5">% of influencer posts by content type, 2024</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={contentTypeData} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d6b" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#a5b4fc', fontSize: 11 }} tickLine={false} unit="%" />
            <YAxis type="category" dataKey="type" tick={{ fill: '#a5b4fc', fontSize: 11 }} tickLine={false} width={80} />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`]} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#a5b4fc' }} />
            <Bar dataKey="instagram" name="Instagram" fill="#818cf8" radius={[0, 4, 4, 0]} />
            <Bar dataKey="tiktok"    name="TikTok"    fill="#4169e1" radius={[0, 4, 4, 0]} />
            <Bar dataKey="youtube"   name="YouTube"   fill="#2651c7" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Platform usage trend line */}
      <div className="card">
        <h3 className="text-base font-semibold text-white mb-1">Platform Adoption Trend</h3>
        <p className="text-xs text-royal-400 mb-5">% of UK brands using each platform for influencer campaigns, Jan 2023 – Jan 2025</p>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={platformGrowthData} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d6b" />
            <XAxis dataKey="month" tick={{ fill: '#a5b4fc', fontSize: 11 }} tickLine={false} />
            <YAxis tick={{ fill: '#a5b4fc', fontSize: 11 }} tickLine={false} unit="%" />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`]} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#a5b4fc' }} />
            <Line type="monotone" dataKey="instagram" name="Instagram" stroke="#818cf8" strokeWidth={2.5} dot={{ r: 3, fill: '#818cf8' }} />
            <Line type="monotone" dataKey="tiktok"    name="TikTok"    stroke="#4169e1" strokeWidth={2.5} dot={{ r: 3, fill: '#4169e1' }} />
            <Line type="monotone" dataKey="youtube"   name="YouTube"   stroke="#2651c7" strokeWidth={2.5} dot={{ r: 3, fill: '#2651c7' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Trending formats */}
      <div>
        <h3 className="section-title text-base">Trending Content Formats (2024–2025)</h3>
        <p className="section-subtitle">Fastest-growing formats by platform</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingFormats.map(f => (
            <div key={f.platform + f.format} className="card-hover">
              <div className="flex items-start justify-between mb-3">
                <span className="badge badge-blue">{f.platform}</span>
                <span className="text-emerald-400 text-xs font-bold">{f.growth}</span>
              </div>
              <p className="text-sm font-semibold text-white mb-2">{f.format}</p>
              <p className="text-xs text-royal-400 leading-relaxed">{f.why}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
