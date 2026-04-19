import { useState } from 'react'
import { Search, Filter, AlertTriangle, ShieldAlert, FileWarning, Repeat } from 'lucide-react'
import { nonCompliantInfluencers, complianceStats, type ComplianceStatus } from '../data/influencers'

const statusConfig: Record<ComplianceStatus, { label: string; class: string; icon: React.ElementType }> = {
  'Undertaking Given': { label: 'CMA Undertaking',  class: 'badge-blue',  icon: ShieldAlert },
  'ASA Ruling':        { label: 'ASA Ruling',        class: 'badge-amber', icon: FileWarning },
  'Repeat Breach':     { label: 'Repeat Breach',     class: 'badge-red',   icon: Repeat },
  'Warning Issued':    { label: 'Warning Issued',    class: 'badge-green', icon: AlertTriangle },
}

export default function Compliance() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ComplianceStatus | 'All'>('All')
  const [yearFilter, setYearFilter] = useState<number | 'All'>('All')

  const statuses: ComplianceStatus[] = ['Undertaking Given', 'ASA Ruling', 'Repeat Breach', 'Warning Issued']
  const years = [...new Set(nonCompliantInfluencers.map(i => i.year))].sort()

  const filtered = nonCompliantInfluencers.filter(inf => {
    const matchSearch =
      inf.name.toLowerCase().includes(search.toLowerCase()) ||
      (inf.knownAs ?? '').toLowerCase().includes(search.toLowerCase()) ||
      inf.category.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || inf.status === statusFilter
    const matchYear   = yearFilter === 'All' || inf.year === yearFilter
    return matchSearch && matchStatus && matchYear
  })

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h2 className="section-title">Influencer Compliance</h2>
        <p className="section-subtitle">
          UK influencers who failed to label advertising — CMA &amp; ASA public records
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: ShieldAlert,   label: 'Total Investigated',  value: complianceStats.totalInvestigated,  color: 'text-royal-300' },
          { icon: FileWarning,   label: 'CMA Undertakings',    value: complianceStats.undertakingsGiven,  color: 'text-indigo-400' },
          { icon: AlertTriangle, label: 'ASA Rulings',         value: complianceStats.asaRulings,         color: 'text-amber-400' },
          { icon: Repeat,        label: 'Repeat Breaches',     value: complianceStats.repeatBreaches,     color: 'text-red-400' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="card-hover text-center">
            <Icon size={24} className={`mx-auto mb-3 ${color}`} />
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-sm text-royal-300 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Context box */}
      <div className="bg-royal-800/50 border border-royal-600/30 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-royal-300 leading-relaxed">
            The influencers listed below are drawn from <span className="text-white font-medium">publicly available CMA enforcement records and ASA adjudications</span>. The CMA's 2018–2020 investigation found that many had published posts promoting products or services for payment without making the commercial relationship clear. All gave formal undertakings or received rulings requiring future compliance. This list is educational and based on official public records.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-royal-400" />
          <input
            type="text"
            placeholder="Search by name or category…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-royal-800 border border-royal-600/40 rounded-xl text-sm text-white placeholder-royal-500 focus:outline-none focus:border-royal-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-royal-400" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as ComplianceStatus | 'All')}
            className="bg-royal-800 border border-royal-600/40 rounded-xl text-sm text-royal-200 px-3 py-2.5 focus:outline-none focus:border-royal-500"
          >
            <option value="All">All statuses</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={yearFilter}
            onChange={e => setYearFilter(e.target.value === 'All' ? 'All' : Number(e.target.value))}
            className="bg-royal-800 border border-royal-600/40 rounded-xl text-sm text-royal-200 px-3 py-2.5 focus:outline-none focus:border-royal-500"
          >
            <option value="All">All years</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <span className="text-xs text-royal-400 ml-auto">
          Showing {filtered.length} of {nonCompliantInfluencers.length}
        </span>
      </div>

      {/* Influencer cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(inf => {
          const cfg = statusConfig[inf.status]
          const Icon = cfg.icon
          return (
            <div key={inf.name} className="card-hover flex flex-col gap-3">
              {/* Header row */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-base font-bold text-white leading-tight">{inf.name}</p>
                  {inf.knownAs && (
                    <p className="text-xs text-royal-400 mt-0.5">also known as {inf.knownAs}</p>
                  )}
                </div>
                <span className={`badge ${cfg.class} flex-shrink-0`}>
                  <Icon size={10} />
                  {cfg.label}
                </span>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-blue">{inf.platform}</span>
                <span className="badge bg-royal-700/40 text-royal-300 border border-royal-600/30">{inf.category}</span>
                <span className="badge bg-royal-700/40 text-royal-400 border border-royal-600/30">{inf.followerRange}</span>
              </div>

              {/* Year */}
              <p className="text-xs text-royal-500">Action year: <span className="text-royal-300 font-semibold">{inf.year}</span></p>

              {/* Description */}
              <p className="text-xs text-royal-400 leading-relaxed border-t border-royal-700/40 pt-3">{inf.action}</p>

              {/* Outcome */}
              <div className="bg-royal-800/60 rounded-xl px-3 py-2 mt-auto">
                <p className="text-xs text-royal-400"><span className="text-emerald-400 font-semibold">Outcome:</span> {inf.outcome}</p>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Search size={32} className="mx-auto text-royal-600 mb-4" />
          <p className="text-royal-400 text-sm">No influencers match your filters.</p>
        </div>
      )}

      {/* Breakdown bar */}
      <div className="card">
        <h3 className="text-base font-semibold text-white mb-4">Enforcement Action Breakdown</h3>
        <div className="space-y-3">
          {[
            { label: 'CMA Undertakings', count: complianceStats.undertakingsGiven, total: complianceStats.totalInvestigated, color: 'bg-royal-500' },
            { label: 'ASA Rulings',      count: complianceStats.asaRulings,        total: complianceStats.totalInvestigated, color: 'bg-amber-500' },
            { label: 'Warnings Issued',  count: complianceStats.warnings,          total: complianceStats.totalInvestigated, color: 'bg-emerald-500' },
            { label: 'Repeat Breaches',  count: complianceStats.repeatBreaches,    total: complianceStats.totalInvestigated, color: 'bg-red-500' },
          ].map(({ label, count, total, color }) => (
            <div key={label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-royal-300">{label}</span>
                <span className="text-white font-semibold">{count} / {total}</span>
              </div>
              <div className="h-2.5 bg-royal-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${color} transition-all duration-700`}
                  style={{ width: `${(count / total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
