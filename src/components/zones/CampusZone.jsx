import { useMemo, memo } from 'react'
import useSimulationStore from '../../store/useSimulationStore'
import { computeZoneSizes } from '../../utils/simulation'

const CENTER = [-12, 0, -9]

function Building({ position, size, color }) {
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

    // Positions are relative to CENTER
    const buildings = useMemo(
        () => [
            { pos: [0, 0, 1], size: [4, 3, 5], color: '#8b7355' },
            { pos: [4, 0, -3], size: [3, 2.5, 4], color: '#9b8365' },
            { pos: [-2, 0, -4], size: [3.5, 2, 3.5], color: '#7a6245' },
            { pos: [2, 0, 3], size: [2.5, 4, 3], color: '#8b7355' },
            { pos: [-4, 0, 0], size: [3, 2.5, 4], color: '#9b8365' },
            { pos: [-1, 0, 4], size: [2, 1.8, 2.5], color: '#7a6245' },
        ],
        []
    )

    return (
        <group position={CENTER}>
            <group scale={[scale, 1, scale]}>
                {/* Campus base marker */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
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
                <group position={[4, 0, 6]}>
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
        </group>
    )
}

export default memo(CampusZone)
