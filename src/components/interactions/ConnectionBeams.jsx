import { useRef, useMemo, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useSimulationStore from '../../store/useSimulationStore'
import { ACTOR_MAP } from '../../data/actors'
import { RELATIONSHIPS } from '../../data/relationships'

const ZONE_CENTERS = {
    uplb: [-14, 2, -10],
    students: [-10, 2, -7],
    vendors: [9, 2, -3],
    lgu: [9, 2, -5],
    isf: [15, 2, 5],
    residents: [-10, 2, 12],
    landowners: [-8, 2, 10],
    developers: [10, 2, 10],
}

function ConnectionBeam({ relationship }) {
    const meshRef = useRef()
    const selectedRelationship = useSimulationStore((s) => s.selectedRelationship)
    const selectedActor = useSimulationStore((s) => s.selectedActor)
    const actorVisibility = useSimulationStore((s) => s.actorVisibility)

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

    // Create tube geometry for thick, visible beams
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
        return new THREE.TubeGeometry(curve, 32, 0.12, 6, false)
    }, [startPos, endPos])

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.elapsedTime

        if (relationship.type === 'Conflict') {
            meshRef.current.material.opacity = 0.4 + Math.sin(t * 4) * 0.35
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
                color={relationship.color}
                transparent
                opacity={isRelevant ? 0.75 : 0.15}
                emissive={relationship.color}
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
