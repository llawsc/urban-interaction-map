import { useRef, useMemo, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useSimulationStore from '../../store/useSimulationStore'
import { computeActorPopulations, computeAssimilation } from '../../utils/simulation'
import { ACTORS, ACTOR_MAP } from '../../data/actors'

const ZONE_CENTERS = {
    campus: [-12, 0.5, -9],
    commercial: [9, 0.5, -3],
    residential: [-10, 0.5, 12],
    informal: [15, 0.5, 5],
    development: [10, 0.5, 10],
}

function generatePositions(count, center, spread = 4) {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        positions[i * 3] = center[0] + (Math.random() - 0.5) * spread
        positions[i * 3 + 1] = center[1] + Math.random() * 0.5
        positions[i * 3 + 2] = center[2] + (Math.random() - 0.5) * spread
    }
    return positions
}

function ActorGroup({ actor }) {
    const meshRef = useRef()
    const timeStep = useSimulationStore((s) => s.timeStep)
    const enrollment = useSimulationStore((s) => s.enrollment)
    const visible = useSimulationStore((s) => s.actorVisibility[actor.id])
    const selectedActor = useSimulationStore((s) => s.selectedActor)
    const populations = computeActorPopulations(timeStep, enrollment)
    const assimilation = computeAssimilation(timeStep)

    const count = Math.min(200, Math.round(populations[actor.id] / 25))
    const center = ZONE_CENTERS[actor.zone] || ZONE_CENTERS.residential

    const positions = useMemo(() => generatePositions(count, center, 5), [count, center])

    const color = useMemo(() => {
        // Assimilation effect: ISFs slowly blend toward resident color over time
        if (actor.id === 'isf') {
            const residentColor = new THREE.Color(ACTOR_MAP.residents.color)
            const isfColor = new THREE.Color(actor.color)
            return isfColor.lerp(residentColor, assimilation * 0.5)
        }
        return new THREE.Color(actor.color)
    }, [actor.id, actor.color, assimilation])

    const isSelected = selectedActor === actor.id
    const isHighlighted = !selectedActor || isSelected

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.elapsedTime
        // Gentle floating animation
        for (let i = 0; i < meshRef.current.count; i++) {
            const dummy = new THREE.Object3D()
            dummy.position.set(
                positions[i * 3] + Math.sin(t + i) * 0.05,
                positions[i * 3 + 1] + Math.sin(t * 2 + i * 0.5) * 0.15,
                positions[i * 3 + 2] + Math.cos(t + i) * 0.05
            )
            dummy.scale.setScalar(isSelected ? 0.25 : 0.18)
            dummy.updateMatrix()
            meshRef.current.setMatrixAt(i, dummy.matrix)
        }
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    if (!visible || count === 0) return null

    return (
        <instancedMesh
            ref={meshRef}
            args={[null, null, count]}
            frustumCulled={false}
        >
            <sphereGeometry args={[1, 6, 4]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={isHighlighted ? 0.4 : 0.1}
                transparent
                opacity={isHighlighted ? 0.9 : 0.3}
                roughness={0.5}
            />
        </instancedMesh>
    )
}

function ActorParticles() {
    return (
        <group>
            {ACTORS.map((actor) => (
                <ActorGroup key={actor.id} actor={actor} />
            ))}
        </group>
    )
}

export default memo(ActorParticles)
