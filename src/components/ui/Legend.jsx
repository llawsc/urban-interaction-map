import { memo, useState } from 'react'
import { INTERACTION_TYPES } from '../../data/relationships'

function Legend() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div style={{
            position: 'absolute',
            bottom: '110px',
            right: '16px',
            zIndex: 10,
        }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="glass-panel"
                style={{
                    border: '1px solid var(--color-border-glass)',
                    color: 'var(--color-text-secondary)',
                    cursor: 'pointer',
                    padding: '8px 14px',
                    fontSize: '11px',
                    fontWeight: '600',
                    fontFamily: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    borderRadius: '8px',
                }}
            >
                🗺️ Legend {isOpen ? '▼' : '▲'}
            </button>

            {isOpen && (
                <div className="glass-panel" style={{
                    position: 'absolute',
                    bottom: '40px',
                    right: '0',
                    width: '200px',
                    padding: '14px',
                }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-secondary)', marginBottom: '10px' }}>
                        Interaction Types
                    </div>
                    {Object.entries(INTERACTION_TYPES).map(([key, val]) => (
                        <div key={key} style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            marginBottom: '6px',
                        }}>
                            <div style={{
                                width: '10px', height: '3px',
                                borderRadius: '2px',
                                background: val.color,
                                boxShadow: `0 0 6px ${val.color}60`,
                            }} />
                            <span style={{ fontSize: '11px', color: 'var(--color-text-primary)' }}>
                                {val.emoji} {val.label}
                            </span>
                        </div>
                    ))}

                    <div style={{ borderTop: '1px solid rgba(99,102,241,0.15)', margin: '10px 0', padding: 0 }} />

                    <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-secondary)', marginBottom: '10px' }}>
                        Nature
                    </div>
                    {[
                        { label: 'Positive', color: 'var(--color-positive)' },
                        { label: 'Negative', color: 'var(--color-negative)' },
                        { label: 'Mixed', color: 'var(--color-mixed)' },
                    ].map((n) => (
                        <div key={n.label} style={{
                            display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px',
                        }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: n.color }} />
                            <span style={{ fontSize: '11px', color: 'var(--color-text-primary)' }}>{n.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default memo(Legend)
