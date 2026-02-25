import { useRef, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import useSimulationStore from '../../store/useSimulationStore'
import { computeZoneSizes, computeDisplacement } from '../../utils/simulation'

const CENTER = [17.5, 0, 11]

function InformalZone() {
    const timeStep = useSimulationStore((s) => s.timeStep)
    const enrollment = useSimulationStore((s) => s.enrollment)
    const zones = computeZoneSizes(timeStep, enrollment)
    const scale = zones.informal
    const displacement = computeDisplacement(timeStep)
    const warningRef = useRef()

    useFrame((state) => {
        if (warningRef.current) {
            warningRef.current.material.opacity =
                0.15 + Math.sin(state.clock.elapsedTime * 3) * 0.15 * displacement
        }
    })

    // Positions relative to CENTER [17.5, 0, 11]
    const shelters = [
        { pos: [-1.5, 0, -3], size: [1.2, 1, 1.2] },
        { pos: [0.5, 0, -2.5], size: [1, 0.8, 1] },
        { pos: [-0.5, 0, -1], size: [1.3, 0.9, 1.1] },
        { pos: [1.5, 0, -0.5], size: [1.1, 1.1, 1] },
        { pos: [-1, 0, 1], size: [1, 0.7, 1.2] },
        { pos: [1, 0, 1], size: [1.2, 0.9, 1] },
        { pos: [0, 0, 3], size: [1, 0.8, 1.1] },
    ]

    return (
        <group position={CENTER}>
            <group scale={[scale, scale, scale]}>
                {/* Warning zone - pulsing red */}
                <mesh
                    ref={warningRef}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, 0.03, 0]}
                >
                    <circleGeometry args={[6, 24]} />
                    <meshStandardMaterial
                        color="#ef4444"
                        transparent
                        opacity={0.15}
                        emissive="#ef4444"
                        emissiveIntensity={0.3}
                    />
                </mesh>

                {shelters.map((s, i) => (
                    <group key={i} position={s.pos}>
                        {/* Shelter */}
                        <mesh castShadow position={[0, s.size[1] / 2, 0]}>
                            <boxGeometry args={s.size} />
                            <meshStandardMaterial
                                color={i % 2 === 0 ? '#6b5b45' : '#5a4a35'}
                                roughness={0.95}
                            />
                        </mesh>
                        {/* Corrugated roof */}
                        <mesh position={[0, s.size[1], 0]} rotation={[0.1, 0, 0]}>
                            <boxGeometry args={[s.size[0] + 0.3, 0.05, s.size[2] + 0.3]} />
                            <meshStandardMaterial color="#7a7a7a" roughness={0.5} metalness={0.3} />
                        </mesh>
                    </group>
                ))}
            </group>
        </group>
    )
}

export default memo(InformalZone)
