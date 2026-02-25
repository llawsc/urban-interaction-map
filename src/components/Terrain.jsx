import { useMemo } from 'react'
import * as THREE from 'three'

export default function Terrain() {
    const mountainGeometry = useMemo(() => {
        const geo = new THREE.ConeGeometry(12, 18, 8)
        geo.translate(0, 9, 0)
        // Add some randomness to vertices for natural look
        const pos = geo.attributes.position
        for (let i = 0; i < pos.count; i++) {
            const y = pos.getY(i)
            if (y > 0.5 && y < 17) {
                pos.setX(i, pos.getX(i) + (Math.random() - 0.5) * 2)
                pos.setZ(i, pos.getZ(i) + (Math.random() - 0.5) * 2)
            }
        }
        geo.computeVertexNormals()
        return geo
    }, [])

    const secondaryPeak = useMemo(() => {
        const geo = new THREE.ConeGeometry(8, 12, 7)
        geo.translate(0, 6, 0)
        const pos = geo.attributes.position
        for (let i = 0; i < pos.count; i++) {
            const y = pos.getY(i)
            if (y > 0.5 && y < 11) {
                pos.setX(i, pos.getX(i) + (Math.random() - 0.5) * 1.5)
                pos.setZ(i, pos.getZ(i) + (Math.random() - 0.5) * 1.5)
            }
        }
        geo.computeVertexNormals()
        return geo
    }, [])

    return (
        <group>
            {/* Ground plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
                <planeGeometry args={[120, 120]} />
                <meshStandardMaterial color="#1a3a1a" roughness={0.9} />
            </mesh>

            {/* Secondary green layer for the town area */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[60, 60]} />
                <meshStandardMaterial color="#2d5a2d" roughness={0.85} />
            </mesh>

            {/* Mt. Makiling - Main peak */}
            <mesh geometry={mountainGeometry} position={[-30, 0, -30]} castShadow>
                <meshStandardMaterial
                    color="#2d6b2d"
                    roughness={0.8}
                    flatShading
                />
            </mesh>

            {/* Mt. Makiling - Secondary peak */}
            <mesh geometry={secondaryPeak} position={[-22, 0, -25]} castShadow>
                <meshStandardMaterial
                    color="#3a7a3a"
                    roughness={0.8}
                    flatShading
                />
            </mesh>

            {/* Small hill */}
            <mesh position={[-35, 2, -22]}>
                <sphereGeometry args={[5, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#3a7a3a" roughness={0.9} flatShading />
            </mesh>

            {/* Creek / river for hazard zone */}
            <mesh rotation={[-Math.PI / 2, 0, 0.3]} position={[15, 0.02, 8]}>
                <planeGeometry args={[1.2, 25]} />
                <meshStandardMaterial
                    color="#1a4a6a"
                    roughness={0.3}
                    metalness={0.1}
                    transparent
                    opacity={0.7}
                />
            </mesh>

            {/* Road - main */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <planeGeometry args={[1.5, 55]} />
                <meshStandardMaterial color="#333333" roughness={0.95} />
            </mesh>

            {/* Road - cross */}
            <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, 0.01, 5]}>
                <planeGeometry args={[1.2, 45]} />
                <meshStandardMaterial color="#333333" roughness={0.95} />
            </mesh>

            {/* Trees scattered */}
            {Array.from({ length: 25 }).map((_, i) => {
                const x = (Math.random() - 0.5) * 55
                const z = (Math.random() - 0.5) * 55
                const scale = 0.5 + Math.random() * 0.8
                return (
                    <group key={i} position={[x, 0, z]} scale={scale}>
                        <mesh position={[0, 1.2, 0]} castShadow>
                            <coneGeometry args={[0.6, 1.8, 5]} />
                            <meshStandardMaterial color="#1a5a2a" flatShading />
                        </mesh>
                        <mesh position={[0, 0.3, 0]}>
                            <cylinderGeometry args={[0.08, 0.1, 0.6, 4]} />
                            <meshStandardMaterial color="#4a3520" />
                        </mesh>
                    </group>
                )
            })}
        </group>
    )
}
