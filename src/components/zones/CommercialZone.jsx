import { useMemo, memo } from 'react'
import useSimulationStore from '../../store/useSimulationStore'
import { computeZoneSizes } from '../../utils/simulation'

const CENTER = [9, 0, -3]

function CommercialZone() {
    const timeStep = useSimulationStore((s) => s.timeStep)
    const enrollment = useSimulationStore((s) => s.enrollment)
    const zones = computeZoneSizes(timeStep, enrollment)
    const scale = zones.commercial

    // Positions relative to CENTER [9, 0, -3]
    const shops = useMemo(
        () => [
            { pos: [-4, 0, 1], size: [2, 1.8, 2], color: '#c4956a' },
            { pos: [-1, 0, 1], size: [2.5, 2, 2], color: '#d4a574' },
            { pos: [2, 0, 1], size: [1.8, 1.5, 2], color: '#b88555' },
            { pos: [-4, 0, -2], size: [2, 2.2, 2.5], color: '#c4956a' },
            { pos: [-1, 0, -2], size: [2, 1.6, 2], color: '#d4a574' },
            { pos: [2, 0, -2], size: [2.2, 2, 2], color: '#b88555' },
            { pos: [5, 0, 0], size: [1.8, 1.8, 2.5], color: '#c4956a' },
        ],
        []
    )

    return (
        <group position={CENTER}>
            <group scale={[scale, 1, scale]}>
                {/* Commercial zone ground */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -0.5]}>
                    <planeGeometry args={[14, 8]} />
                    <meshStandardMaterial
                        color="#4a4030"
                        roughness={0.95}
                        transparent
                        opacity={0.5}
                    />
                </mesh>

                {shops.map((s, i) => (
                    <group key={i} position={s.pos}>
                        <mesh castShadow receiveShadow position={[0, s.size[1] / 2, 0]}>
                            <boxGeometry args={s.size} />
                            <meshStandardMaterial color={s.color} roughness={0.7} />
                        </mesh>
                        {/* Awning */}
                        <mesh position={[0, s.size[1], s.size[2] / 2 + 0.3]} rotation={[0.3, 0, 0]}>
                            <planeGeometry args={[s.size[0] + 0.4, 0.8]} />
                            <meshStandardMaterial
                                color={i % 2 === 0 ? '#e74c3c' : '#f39c12'}
                                side={2}
                            />
                        </mesh>
                    </group>
                ))}

                {/* Vendor stalls */}
                {Array.from({ length: 5 }).map((_, i) => (
                    <group key={`stall-${i}`} position={[-4 + i * 2, 0, 3.5]}>
                        <mesh position={[0, 0.6, 0]} castShadow>
                            <boxGeometry args={[1.2, 0.8, 1]} />
                            <meshStandardMaterial color="#8B4513" roughness={0.9} />
                        </mesh>
                        {/* Umbrella */}
                        <mesh position={[0, 1.6, 0]}>
                            <coneGeometry args={[0.8, 0.3, 6]} />
                            <meshStandardMaterial
                                color={['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6'][i]}
                            />
                        </mesh>
                        <mesh position={[0, 1.2, 0]}>
                            <cylinderGeometry args={[0.03, 0.03, 0.8, 4]} />
                            <meshStandardMaterial color="#666" />
                        </mesh>
                    </group>
                ))}
            </group>
        </group>
    )
}

export default memo(CommercialZone)
