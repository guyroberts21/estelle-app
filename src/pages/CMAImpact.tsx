import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Scale, TrendingUp, ShieldCheck, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'
import { cmaTimelineEvents, disclosureRateData, consumerTrustData, societalImpacts } from '../data/cma'

const TOOLTIP_STYLE = {
  backgroundColor: '#162d72',
  border: '1px solid #2651c7',
  borderRadius: '12px',
  color: '#fff',
  fontSize: 12,
}

const severityStyles: Record<string, string> = {
  medium:   'border-l-amber-500 bg-amber-500/5',
  high:     'border-l-royal-500 bg-royal-500/5',
  critical: 'border-l-emerald-500 bg-emerald-500/5',
}

const severityBadge: Record<string, string> = {
  medium:   'badge-amber',
  high:     'badge-blue',
  critical: 'badge-green',
}

const combinedData = disclosureRateData.map((d, i) => ({
  year: d.year,
  disclosure: d.rate,
  trust: consumerTrustData[i]?.trust ?? 0,
}))

export default function CMAImpact() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h2 className="section-title">CMA Impact &amp; UK Regulation</h2>
        <p className="section-subtitle">
          How the Competition and Markets Authority shaped influencer advertising and UK consumer society
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Scale,       label: 'Investigation Opened',    value: '2018',  sub: 'CMA formal probe begins',          color: 'bg-royal-500' },
          { icon: ShieldCheck, label: 'Undertakings Secured',    value: '16',    sub: 'Influencers signed CMA pledges',   color: 'bg-indigo-500' },
          { icon: TrendingUp,  label: 'Disclosure Rate (2024)',  value: '81%',   sub: 'Up from 34% in 2019',             color: 'bg-emerald-600' },
          { icon: AlertTriangle, label: 'DMCC Act Enacted',     value: '2024',  sub: 'Direct CMA fining powers',        color: 'bg-amber-600' },
        ].map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} className="card-hover">
            <div className={`w-10 h-10 rounded-xl ${color} bg-opacity-20 flex items-center justify-center mb-4`}>
              <Icon size={18} className="text-royal-200" />
            </div>
            <p className="text-2xl font-bold text-white mb-0.5">{value}</p>
            <p className="text-sm font-medium text-royal-200">{label}</p>
            <p className="text-xs text-royal-400 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="card">
        <h3 className="text-base font-semibold text-white mb-1">Regulatory Timeline</h3>
        <p className="text-xs text-royal-400 mb-6">Key milestones in UK influencer advertising enforcement</p>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-royal-700/60" />
          <div className="space-y-5">
            {cmaTimelineEvents.map(event => (
              <div key={event.year} className="relative flex gap-6">
                <div className="flex-shrink-0 w-16 text-right">
                  <span className="text-xs font-bold text-royal-400">{event.year}</span>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-4 h-4 rounded-full border-2 border-royal-500 bg-royal-900 mt-0.5 relative z-10" />
                </div>
                <div className={`flex-1 border-l-4 rounded-xl p-4 mb-1 ${severityStyles[event.severity]}`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="text-sm font-semibold text-white">{event.title}</p>
                    <span className={severityBadge[event.severity]}>{event.impact}</span>
                  </div>
                  <p className="text-xs text-royal-300 leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclosure + Trust chart */}
      <div className="card">
        <h3 className="text-base font-semibold text-white mb-1">Disclosure Rate &amp; Consumer Trust Over Time</h3>
        <p className="text-xs text-royal-400 mb-5">% of influencer posts with correct disclosure (left) and consumer trust in influencer ads (right)</p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={combinedData} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d6b" />
            <XAxis dataKey="year" tick={{ fill: '#a5b4fc', fontSize: 11 }} tickLine={false} />
            <YAxis tick={{ fill: '#a5b4fc', fontSize: 11 }} tickLine={false} unit="%" />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`]} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#a5b4fc' }} />
            <Line type="monotone" dataKey="disclosure" name="Disclosure Rate"  stroke="#4169e1" strokeWidth={2.5} dot={{ r: 4, fill: '#4169e1' }} />
            <Line type="monotone" dataKey="trust"      name="Consumer Trust"  stroke="#818cf8" strokeWidth={2.5} dot={{ r: 4, fill: '#818cf8' }} strokeDasharray="5 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Societal impact grid */}
      <div>
        <h3 className="section-title text-base">Societal Impact</h3>
        <p className="section-subtitle">Before and after CMA intervention across key areas</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {societalImpacts.map(impact => (
            <div key={impact.area} className="card-hover">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-white">{impact.area}</span>
                <span className={impact.positive ? 'badge-green' : 'badge-amber'}>
                  {impact.change}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <XCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-royal-400 leading-relaxed"><span className="text-royal-300 font-medium">Before:</span> {impact.before}</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-royal-400 leading-relaxed"><span className="text-royal-300 font-medium">After:</span> {impact.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key legislation callout */}
      <div className="bg-gradient-to-r from-royal-800 to-royal-900 border border-royal-600/40 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-royal-500/20 flex items-center justify-center flex-shrink-0">
            <Scale size={20} className="text-royal-300" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white mb-2">Digital Markets, Competition and Consumers Act 2024</h3>
            <p className="text-sm text-royal-300 leading-relaxed mb-3">
              The landmark DMCC Act 2024 granted the CMA direct enforcement powers for consumer protection breaches, removing the previous requirement to seek court orders. This means the CMA can now directly fine individuals and companies — including influencers and their agencies — for misleading commercial practices such as failing to disclose paid advertising.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Max individual fine', value: '£300,000' },
                { label: 'Max company fine', value: '10% of global turnover' },
                { label: 'Enforcement body', value: 'CMA (no court required)' },
              ].map(s => (
                <div key={s.label} className="bg-royal-700/30 rounded-xl p-3">
                  <p className="text-xs text-royal-400 mb-1">{s.label}</p>
                  <p className="text-sm font-bold text-royal-200">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
