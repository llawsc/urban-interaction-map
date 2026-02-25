import ActorSidebar from './ActorSidebar'
import InfoPanel from './InfoPanel'
import SimulationControls from './SimulationControls'
import Legend from './Legend'

export default function Dashboard() {
    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 5,
        }}>
            <div style={{ pointerEvents: 'auto' }}>
                <ActorSidebar />
                <InfoPanel />
                <SimulationControls />
                <Legend />
            </div>

            {/* Title bar */}
            <div style={{
                position: 'absolute',
                top: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                pointerEvents: 'none',
                textAlign: 'center',
                zIndex: 1,
            }}>
                <h1 style={{
                    fontSize: '18px',
                    fontWeight: '800',
                    letterSpacing: '0.06em',
                    color: 'var(--color-text-primary)',
                    textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                }}>
                    Los Baños Urban Dynamics
                </h1>
                <p style={{
                    fontSize: '10px',
                    fontWeight: '500',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-secondary)',
                    marginTop: '2px',
                }}>
                    3D Sociological Simulation
                </p>
            </div>
        </div>
    )
}
