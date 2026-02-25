import { memo } from 'react'
import useSimulationStore from '../../store/useSimulationStore'
import { ACTORS } from '../../data/actors'
import { RELATIONSHIPS } from '../../data/relationships'

function ActorSidebar() {
    const actorVisibility = useSimulationStore((s) => s.actorVisibility)
    const toggleActorVisibility = useSimulationStore((s) => s.toggleActorVisibility)
    const selectedActor = useSimulationStore((s) => s.selectedActor)
    const selectActor = useSimulationStore((s) => s.selectActor)
    const selectRelationship = useSimulationStore((s) => s.selectRelationship)
    const selectedRelationship = useSimulationStore((s) => s.selectedRelationship)

    // Find relationships for selected actor
    const relatedRelationships = selectedActor
        ? RELATIONSHIPS.filter((r) => r.actors.includes(selectedActor))
        : []

    return (
        <div className="glass-panel" style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            width: '280px',
            maxHeight: 'calc(100vh - 32px)',
            overflowY: 'auto',
            zIndex: 10,
            padding: '16px',
        }}>
            {/* Header */}
            <div style={{ marginBottom: '16px' }}>
                <h2 style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent-light)',
                    marginBottom: '4px',
                }}>
                    👥 Actors
                </h2>
                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
                    Toggle visibility • Click to show connections
                </p>
            </div>

            {/* Actor List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {ACTORS.map((actor) => {
                    const isSelected = selectedActor === actor.id
                    return (
                        <div
                            key={actor.id}
                            onClick={() => selectActor(actor.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '8px 10px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                background: isSelected
                                    ? `${actor.color}20`
                                    : 'transparent',
                                border: isSelected
                                    ? `1px solid ${actor.color}50`
                                    : '1px solid transparent',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => {
                                if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                            }}
                            onMouseLeave={(e) => {
                                if (!isSelected) e.currentTarget.style.background = 'transparent'
                            }}
                        >
                            {/* Color dot */}
                            <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: actor.color,
                                boxShadow: `0 0 8px ${actor.color}60`,
                                flexShrink: 0,
                            }} />

                            {/* Name & icon */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: isSelected ? actor.color : 'var(--color-text-primary)',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>
                                    {actor.icon} {actor.shortName}
                                </div>
                            </div>

                            {/* Toggle */}
                            <div
                                className={`toggle-switch ${actorVisibility[actor.id] ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    toggleActorVisibility(actor.id)
                                }}
                                style={{
                                    flexShrink: 0,
                                    '--color-accent': actor.color,
                                    background: actorVisibility[actor.id] ? actor.color : undefined,
                                }}
                            />
                        </div>
                    )
                })}
            </div>

            {/* Related Relationships */}
            {selectedActor && relatedRelationships.length > 0 && (
                <div style={{ marginTop: '16px', borderTop: '1px solid rgba(99,102,241,0.15)', paddingTop: '12px' }}>
                    <div style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--color-text-secondary)',
                        marginBottom: '8px',
                    }}>
                        Connections
                    </div>
                    {relatedRelationships.map((rel) => {
                        const otherActorId = rel.actors.find((a) => a !== selectedActor)
                        const otherActor = ACTORS.find((a) => a.id === otherActorId)
                        return (
                            <div
                                key={rel.id}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    selectRelationship(rel.id)
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '6px 8px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    background: selectedRelationship === rel.id ? `${rel.color}15` : 'transparent',
                                    marginBottom: '4px',
                                    transition: 'background 0.2s',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = `${rel.color}10`}
                                onMouseLeave={(e) => {
                                    if (selectedRelationship !== rel.id) e.currentTarget.style.background = 'transparent'
                                }}
                            >
                                <div style={{
                                    width: '6px', height: '6px',
                                    borderRadius: '50%',
                                    background: rel.color,
                                    flexShrink: 0,
                                }} />
                                <span style={{ fontSize: '11px', color: 'var(--color-text-primary)' }}>
                                    {otherActor?.icon} {otherActor?.shortName}
                                </span>
                                <span className={`badge badge-${rel.nature.toLowerCase()}`} style={{ marginLeft: 'auto' }}>
                                    {rel.type}
                                </span>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default memo(ActorSidebar)
