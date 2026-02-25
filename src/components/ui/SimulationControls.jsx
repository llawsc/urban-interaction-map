import { memo } from 'react'
import useSimulationStore from '../../store/useSimulationStore'
import { computeEconomicStats } from '../../utils/simulation'

function SimulationControls() {
    const timeStep = useSimulationStore((s) => s.timeStep)
    const transientPop = useSimulationStore((s) => s.transientPop)
    const isPlaying = useSimulationStore((s) => s.isPlaying)
    const setTimeStep = useSimulationStore((s) => s.setTimeStep)
    const setTransientPop = useSimulationStore((s) => s.setTransientPop)
    const togglePlay = useSimulationStore((s) => s.togglePlay)
    const stats = computeEconomicStats(timeStep, transientPop)

    return (
        <div className="glass-panel" style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(720px, calc(100vw - 32px))',
            zIndex: 10,
            padding: '16px 20px',
        }}>
            {/* Stats row */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '12px',
                marginBottom: '14px',
                flexWrap: 'wrap',
            }}>
                <StatCard label="Avg Rent" value={`₱${stats.avgRent.toLocaleString()}`} color="var(--color-accent-light)" />
                <StatCard label="Meal Price" value={`₱${stats.avgMealPrice}`} color="var(--color-accommodation)" />
                <StatCard label="Population" value={stats.totalPopulation.toLocaleString()} color="var(--color-positive)" />
                <StatCard label="Displaced" value={`${stats.displacementRate}%`} color="var(--color-negative)" />
            </div>

            {/* Sliders row */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                {/* Play button */}
                <button
                    onClick={togglePlay}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: '2px solid var(--color-accent)',
                        background: isPlaying ? 'var(--color-accent)' : 'transparent',
                        color: isPlaying ? '#fff' : 'var(--color-accent)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        flexShrink: 0,
                        transition: 'all 0.2s',
                    }}
                >
                    {isPlaying ? '⏸' : '▶'}
                </button>

                {/* Time slider */}
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <label style={{ fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-secondary)' }}>
                            Timeline
                        </label>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-accent-light)' }}>
                            {Math.round(timeStep)}%
                        </span>
                    </div>
                    <input
                        className="slider-custom"
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={timeStep}
                        onChange={(e) => setTimeStep(Number(e.target.value))}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
                        <span style={{ fontSize: '9px', color: 'var(--color-text-secondary)' }}>Early</span>
                        <span style={{ fontSize: '9px', color: 'var(--color-text-secondary)' }}>Present</span>
                    </div>
                </div>

                {/* Transient Population Flow slider */}
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <label style={{ fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-secondary)' }}>
                            🎓 Transient Population Flow
                        </label>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-accent-light)' }}>
                            {transientPop.toLocaleString()}
                        </span>
                    </div>
                    <input
                        className="slider-custom"
                        type="range"
                        min="1000"
                        max="15000"
                        step="500"
                        value={transientPop}
                        onChange={(e) => setTransientPop(Number(e.target.value))}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
                        <span style={{ fontSize: '9px', color: 'var(--color-text-secondary)' }}>1K</span>
                        <span style={{ fontSize: '9px', color: 'var(--color-text-secondary)' }}>15K</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({ label, value, color }) {
    return (
        <div style={{
            flex: '1 1 0',
            minWidth: '100px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '8px',
            padding: '8px 12px',
            textAlign: 'center',
        }}>
            <div style={{ fontSize: '9px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>
                {label}
            </div>
            <div style={{ fontSize: '16px', fontWeight: '700', color }}>
                {value}
            </div>
        </div>
    )
}

export default memo(SimulationControls)
