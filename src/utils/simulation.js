/**
 * Pure simulation functions that compute derived state from time and enrollment inputs.
 */

export function computeZoneSizes(timeStep, enrollment) {
    const t = timeStep / 100
    const enrollFactor = enrollment / 8000

    return {
        campus: 1.0 + enrollFactor * 0.15,
        commercial: 1.0 + t * 0.3 * enrollFactor,
        residential: 1.0 + t * 0.2,
        informal: Math.max(0.2, 1.0 - t * 0.6),
        development: 0.3 + t * 0.8 * enrollFactor,
    }
}

export function computeRent(timeStep, enrollment) {
    const t = timeStep / 100
    const enrollFactor = enrollment / 8000
    const baseRent = 2500
    return Math.round(baseRent * (1 + t * 1.5 * enrollFactor))
}

export function computeVendorPrices(timeStep, enrollment) {
    const t = timeStep / 100
    const enrollFactor = enrollment / 8000
    const basePrice = 35
    return Math.round(basePrice * (1 + t * 0.8 * enrollFactor))
}

export function computeGentrification(timeStep, enrollment) {
    const t = timeStep / 100
    const enrollFactor = enrollment / 8000
    return t * enrollFactor * 8
}

export function computeActorPopulations(timeStep, enrollment) {
    const t = timeStep / 100
    const enrollFactor = enrollment / 8000

    return {
        students: Math.round(5000 * enrollFactor),
        vendors: Math.round(1200 * (1 + t * 0.4 * enrollFactor)),
        lgu: 200,
        isf: Math.round(800 * Math.max(0.15, 1 - t * 0.7)),
        residents: Math.round(3000 * Math.max(0.5, 1 - t * 0.3 * enrollFactor)),
        landowners: Math.round(500 * (1 + t * 0.5)),
        developers: Math.round(100 * (1 + t * 2.0)),
        transients: Math.round(1500 * enrollFactor * (1 + t * 0.3)),
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

export function computeEconomicStats(timeStep, enrollment) {
    return {
        avgRent: computeRent(timeStep, enrollment),
        avgMealPrice: computeVendorPrices(timeStep, enrollment),
        totalPopulation:
            Object.values(computeActorPopulations(timeStep, enrollment)).reduce(
                (a, b) => a + b,
                0
            ),
        gentrificationRadius: computeGentrification(timeStep, enrollment),
        displacementRate: Math.round(computeDisplacement(timeStep) * 100),
    }
}
