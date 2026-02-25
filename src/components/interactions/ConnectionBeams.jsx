import { useRef, useMemo, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useSimulationStore from '../../store/useSimulationStore'
import { computeActorPopulations, computeConnectionIntensity } from '../../utils/simulation'
import { ACTOR_MAP } from '../../data/actors'
import { RELATIONSHIPS } from '../../data/relationships'

const ZONE_CENTERS = {
    uplb: [-14, 2, -10],
    transients: [-10, 2, -7],
    vendors: [9, 2, -3],
    lgu: [9, 2, -5],
    isf: [15, 2, 5],
    residents: [-10, 2, 12],
    landowners: [-8, 2, 10],
    developers: [10, 2, 10],
}

// Nature-based color coding per spec 5.2.3
const NATURE_COLORS = {
    Positive: '#10b981',
    Negative: '#ef4444',
    Mixed: '#f59e0b',
}

function ConnectionBeam({ relationship }) {
    const meshRef = useRef()
    const selectedRelationship = useSimulationStore((s) => s.selectedRelationship)
    const selectedActor = useSimulationStore((s) => s.selectedActor)
    const actorVisibility = useSimulationStore((s) => s.actorVisibility)
    const timeStep = useSimulationStore((s) => s.timeStep)
    const transientPop = useSimulationStore((s) => s.transientPop)

    const [actorA, actorB] = relationship.actors
    const isActorVisible = actorVisibility[actorA] && actorVisibility[actorB]

    const isRelevant =
        selectedRelationship === relationship.id ||
        selectedActor === actorA ||
        selectedActor === actorB ||
        (!selectedActor && !selectedRelationship)

    const isActive =
        selectedRelationship === relationship.id ||
        selectedActor === actorA ||
        selectedActor === actorB

    const startPos = ZONE_CENTERS[actorA] || [0, 2, 0]
    const endPos = ZONE_CENTERS[actorB] || [0, 2, 0]

    // Dynamic intensity based on transient population slider (Req 5.3.2)
    const intensity = computeConnectionIntensity(timeStep, transientPop)
    const beamColor = NATURE_COLORS[relationship.nature] || relationship.color

    // Tube radius scales with slider — thicker when intensity is higher
    const baseRadius = 0.08 + intensity * 0.08
    const tubeRadius = isActive ? baseRadius * 1.6 : baseRadius

    const tubeGeo = useMemo(() => {
        const mid = [
            (startPos[0] + endPos[0]) / 2,
            Math.max(startPos[1], endPos[1]) + 4,
            (startPos[2] + endPos[2]) / 2,
        ]
        const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(...startPos),
            new THREE.Vector3(...mid),
            new THREE.Vector3(...endPos)
        )
        return new THREE.TubeGeometry(curve, 32, tubeRadius, 6, false)
    }, [startPos, endPos, tubeRadius])

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.elapsedTime

        if (relationship.type === 'Conflict') {
            meshRef.current.material.opacity = 0.4 + Math.sin(t * 4) * 0.35
        } else if (relationship.type === 'Competition') {
            meshRef.current.material.opacity = 0.4 + Math.sin(t * 3) * 0.3
        } else if (relationship.type === 'Accommodation') {
            meshRef.current.material.opacity = 0.4 + Math.sin(t * 2) * 0.25
        } else {
            meshRef.current.material.opacity = isRelevant ? 0.75 : 0.2
        }
    })

    if (!isActorVisible) return null

    return (
        <mesh ref={meshRef} geometry={tubeGeo}>
            <meshStandardMaterial
                color={beamColor}
                transparent
                opacity={isRelevant ? 0.75 : 0.15}
                emissive={beamColor}
                emissiveIntensity={isActive ? 0.6 : 0.2}
                roughness={0.3}
                metalness={0.1}
            />
        </mesh>
    )
}

function ConnectionBeams() {
    return (
        <group>
            {RELATIONSHIPS.map((rel) => (
                <ConnectionBeam key={rel.id} relationship={rel} />
            ))}
        </group>
    )
}

export default memo(ConnectionBeams)
