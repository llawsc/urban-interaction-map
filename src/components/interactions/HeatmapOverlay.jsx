import { useRef, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import useSimulationStore from '../../store/useSimulationStore'
import { computeGentrification } from '../../utils/simulation'

function HeatmapOverlay() {
    const meshRef = useRef()
    const timeStep = useSimulationStore((s) => s.timeStep)
    const transientPop = useSimulationStore((s) => s.transientPop)
    const radius = computeGentrification(timeStep, transientPop)

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.elapsedTime
        meshRef.current.material.opacity = 0.08 + Math.sin(t * 1.5) * 0.03
        meshRef.current.scale.set(
            1 + Math.sin(t * 0.8) * 0.02,
            1,
            1 + Math.sin(t * 0.8) * 0.02
        )
    })

    if (radius < 0.5) return null

    return (
        <mesh
            ref={meshRef}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[-6, 0.04, 2]}
        >
            <circleGeometry args={[radius, 32]} />
            <meshStandardMaterial
                color="#f97316"
                transparent
                opacity={0.1}
                emissive="#f97316"
                emissiveIntensity={0.4}
                side={2}
            />
        </mesh>
    )
}

export default memo(HeatmapOverlay)
