import { useMemo, memo } from 'react'
import useSimulationStore from '../../store/useSimulationStore'
import { computeZoneSizes } from '../../utils/simulation'

function ResidentialZone() {
    const timeStep = useSimulationStore((s) => s.timeStep)
    const enrollment = useSimulationStore((s) => s.enrollment)
    const zones = computeZoneSizes(timeStep, enrollment)
    const scale = zones.residential

    const houses = useMemo(
        () => [
            { pos: [-5, 0, 8], size: [2.5, 1.8, 2.5], color: '#b8956a' },
            { pos: [-2, 0, 8], size: [2, 2, 2], color: '#a8855a' },
            { pos: [1, 0, 8], size: [2.2, 1.5, 2.2], color: '#c8a57a' },
            { pos: [-5, 0, 12], size: [2, 1.8, 2.5], color: '#b8956a' },
            { pos: [-2, 0, 12], size: [2.5, 2.2, 2], color: '#a8855a' },
            { pos: [1, 0, 12], size: [2, 1.6, 2], color: '#c8a57a' },
            { pos: [-5, 0, 16], size: [2.2, 1.8, 2.2], color: '#b8956a' },
            { pos: [-1, 0, 16], size: [2, 2, 2.5], color: '#a8855a' },
            { pos: [2, 0, 16], size: [2.5, 1.5, 2], color: '#c8a57a' },
            { pos: [-8, 0, 10], size: [2, 1.8, 2], color: '#b8956a' },
            { pos: [-8, 0, 14], size: [2.2, 2, 2.2], color: '#a8855a' },
        ],
        []
    )

    return (
        <group scale={[scale, 1, scale]}>
            {/* Residential zone ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2, 0.02, 12]}>
                <planeGeometry args={[16, 14]} />
                <meshStandardMaterial
                    color="#3a5a2a"
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
    )
}

export default memo(ResidentialZone)
