import { useRef, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import useSimulationStore from '../../store/useSimulationStore'
import { computeZoneSizes, computeDisplacement } from '../../utils/simulation'

// Two clusters: one near the river, one near the train tracks
const RIVER_CENTER = [15, 0, 5]
const TRACKS_CENTER = [-12, 0, 20]

function InformalZone() {
    const timeStep = useSimulationStore((s) => s.timeStep)
    const transientPop = useSimulationStore((s) => s.transientPop)
    const zones = computeZoneSizes(timeStep, transientPop)
    const scale = zones.informal
    const displacement = computeDisplacement(timeStep)
    const warningRefRiver = useRef()
    const warningRefTracks = useRef()

    useFrame((state) => {
        const t = state.clock.elapsedTime
        const pulse = 0.15 + Math.sin(t * 3) * 0.15 * displacement
        if (warningRefRiver.current) warningRefRiver.current.material.opacity = pulse
        if (warningRefTracks.current) warningRefTracks.current.material.opacity = pulse
    })

    // Shelters near the river (built on the creek bank)
    const riverShelters = [
        { pos: [-1.5, 0, -1], size: [1.2, 1, 1.2] },
        { pos: [0.5, 0, -0.5], size: [1, 0.8, 1] },
        { pos: [-0.5, 0, 1], size: [1.3, 0.9, 1.1] },
        { pos: [1, 0, 1.5], size: [1.1, 1.1, 1] },
    ]

    // Shelters near the train tracks
    const tracksShelters = [
        { pos: [-1, 0, -1], size: [1, 0.7, 1.2] },
        { pos: [1.2, 0, -0.5], size: [1.2, 0.9, 1] },
        { pos: [0, 0, 1], size: [1, 0.8, 1.1] },
        { pos: [-1.5, 0, 1.5], size: [1.1, 0.85, 1] },
    ]

    const renderShelters = (shelters) =>
        shelters.map((s, i) => (
            <group key={i} position={s.pos}>
                <mesh castShadow position={[0, s.size[1] / 2, 0]}>
                    <boxGeometry args={s.size} />
                    <meshStandardMaterial
                        color={i % 2 === 0 ? '#6b5b45' : '#5a4a35'}
                        roughness={0.95}
                    />
                </mesh>
                <mesh position={[0, s.size[1], 0]} rotation={[0.1, 0, 0]}>
                    <boxGeometry args={[s.size[0] + 0.3, 0.05, s.size[2] + 0.3]} />
                    <meshStandardMaterial color="#7a7a7a" roughness={0.5} metalness={0.3} />
                </mesh>
            </group>
        ))

    return (
        <group>
            {/* ===== River cluster ===== */}
            <group position={RIVER_CENTER}>
                <group scale={[scale, scale, scale]}>
                    <mesh
                        ref={warningRefRiver}
                        rotation={[-Math.PI / 2, 0, 0]}
                        position={[0, 0.03, 0]}
                    >
                        <circleGeometry args={[4, 24]} />
                        <meshStandardMaterial
                            color="#ef4444"
                            transparent
                            opacity={0.15}
                            emissive="#ef4444"
                            emissiveIntensity={0.3}
                        />
                    </mesh>
                    {renderShelters(riverShelters)}
                </group>
            </group>

            {/* ===== Train tracks cluster ===== */}
            <group position={TRACKS_CENTER}>
                <group scale={[scale, scale, scale]}>
                    <mesh
                        ref={warningRefTracks}
                        rotation={[-Math.PI / 2, 0, 0]}
                        position={[0, 0.03, 0]}
                    >
                        <circleGeometry args={[4, 24]} />
                        <meshStandardMaterial
                            color="#ef4444"
                            transparent
                            opacity={0.15}
                            emissive="#ef4444"
                            emissiveIntensity={0.3}
                        />
                    </mesh>
                    {renderShelters(tracksShelters)}
                </group>
            </group>
        </group>
    )
}

export default memo(InformalZone)
