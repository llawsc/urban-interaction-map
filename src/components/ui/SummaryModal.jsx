import { memo } from 'react'
import useSimulationStore from '../../store/useSimulationStore'
import { RELATIONSHIPS, INTERACTION_TYPES } from '../../data/relationships'
import { ACTOR_MAP } from '../../data/actors'

const NATURE_STYLES = {
    Positive: { bg: '#10b98120', border: '#10b981', color: '#10b981', emoji: '✅' },
    Negative: { bg: '#ef444420', border: '#ef4444', color: '#ef4444', emoji: '⛔' },
    Mixed: { bg: '#f59e0b20', border: '#f59e0b', color: '#f59e0b', emoji: '⚠️' },
}

function SummaryModal() {
    const showSummary = useSimulationStore((s) => s.showSummary)
    const toggleSummary = useSimulationStore((s) => s.toggleSummary)

    if (!showSummary) return null

    return (
        <div
            onClick={toggleSummary}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
                padding: '20px',
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'rgba(15, 20, 35, 0.95)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '16px',
                    padding: '28px',
                    maxWidth: '700px',
                    width: '100%',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    color: '#e2e8f0',
                    fontFamily: 'Inter, sans-serif',
                }}
            >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '0.02em' }}>
                        📋 Interaction Summary
                    </h2>
                    <button
                        onClick={toggleSummary}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#94a3b8',
                            fontSize: '14px',
                            cursor: 'pointer',
                            padding: '4px 10px',
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Legend section */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '10px' }}>
                        Interaction Types
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {Object.entries(INTERACTION_TYPES).map(([key, val]) => (
                            <span
                                key={key}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '4px 10px',
                                    borderRadius: '20px',
                                    fontSize: '11px',
                                    fontWeight: '600',
                                    background: `${val.color}20`,
                                    border: `1px solid ${val.color}50`,
                                    color: val.color,
                                }}
                            >
                                {val.emoji} {val.label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Nature indicators */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '10px' }}>
                        Nature Indicators
                    </h3>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {Object.entries(NATURE_STYLES).map(([key, val]) => (
                            <span
                                key={key}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '4px 10px',
                                    borderRadius: '20px',
                                    fontSize: '11px',
                                    fontWeight: '600',
                                    background: val.bg,
                                    border: `1px solid ${val.border}50`,
                                    color: val.color,
                                }}
                            >
                                {val.emoji} {key}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Connections table */}
                <div style={{ marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '10px' }}>
                        All Connections ({RELATIONSHIPS.length})
                    </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {RELATIONSHIPS.map((rel) => {
                        const actorA = ACTOR_MAP[rel.actors[0]]
                        const actorB = ACTOR_MAP[rel.actors[1]]
                        const iType = INTERACTION_TYPES[rel.type]
                        const nStyle = NATURE_STYLES[rel.nature]

                        return (
                            <div
                                key={rel.id}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr auto auto',
                                    gap: '10px',
                                    alignItems: 'center',
                                    padding: '10px 14px',
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    borderRadius: '10px',
                                }}
                            >
                                <div>
                                    <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '2px' }}>
                                        {actorA?.icon} {actorA?.shortName}
                                        <span style={{ color: '#64748b', margin: '0 6px' }}>↔</span>
                                        {actorB?.icon} {actorB?.shortName}
                                    </div>
                                    <div style={{ fontSize: '10px', color: '#64748b', lineHeight: '1.3' }}>
                                        {rel.justification.length > 100
                                            ? rel.justification.slice(0, 100) + '…'
                                            : rel.justification}
                                    </div>
                                </div>

                                <span
                                    style={{
                                        padding: '3px 8px',
                                        borderRadius: '12px',
                                        fontSize: '10px',
                                        fontWeight: '700',
                                        background: `${iType.color}20`,
                                        border: `1px solid ${iType.color}50`,
                                        color: iType.color,
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {iType.emoji} {iType.label}
                                </span>

                                <span
                                    style={{
                                        padding: '3px 8px',
                                        borderRadius: '12px',
                                        fontSize: '10px',
                                        fontWeight: '700',
                                        background: nStyle.bg,
                                        border: `1px solid ${nStyle.border}50`,
                                        color: nStyle.color,
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {nStyle.emoji} {rel.nature}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default memo(SummaryModal)
