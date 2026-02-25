import { useMemo, memo } from 'react'
import useSimulationStore from '../../store/useSimulationStore'
import { computeZoneSizes } from '../../utils/simulation'

const CENTER = [-10, 0, 12]

function ResidentialZone() {
    const timeStep = useSimulationStore((s) => s.timeStep)
    const enrollment = useSimulationStore((s) => s.enrollment)
    const zones = computeZoneSizes(timeStep, enrollment)
    const scale = zones.residential

    // Positions relative to CENTER [-10, 0, 12]
    const houses = useMemo(
        () => [
            { pos: [-3, 0, -4], size: [2.5, 1.8, 2.5], color: '#b8956a' },
            { pos: [0, 0, -4], size: [2, 2, 2], color: '#a8855a' },
            { pos: [3, 0, -4], size: [2.2, 1.5, 2.2], color: '#c8a57a' },
            { pos: [-3, 0, 0], size: [2, 1.8, 2.5], color: '#b8956a' },
            { pos: [0, 0, 0], size: [2.5, 2.2, 2], color: '#a8855a' },
            { pos: [3, 0, 0], size: [2, 1.6, 2], color: '#c8a57a' },
            { pos: [-3, 0, 4], size: [2.2, 1.8, 2.2], color: '#b8956a' },
            { pos: [1, 0, 4], size: [2, 2, 2.5], color: '#a8855a' },
            { pos: [4, 0, 4], size: [2.5, 1.5, 2], color: '#c8a57a' },
            { pos: [-6, 0, -2], size: [2, 1.8, 2], color: '#b8956a' },
            { pos: [-6, 0, 2], size: [2.2, 2, 2.2], color: '#a8855a' },
        ],
        []
    )

    return (
        <group position={CENTER}>
            <group scale={[scale, 1, scale]}>
                {/* Residential zone ground */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                    <planeGeometry args={[16, 14]} />
                    <meshStandardMaterial
                        color="#4a7a3a"
                        roughness={0.9}
                        transparent
                        opacity={0.3}
                    />
                </mesh>

                {houses.map((h, i) => (
                    <group key={i} position={h.pos}>
                        {/* Wall */}
                        <mesh castShadow receiveShadow position={[0, h.size[1] / 2, 0]}>
                            <boxGeometry args={h.size} />
                            <meshStandardMaterial color={h.color} roughness={0.75} />
                        </mesh>
                        {/* Roof */}
                        <mesh position={[0, h.size[1] + 0.4, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
                            <coneGeometry args={[h.size[0] * 0.85, 0.8, 4]} />
                            <meshStandardMaterial color="#8B4513" roughness={0.8} />
                        </mesh>
                    </group>
                ))}
            </group>
        </group>
    )
}

export default memo(ResidentialZone)
