import { memo } from 'react'
import useSimulationStore from '../../store/useSimulationStore'
import { computeZoneSizes } from '../../utils/simulation'

function DevelopmentZone() {
    const timeStep = useSimulationStore((s) => s.timeStep)
    const enrollment = useSimulationStore((s) => s.enrollment)
    const zones = computeZoneSizes(timeStep, enrollment)
    const scale = zones.development

    const condos = [
        { pos: [8, 0, 8], baseHeight: 3, color: '#94a3b8' },
        { pos: [11, 0, 9], baseHeight: 4, color: '#a0aec0' },
        { pos: [10, 0, 13], baseHeight: 2.5, color: '#8899aa' },
    ]

    return (
        <group>
            {condos.map((c, i) => {
                const height = c.baseHeight * scale
                return (
                    <group key={i} position={c.pos}>
                        {/* Main tower */}
                        <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
                            <boxGeometry args={[2, height, 2]} />
                            <meshStandardMaterial
                                color={c.color}
                                roughness={0.4}
                                metalness={0.2}
                            />
                        </mesh>
                        {/* Glass windows */}
                        {Array.from({ length: Math.floor(height / 1.2) }).map((_, j) => (
                            <mesh key={j} position={[1.01, 0.8 + j * 1.2, 0]}>
                                <planeGeometry args={[0.01, 0.6, 1.5]} />
                                <meshStandardMaterial
                                    color="#4a9eff"
                                    emissive="#4a9eff"
                                    emissiveIntensity={0.2}
                                    transparent
                                    opacity={0.6}
                                />
                            </mesh>
                        ))}
                        {/* Roof structure */}
                        <mesh position={[0, height + 0.2, 0]}>
                            <boxGeometry args={[2.2, 0.4, 2.2]} />
                            <meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.3} />
                        </mesh>
                    </group>
                )
            })}
        </group>
    )
}

export default memo(DevelopmentZone)
