import { useRef, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import useSimulationStore from '../../store/useSimulationStore'
import { computeRent, computeVendorPrices } from '../../utils/simulation'

function PriceTag({ position, value, label, color }) {
    const ref = useRef()

    useFrame((state) => {
        if (!ref.current) return
        const t = state.clock.elapsedTime
        ref.current.position.y = position[1] + Math.sin(t * 2) * 0.3
    })

    return (
        <group ref={ref} position={position}>
            <Html center distanceFactor={15}>
                <div
                    style={{
                        background: 'rgba(0,0,0,0.75)',
                        backdropFilter: 'blur(8px)',
                        border: `1px solid ${color}40`,
                        borderRadius: '8px',
                        padding: '4px 10px',
                        color: color,
                        fontSize: '11px',
                        fontWeight: '700',
                        fontFamily: 'Inter, sans-serif',
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                        lineHeight: '1.3',
                        pointerEvents: 'none',
                    }}
                >
                    <div style={{ fontSize: '9px', opacity: 0.7, marginBottom: '1px' }}>
                        {label}
                    </div>
                    ₱{value}
                </div>
            </Html>
        </group>
    )
}

function PriceIndicators() {
    const timeStep = useSimulationStore((s) => s.timeStep)
    const enrollment = useSimulationStore((s) => s.enrollment)
    const rent = computeRent(timeStep, enrollment)
    const mealPrice = computeVendorPrices(timeStep, enrollment)

    return (
        <group>
            <PriceTag
                position={[-3, 4, 10]}
                value={rent.toLocaleString()}
                label="AVG RENT"
                color="#8b5cf6"
            />
            <PriceTag
                position={[9, 3.5, -1]}
                value={mealPrice}
                label="MEAL PRICE"
                color="#f59e0b"
            />
        </group>
    )
}

export default memo(PriceIndicators)
