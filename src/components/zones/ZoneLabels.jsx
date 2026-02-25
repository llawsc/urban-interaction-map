import { memo } from 'react'
import { Html } from '@react-three/drei'
import { ACTORS } from '../../data/actors'
import useSimulationStore from '../../store/useSimulationStore'

const ZONE_CENTERS = {
    campus: [-12, 4.5, -9],
    commercial: [9, 4, -3],
    residential: [-2, 3.5, 12],
    informal: [17.5, 3, 11],
    development: [10, 6, 10],
}

function ZoneLabel({ position, label, color }) {
    return (
        <group position={position}>
            <Html center distanceFactor={20}>
                <div
                    style={{
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(8px)',
                        border: `1px solid ${color}40`,
                        borderRadius: '6px',
                        padding: '3px 8px',
                        color: color || '#94a3b8',
                        fontSize: '10px',
                        fontWeight: '600',
                        fontFamily: 'Inter, sans-serif',
                        whiteSpace: 'nowrap',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        pointerEvents: 'none',
                    }}
                >
                    {label}
                </div>
            </Html>
        </group>
    )
}

function ZoneLabels() {
    return (
        <group>
            <ZoneLabel position={[-12, 5.5, -9]} label="UPLB Campus" color="#8b7355" />
            <ZoneLabel position={[9, 4.5, -3]} label="Commercial · Grove" color="#d4a574" />
            <ZoneLabel position={[-2, 4, 12]} label="Residential · Subdivisions" color="#b8956a" />
            <ZoneLabel position={[17.5, 3.5, 11]} label="Informal Settlements" color="#ef4444" />
            <ZoneLabel position={[10, 8, 10]} label="Developments" color="#94a3b8" />
            <ZoneLabel position={[-30, 20, -30]} label="Mt. Makiling" color="#3a7a3a" />
        </group>
    )
}

export default memo(ZoneLabels)
