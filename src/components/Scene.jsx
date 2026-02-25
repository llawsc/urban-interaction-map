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
            <color attach="background" args={['#87CEEB']} />
            <fog attach="fog" args={['#b0d8f0', 60, 120]} />
            <ambientLight intensity={0.9} color="#fffbe6" />
            <directionalLight
                position={[25, 40, 20]}
                intensity={2.0}
                color="#fff5e0"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={80}
                shadow-camera-left={-40}
                shadow-camera-right={40}
                shadow-camera-top={40}
                shadow-camera-bottom={-40}
            />
            <directionalLight position={[-15, 20, -10]} intensity={0.5} color="#aaccff" />
            <hemisphereLight
                skyColor="#87CEEB"
                groundColor="#4a8a3a"
                intensity={0.6}
            />

            {/* Sky */}
            <Sky
                distance={450}
                sunPosition={[30, 40, -10]}
                inclination={0.49}
                azimuth={0.25}
                rayleigh={0.8}
                turbidity={4}
                mieCoefficient={0.003}
                mieDirectionalG={0.8}
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
