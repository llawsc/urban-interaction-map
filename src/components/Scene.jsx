import { useEffect, useRef, memo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import Terrain from './Terrain'
import CampusZone from './zones/CampusZone'
import CommercialZone from './zones/CommercialZone'
import ResidentialZone from './zones/ResidentialZone'
import InformalZone from './zones/InformalZone'
import DevelopmentZone from './zones/DevelopmentZone'
import ZoneLabels from './zones/ZoneLabels'
import ActorParticles from './actors/ActorParticles'
import ConnectionBeams from './interactions/ConnectionBeams'
import HeatmapOverlay from './interactions/HeatmapOverlay'
import PriceIndicators from './interactions/PriceIndicators'
import useSimulationStore from '../store/useSimulationStore'

function AutoPlay() {
    const isPlaying = useSimulationStore((s) => s.isPlaying)
    const tick = useSimulationStore((s) => s.tick)
    const timeStep = useSimulationStore((s) => s.timeStep)
    const stopPlay = useSimulationStore((s) => s.stopPlay)

    useFrame(() => {
        if (isPlaying) {
            if (timeStep >= 100) {
                stopPlay()
            } else {
                tick()
            }
        }
    })

    return null
}

function Scene() {
    return (
        <Canvas
            shadows
            camera={{ position: [25, 25, 30], fov: 50, near: 0.1, far: 200 }}
            style={{ width: '100%', height: '100%' }}
            gl={{ antialias: true, alpha: false }}
            dpr={[1, 1.5]}
        >
            {/* Lighting */}
            <color attach="background" args={['#0a0e1a']} />
            <fog attach="fog" args={['#0a0e1a', 50, 100]} />
            <ambientLight intensity={0.4} color="#8899bb" />
            <directionalLight
                position={[20, 30, 15]}
                intensity={1.2}
                color="#ffeedd"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={80}
                shadow-camera-left={-40}
                shadow-camera-right={40}
                shadow-camera-top={40}
                shadow-camera-bottom={-40}
            />
            <directionalLight position={[-10, 15, -10]} intensity={0.3} color="#88aaff" />
            <hemisphereLight
                skyColor="#334477"
                groundColor="#1a3a1a"
                intensity={0.4}
            />

            {/* Sky */}
            <Sky
                distance={450}
                sunPosition={[20, 8, -15]}
                inclination={0.45}
                azimuth={0.25}
                rayleigh={0.5}
            />

            {/* Controls */}
            <OrbitControls
                makeDefault
                minDistance={8}
                maxDistance={80}
                minPolarAngle={0.2}
                maxPolarAngle={Math.PI / 2.2}
                enableDamping
                dampingFactor={0.05}
                target={[0, 0, 2]}
            />

            <Suspense fallback={null}>
                {/* Environment */}
                <Terrain />

                {/* Zones */}
                <CampusZone />
                <CommercialZone />
                <ResidentialZone />
                <InformalZone />
                <DevelopmentZone />
                <ZoneLabels />

                {/* Actors & Interactions */}
                <ActorParticles />
                <ConnectionBeams />
                <HeatmapOverlay />
                <PriceIndicators />
            </Suspense>

            {/* Auto-play ticker */}
            <AutoPlay />
        </Canvas>
    )
}

export default memo(Scene)
