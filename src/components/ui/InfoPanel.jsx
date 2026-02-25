import { memo } from 'react'
import useSimulationStore from '../../store/useSimulationStore'
import { ACTORS } from '../../data/actors'
import { RELATIONSHIPS, INTERACTION_TYPES } from '../../data/relationships'

function InfoPanel() {
    const selectedRelationship = useSimulationStore((s) => s.selectedRelationship)
    const selectedActor = useSimulationStore((s) => s.selectedActor)
    const clearSelection = useSimulationStore((s) => s.clearSelection)

    const relationship = selectedRelationship
        ? RELATIONSHIPS.find((r) => r.id === selectedRelationship)
        : null

    const actor = selectedActor
        ? ACTORS.find((a) => a.id === selectedActor)
        : null

    // Show actor info
    if (actor && !relationship) {
        const actorRelations = RELATIONSHIPS.filter((r) => r.actors.includes(actor.id))
        return (
            <div className="glass-panel" style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '300px',
                maxHeight: 'calc(100vh - 120px)',
                overflowY: 'auto',
                zIndex: 10,
                padding: '20px',
            }}>
                {/* Close */}
                <button onClick={clearSelection} style={{
                    position: 'absolute', top: '10px', right: '12px',
                    background: 'none', border: 'none', color: 'var(--color-text-secondary)',
                    cursor: 'pointer', fontSize: '16px', lineHeight: 1,
                }}>✕</button>

                {/* Actor header */}
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '24px', marginBottom: '4px' }}>{actor.icon}</div>
                    <h3 style={{
                        fontSize: '16px', fontWeight: '700',
                        color: actor.color, marginBottom: '4px',
                    }}>
                        {actor.name}
                    </h3>
                    <p style={{
                        fontSize: '12px', color: 'var(--color-text-secondary)',
                        lineHeight: '1.5',
                    }}>
                        {actor.description}
                    </p>
                </div>

                {/* Summary stats */}
                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',
                    marginBottom: '16px',
                }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.03)', borderRadius: '8px',
                        padding: '10px', textAlign: 'center',
                    }}>
                        <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Zone</div>
                        <div style={{ fontSize: '13px', fontWeight: '600', marginTop: '2px', textTransform: 'capitalize' }}>{actor.zone}</div>
                    </div>
                    <div style={{
                        background: 'rgba(255,255,255,0.03)', borderRadius: '8px',
                        padding: '10px', textAlign: 'center',
                    }}>
                        <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Relations</div>
                        <div style={{ fontSize: '13px', fontWeight: '600', marginTop: '2px' }}>{actorRelations.length}</div>
                    </div>
                </div>

                {/* Relationships detail */}
                <div style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                    Interactions
                </div>
                {actorRelations.map((rel) => {
                    const otherActorId = rel.actors.find((a) => a !== actor.id)
                    const otherActor = ACTORS.find((a) => a.id === otherActorId)
                    const typeInfo = INTERACTION_TYPES[rel.type]
                    return (
                        <div key={rel.id} style={{
                            padding: '10px', borderRadius: '8px',
                            background: 'rgba(255,255,255,0.02)',
                            border: `1px solid ${rel.color}20`,
                            marginBottom: '6px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span style={{ fontSize: '12px', fontWeight: '600' }}>
                                    {typeInfo?.emoji} {otherActor?.name}
                                </span>
                                <span className={`badge badge-${rel.nature.toLowerCase()}`}>
                                    {rel.type}
                                </span>
                            </div>
                            <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                                {rel.justification}
                            </p>
                        </div>
                    )
                })}
            </div>
        )
    }

    // Show relationship info
    if (relationship) {
        const actorA = ACTORS.find((a) => a.id === relationship.actors[0])
        const actorB = ACTORS.find((a) => a.id === relationship.actors[1])
        const typeInfo = INTERACTION_TYPES[relationship.type]

        return (
            <div className="glass-panel" style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '300px',
                zIndex: 10,
                padding: '20px',
            }}>
                {/* Close */}
                <button onClick={clearSelection} style={{
                    position: 'absolute', top: '10px', right: '12px',
                    background: 'none', border: 'none', color: 'var(--color-text-secondary)',
                    cursor: 'pointer', fontSize: '16px', lineHeight: 1,
                }}>✕</button>

                {/* Type header */}
                <div style={{ marginBottom: '14px' }}>
                    <span className={`badge badge-${relationship.nature.toLowerCase()}`} style={{ marginBottom: '8px', display: 'inline-flex' }}>
                        {typeInfo?.emoji} {relationship.type}
                    </span>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', marginTop: '8px' }}>
                        <span style={{ color: actorA.color }}>{actorA.icon} {actorA.shortName}</span>
                        <span style={{ color: 'var(--color-text-secondary)', margin: '0 8px', fontSize: '12px' }}>↔</span>
                        <span style={{ color: actorB.color }}>{actorB.icon} {actorB.shortName}</span>
                    </h3>
                </div>

                {/* Nature */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '10px', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.03)',
                    marginBottom: '14px',
                }}>
                    <div style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: relationship.nature === 'Positive' ? 'var(--color-positive)'
                            : relationship.nature === 'Negative' ? 'var(--color-negative)'
                                : 'var(--color-mixed)',
                    }} />
                    <span style={{ fontSize: '12px', fontWeight: '600' }}>
                        {relationship.nature} Interaction
                    </span>
                </div>

                {/* Justification */}
                <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
                        Sociological Justification
                    </div>
                    <p style={{ fontSize: '12px', lineHeight: '1.6', color: 'var(--color-text-primary)' }}>
                        {relationship.justification}
                    </p>
                </div>

                {/* Visual description */}
                <div>
                    <div style={{ fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
                        Visual Representation
                    </div>
                    <p style={{ fontSize: '11px', lineHeight: '1.5', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                        {relationship.visual}
                    </p>
                </div>
            </div>
        )
    }

    return null
}

export default memo(InfoPanel)
