/**
 * Pure simulation functions that compute derived state from time and transient population inputs.
 */

export function computeZoneSizes(timeStep, transientPop) {
    const t = timeStep / 100
    const popFactor = transientPop / 8000

    return {
        campus: 1.0 + popFactor * 0.15,
        commercial: 1.0 + t * 0.3 * popFactor,
        residential: 1.0 + t * 0.2,
        informal: Math.max(0.2, 1.0 - t * 0.6),
        development: 0.3 + t * 0.8 * popFactor,
    }
}

export function computeRent(timeStep, transientPop) {
    const t = timeStep / 100
    const popFactor = transientPop / 8000
    const baseRent = 2500
    return Math.round(baseRent * (1 + t * 1.5 * popFactor))
}

export function computeVendorPrices(timeStep, transientPop) {
    const t = timeStep / 100
    const popFactor = transientPop / 8000
    const basePrice = 35
    return Math.round(basePrice * (1 + t * 0.8 * popFactor))
}

export function computeGentrification(timeStep, transientPop) {
    const t = timeStep / 100
    const popFactor = transientPop / 8000
    return t * popFactor * 8
}

export function computeActorPopulations(timeStep, transientPop) {
    const t = timeStep / 100
    const popFactor = transientPop / 8000

    return {
        transients: Math.round(6500 * popFactor),
        residents: Math.round(3000 * Math.max(0.5, 1 - t * 0.3 * popFactor)),
        uplb: 300,
        landowners: Math.round(500 * (1 + t * 0.5)),
        developers: Math.round(100 * (1 + t * 2.0)),
        lgu: 200,
        vendors: Math.round(1200 * (1 + t * 0.4 * popFactor)),
        isf: Math.round(800 * Math.max(0.15, 1 - t * 0.7)),
    }
}

export function computeDisplacement(timeStep) {
    const t = timeStep / 100
    return t * 0.8
}

export function computeAssimilation(timeStep) {
    const t = timeStep / 100
    return Math.min(1, t * 1.2)
}

/**
 * Compute connection intensity factor for dynamic beam scaling.
 * Higher transient population = thicker Cooperation/Competition lines.
 */
export function computeConnectionIntensity(timeStep, transientPop) {
    const t = timeStep / 100
    const popFactor = transientPop / 8000
    return 0.5 + popFactor * 0.5 + t * 0.3
}

export function computeEconomicStats(timeStep, transientPop) {
    return {
        avgRent: computeRent(timeStep, transientPop),
        avgMealPrice: computeVendorPrices(timeStep, transientPop),
        totalPopulation:
            Object.values(computeActorPopulations(timeStep, transientPop)).reduce(
                (a, b) => a + b,
                0
            ),
        gentrificationRadius: computeGentrification(timeStep, transientPop),
        displacementRate: Math.round(computeDisplacement(timeStep) * 100),
    }
}
