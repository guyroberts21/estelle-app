import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Overview from './pages/Overview'
import PlatformTrends from './pages/PlatformTrends'
import CMAImpact from './pages/CMAImpact'
import Compliance from './pages/Compliance'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden">
        <Sidebar open={sidebarOpen} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header onMenuToggle={() => setSidebarOpen(o => !o)} />
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/overview" replace />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/platforms" element={<PlatformTrends />} />
              <Route path="/cma-impact" element={<CMAImpact />} />
              <Route path="/compliance" element={<Compliance />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
