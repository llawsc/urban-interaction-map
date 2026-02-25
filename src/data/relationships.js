export const RELATIONSHIPS = [
    {
        id: 'students-vendors',
        actors: ['students', 'vendors'],
        type: 'Cooperation',
        nature: 'Positive',
        color: '#10b981',
        justification:
            'Symbiotic economic survival. Students need cheap food and goods, and vendors rely on the massive student volume for daily income.',
        visual: 'High flow of currency/goods between campus borders and commercial zones.',
    },
    {
        id: 'lgu-isf',
        actors: ['lgu', 'isf'],
        type: 'Conflict',
        nature: 'Negative',
        color: '#ef4444',
        justification:
            'LGU enforces zoning laws and disaster risk reduction, leading to the constant threat of eviction for ISFs living on creeks or railways.',
        visual: 'Red warning zones and displacement animations near hazard areas.',
    },
    {
        id: 'students-residents',
        actors: ['students', 'residents'],
        type: 'Competition',
        nature: 'Negative',
        color: '#f97316',
        justification:
            'Both groups compete for the same limited local space. Students\' higher combined purchasing power ("per bed" rates) prices locals out of their own town.',
        visual: 'Gentrification heatmaps expanding outward, shrinking original residential zones.',
    },
    {
        id: 'landowners-vendors',
        actors: ['landowners', 'vendors'],
        type: 'Accommodation',
        nature: 'Mixed',
        color: '#f59e0b',
        justification:
            'A tense truce. As vendors raise food prices to survive, landowners use the rising cost of living as a justification to hike rent, creating a localized inflation loop. They tolerate each other out of economic necessity.',
        visual: 'Oscillating price indicators above commercial and housing units.',
    },
    {
        id: 'developers-lgu',
        actors: ['developers', 'lgu'],
        type: 'Accommodation',
        nature: 'Mixed',
        color: '#f59e0b',
        justification:
            'Developers want to build high-profit condos; LGUs want organized development and tax revenue but must manage local complaints. They reach compromises through zoning permits.',
        visual: 'Gradual replacement of low-density housing with high-rises after "permit" animations.',
    },
    {
        id: 'transients-landowners',
        actors: ['transients', 'landowners'],
        type: 'Cooperation',
        nature: 'Positive',
        color: '#10b981',
        justification:
            'UPLB relies on landowners to act as a "shadow dormitory" system due to their own lack of campus housing. Landowners rely on UPLB\'s enrollment for guaranteed customers.',
        visual: 'Pipeline graphics showing student flow directly from UPLB gates to private boarding houses.',
    },
    {
        id: 'transients-residents',
        actors: ['transients', 'residents'],
        type: 'Assimilation',
        nature: 'Positive',
        color: '#3b82f6',
        justification:
            'Over time, transient faculty and long-term students settle in Los Baños permanently, adopting local customs, buying property, and becoming part of the local demographic.',
        visual: 'Transient avatars slowly changing color to match Permanent Resident avatars over the simulation timeline.',
    },
    {
        id: 'all-transients-locals',
        actors: ['students', 'residents'],
        type: 'Amalgamation',
        nature: 'Mixed',
        color: '#a855f7',
        justification:
            'The biological and cultural blending of the university population with the provincial population over decades creates the unique "Elbi" subculture—a hybrid town identity that is neither purely rural nor entirely urban.',
        visual: 'Generation of a new hybrid "actor" class over long simulation periods.',
    },
]

export const INTERACTION_TYPES = {
    Cooperation: { color: '#10b981', label: 'Cooperation', emoji: '🤝' },
    Conflict: { color: '#ef4444', label: 'Conflict', emoji: '⚔️' },
    Competition: { color: '#f97316', label: 'Competition', emoji: '🏁' },
    Accommodation: { color: '#f59e0b', label: 'Accommodation', emoji: '🤞' },
    Assimilation: { color: '#3b82f6', label: 'Assimilation', emoji: '🔄' },
    Amalgamation: { color: '#a855f7', label: 'Amalgamation', emoji: '🧬' },
}
