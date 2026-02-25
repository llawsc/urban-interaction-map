import ActorSidebar from './ActorSidebar'
import InfoPanel from './InfoPanel'
import SimulationControls from './SimulationControls'
import Legend from './Legend'
import SummaryModal from './SummaryModal'
import useSimulationStore from '../../store/useSimulationStore'

export default function Dashboard() {
    const isUIHidden = useSimulationStore((s) => s.isUIHidden)
    const toggleUI = useSimulationStore((s) => s.toggleUI)
    const toggleSummary = useSimulationStore((s) => s.toggleSummary)

    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 5,
        }}>
            {/* Always-visible corner buttons */}
            <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                display: 'flex',
                gap: '8px',
                pointerEvents: 'auto',
                zIndex: 10,
            }}>
                <button
                    onClick={toggleSummary}
                    title="View Interaction Summary"
                    style={{
                        background: 'rgba(15, 20, 35, 0.85)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '10px',
                        color: '#e2e8f0',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        padding: '8px 14px',
                        fontFamily: 'Inter, sans-serif',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(99, 102, 241, 0.3)'
                        e.target.style.borderColor = 'rgba(99, 102, 241, 0.5)'
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(15, 20, 35, 0.85)'
                        e.target.style.borderColor = 'rgba(255,255,255,0.12)'
                    }}
                >
                    📋 Summary
                </button>
                <button
                    onClick={toggleUI}
                    title={isUIHidden ? 'Show UI' : 'Hide UI'}
                    style={{
                        background: 'rgba(15, 20, 35, 0.85)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '10px',
                        color: '#e2e8f0',
                        fontSize: '14px',
                        cursor: 'pointer',
                        padding: '8px 12px',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'all 0.2s',
                        lineHeight: 1,
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(99, 102, 241, 0.3)'
                        e.target.style.borderColor = 'rgba(99, 102, 241, 0.5)'
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(15, 20, 35, 0.85)'
                        e.target.style.borderColor = 'rgba(255,255,255,0.12)'
                    }}
                >
                    {isUIHidden ? '👁️' : '👁️‍🗨️'}
                </button>
            </div>

            {/* Hidable UI panels */}
            <div style={{
                pointerEvents: 'auto',
                transition: 'opacity 0.3s, visibility 0.3s',
                opacity: isUIHidden ? 0 : 1,
                visibility: isUIHidden ? 'hidden' : 'visible',
            }}>
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
                transition: 'opacity 0.3s',
                opacity: isUIHidden ? 0 : 1,
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

            {/* Summary modal (always rendered, toggles internally) */}
            <div style={{ pointerEvents: 'auto' }}>
                <SummaryModal />
            </div>
        </div>
    )
}
