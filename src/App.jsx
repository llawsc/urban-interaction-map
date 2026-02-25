import Scene from './components/Scene'
import Dashboard from './components/ui/Dashboard'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Scene />
      <Dashboard />
    </div>
  )
}
