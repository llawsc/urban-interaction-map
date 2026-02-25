import { useMemo, memo } from 'react'
import useSimulationStore from '../../store/useSimulationStore'
import { computeZoneSizes } from '../../utils/simulation'

function Building({ position, size, color, label }) {
    return (
        <group position={position}>
            <mesh castShadow receiveShadow position={[0, size[1] / 2, 0]}>
                <boxGeometry args={size} />
                <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
            {/* Roof accent */}
            <mesh position={[0, size[1] + 0.05, 0]}>
                <boxGeometry args={[size[0] + 0.1, 0.1, size[2] + 0.1]} />
                <meshStandardMaterial color="#e8d5b7" roughness={0.6} />
            </mesh>
        </group>
    )
}

function CampusZone() {
    const timeStep = useSimulationStore((s) => s.timeStep)
    const enrollment = useSimulationStore((s) => s.enrollment)
    const zones = computeZoneSizes(timeStep, enrollment)
    const scale = zones.campus

    const buildings = useMemo(
        () => [
            { pos: [-12, 0, -8], size: [4, 3, 5], color: '#8b7355' },
            { pos: [-8, 0, -12], size: [3, 2.5, 4], color: '#9b8365' },
            { pos: [-14, 0, -13], size: [3.5, 2, 3.5], color: '#7a6245' },
            { pos: [-10, 0, -6], size: [2.5, 4, 3], color: '#8b7355' },
            { pos: [-16, 0, -9], size: [3, 2.5, 4], color: '#9b8365' },
            { pos: [-13, 0, -5], size: [2, 1.8, 2.5], color: '#7a6245' },
        ],
        []
    )

    return (
        <group scale={[scale, 1, scale]}>
            {/* Campus base marker */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-12, 0.02, -9]}>
                <circleGeometry args={[9, 32]} />
                <meshStandardMaterial
                    color="#3a5a3a"
                    roughness={0.9}
                    transparent
                    opacity={0.5}
                />
            </mesh>

            {buildings.map((b, i) => (
                <Building key={i} position={b.pos} size={b.size} color={b.color} />
            ))}

            {/* UPLB Gate marker */}
            <group position={[-8, 0, -3]}>
                <mesh position={[-0.8, 1.5, 0]} castShadow>
                    <boxGeometry args={[0.3, 3, 0.3]} />
                    <meshStandardMaterial color="#d4a574" />
                </mesh>
                <mesh position={[0.8, 1.5, 0]} castShadow>
                    <boxGeometry args={[0.3, 3, 0.3]} />
                    <meshStandardMaterial color="#d4a574" />
                </mesh>
                <mesh position={[0, 3, 0]}>
                    <boxGeometry args={[2, 0.3, 0.3]} />
                    <meshStandardMaterial color="#d4a574" />
                </mesh>
            </group>
        </group>
    )
}

export default memo(CampusZone)
