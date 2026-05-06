import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const ConfigPage = lazy(() => import('./pages/ConfigPage').then((module) => ({ default: module.ConfigPage })))
const PlayerPage = lazy(() => import('./pages/PlayerPage').then((module) => ({ default: module.PlayerPage })))
const ResearcherPage = lazy(() =>
  import('./pages/ResearcherPage').then((module) => ({ default: module.ResearcherPage })),
)
const ResultsPage = lazy(() => import('./pages/ResultsPage').then((module) => ({ default: module.ResultsPage })))

function App() {
  return (
    <BrowserRouter basename="/app">
      <Suspense fallback={<main className="screen"><section className="panel"><p>Carregando interface...</p></section></main>}>
        <Routes>
          <Route path="/" element={<ConfigPage />} />
          <Route path="/players" element={<PlayerPage />} />
          <Route path="/researcher" element={<ResearcherPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
