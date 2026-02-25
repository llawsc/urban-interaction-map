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
    isf: [17.5, 2, 11],
    residents: [-2, 2, 12],
    landowners: [-4, 2, 10],
    developers: [10, 2, 10],
}

function ConnectionBeam({ relationship }) {
    const lineRef = useRef()
    const selectedRelationship = useSimulationStore((s) => s.selectedRelationship)
    const selectedActor = useSimulationStore((s) => s.selectedActor)
    const actorVisibility = useSimulationStore((s) => s.actorVisibility)

    const [actorA, actorB] = relationship.actors
    const isActorVisible =
        actorVisibility[actorA] && actorVisibility[actorB]

    const isRelevant =
        selectedRelationship === relationship.id ||
        selectedActor === actorA ||
        selectedActor === actorB ||
        (!selectedActor && !selectedRelationship)

    const startPos = ZONE_CENTERS[actorA] || [0, 2, 0]
    const endPos = ZONE_CENTERS[actorB] || [0, 2, 0]

    const curve = useMemo(() => {
        const mid = [
            (startPos[0] + endPos[0]) / 2,
            Math.max(startPos[1], endPos[1]) + 3,
            (startPos[2] + endPos[2]) / 2,
        ]
        return new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(...startPos),
            new THREE.Vector3(...mid),
            new THREE.Vector3(...endPos)
        )
    }, [startPos, endPos])

    const points = useMemo(() => curve.getPoints(30), [curve])

    useFrame((state) => {
        if (!lineRef.current) return
        const t = state.clock.elapsedTime

        // Different animation based on interaction type
        if (relationship.type === 'Conflict') {
            lineRef.current.material.opacity = 0.3 + Math.sin(t * 4) * 0.3
        } else if (relationship.type === 'Accommodation') {
            lineRef.current.material.opacity = 0.3 + Math.sin(t * 2) * 0.2
        } else {
            lineRef.current.material.opacity = isRelevant ? 0.6 : 0.15
        }
    })

    if (!isActorVisible) return null

    const isActive =
        selectedRelationship === relationship.id ||
        selectedActor === actorA ||
        selectedActor === actorB

    return (
        <line ref={lineRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length}
                    array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial
                color={relationship.color}
                transparent
                opacity={isRelevant ? 0.6 : 0.1}
                linewidth={isActive ? 3 : 1}
            />
        </line>
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
