import { useMemo } from 'react'
import * as THREE from 'three'

export default function Terrain() {
    const mountainGeometry = useMemo(() => {
        const geo = new THREE.ConeGeometry(12, 18, 8)
        geo.translate(0, 9, 0)
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

    // Dashed center-line helper
    const roadDashes = (count, length, gap, axis) => {
        const dashes = []
        const total = length
        const dashLen = total / (count * 2 - 1)
        for (let i = 0; i < count; i++) {
            const offset = -total / 2 + i * dashLen * 2 + dashLen / 2
            const pos = axis === 'z' ? [0, 0.025, offset] : [offset, 0.025, 0]
            const size = axis === 'z' ? [0.12, 0.005, dashLen * 0.7] : [dashLen * 0.7, 0.005, 0.12]
            dashes.push(
                <mesh key={`dash-${axis}-${i}`} position={pos}>
                    <boxGeometry args={size} />
                    <meshStandardMaterial color="#f5f5f0" roughness={0.8} />
                </mesh>
            )
        }
        return dashes
    }

    return (
        <group>
            {/* Ground plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
                <planeGeometry args={[120, 120]} />
                <meshStandardMaterial color="#2a6b2a" roughness={0.9} />
            </mesh>

            {/* Secondary green layer for the town area */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[60, 60]} />
                <meshStandardMaterial color="#3d7a3d" roughness={0.85} />
            </mesh>

            {/* Mt. Makiling - Main peak */}
            <mesh geometry={mountainGeometry} position={[-30, 0, -30]} castShadow>
                <meshStandardMaterial color="#2d8b2d" roughness={0.8} flatShading />
            </mesh>

            {/* Mt. Makiling - Secondary peak */}
            <mesh geometry={secondaryPeak} position={[-22, 0, -25]} castShadow>
                <meshStandardMaterial color="#3a9a3a" roughness={0.8} flatShading />
            </mesh>

            {/* Small hill */}
            <mesh position={[-35, 2, -22]}>
                <sphereGeometry args={[5, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#3a9a3a" roughness={0.9} flatShading />
            </mesh>

            {/* ====== RIVER / CREEK ====== */}
            <mesh rotation={[-Math.PI / 2, 0, 0.3]} position={[15, 0.02, 8]}>
                <planeGeometry args={[1.8, 30]} />
                <meshStandardMaterial
                    color="#2a7aaa"
                    roughness={0.3}
                    metalness={0.1}
                    transparent
                    opacity={0.7}
                />
            </mesh>
            {/* River bank edges */}
            <mesh rotation={[-Math.PI / 2, 0, 0.3]} position={[14.1, 0.015, 7.7]}>
                <planeGeometry args={[0.4, 30]} />
                <meshStandardMaterial color="#5a4a30" roughness={0.95} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0.3]} position={[15.9, 0.015, 8.3]}>
                <planeGeometry args={[0.4, 30]} />
                <meshStandardMaterial color="#5a4a30" roughness={0.95} />
            </mesh>

            {/* ====== MAIN ROAD (North-South) ====== */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <planeGeometry args={[3, 55]} />
                <meshStandardMaterial color="#444444" roughness={0.95} />
            </mesh>
            {/* Road edges */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.5, 0.015, 0]}>
                <planeGeometry args={[0.15, 55]} />
                <meshStandardMaterial color="#ccccaa" roughness={0.8} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.5, 0.015, 0]}>
                <planeGeometry args={[0.15, 55]} />
                <meshStandardMaterial color="#ccccaa" roughness={0.8} />
            </mesh>
            {/* Center line dashes */}
            {roadDashes(25, 55, 0.5, 'z')}

            {/* ====== CROSS ROAD (East-West) ====== */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 5]}>
                <planeGeometry args={[45, 2.5]} />
                <meshStandardMaterial color="#444444" roughness={0.95} />
            </mesh>
            {/* Road edges */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 3.75]}>
                <planeGeometry args={[45, 0.12]} />
                <meshStandardMaterial color="#ccccaa" roughness={0.8} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 6.25]}>
                <planeGeometry args={[45, 0.12]} />
                <meshStandardMaterial color="#ccccaa" roughness={0.8} />
            </mesh>
            {/* Center line dashes (east-west) */}
            {roadDashes(20, 45, 0.5, 'x').map((d, i) => (
                <group key={`ew-${i}`} position={[0, 0, 5]}>
                    {d}
                </group>
            ))}

            {/* ====== TRAIN TRACKS ====== */}
            {/* Track runs roughly parallel to the cross road, offset south */}
            <group position={[0, 0.01, 18]}>
                {/* Rails */}
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[50, 0.12]} />
                    <meshStandardMaterial color="#888888" metalness={0.4} roughness={0.5} />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 1.2]}>
                    <planeGeometry args={[50, 0.12]} />
                    <meshStandardMaterial color="#888888" metalness={0.4} roughness={0.5} />
                </mesh>
                {/* Sleepers / ties */}
                {Array.from({ length: 40 }).map((_, i) => (
                    <mesh
                        key={`tie-${i}`}
                        rotation={[-Math.PI / 2, 0, 0]}
                        position={[-24 + i * 1.25, -0.002, 0.6]}
                    >
                        <planeGeometry args={[0.3, 1.8]} />
                        <meshStandardMaterial color="#5a4a35" roughness={0.9} />
                    </mesh>
                ))}
                {/* Gravel bed */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0.6]}>
                    <planeGeometry args={[50, 2.5]} />
                    <meshStandardMaterial color="#6a6050" roughness={0.95} />
                </mesh>
            </group>

            {/* ====== TREES ====== */}
            {Array.from({ length: 25 }).map((_, i) => {
                const x = (Math.random() - 0.5) * 55
                const z = (Math.random() - 0.5) * 55
                const scale = 0.5 + Math.random() * 0.8
                return (
                    <group key={i} position={[x, 0, z]} scale={scale}>
                        <mesh position={[0, 1.2, 0]} castShadow>
                            <coneGeometry args={[0.6, 1.8, 5]} />
                            <meshStandardMaterial color="#2a8a3a" flatShading />
                        </mesh>
                        <mesh position={[0, 0.3, 0]}>
                            <cylinderGeometry args={[0.08, 0.1, 0.6, 4]} />
                            <meshStandardMaterial color="#5a4520" />
                        </mesh>
                    </group>
                )
            })}
        </group>
    )
}
