export const RELATIONSHIPS = [
    {
        id: 'uplb-students',
        actors: ['uplb', 'students'],
        type: 'Accommodation',
        nature: 'Mixed',
        color: '#f59e0b',
        justification:
            'The limited on-campus housing capacity of UPLB pushes students and faculty to seek housing in the town proper. While this setup allows the institution to continue operating efficiently, it indirectly shifts housing pressure to the local community.',
        visual: 'Flow of students radiating outward from campus into surrounding residential areas.',
    },
    {
        id: 'students-landowners',
        actors: ['students', 'landowners'],
        type: 'Cooperation',
        nature: 'Positive',
        color: '#10b981',
        justification:
            'Students and faculty need nearby housing, while private landowners supply rooms and apartments. This mutual dependence sustains the off-campus rental market.',
        visual: 'Pipeline graphics showing student flow from UPLB gates to private boarding houses.',
    },
    {
        id: 'students-residents',
        actors: ['students', 'residents'],
        type: 'Competition',
        nature: 'Negative',
        color: '#f97316',
        justification:
            'Students and residents compete for the same housing stock. Students\' ability to pay per-bed rates often drives up rents, disadvantaging long-term residents.',
        visual: 'Gentrification heatmaps expanding outward, shrinking original residential zones.',
    },
    {
        id: 'landowners-developers',
        actors: ['landowners', 'developers'],
        type: 'Amalgamation',
        nature: 'Positive',
        color: '#a855f7',
        justification:
            'Some private landowners sell or partner with developers, consolidating land for larger housing projects aimed at higher profit.',
        visual: 'Low-density houses gradually merging and transforming into high-rise structures.',
    },
    {
        id: 'developers-residents',
        actors: ['developers', 'residents'],
        type: 'Conflict',
        nature: 'Negative',
        color: '#ef4444',
        justification:
            'New developments raise land values and property taxes, increasing the risk of displacement among permanent residents.',
        visual: 'Red warning indicators around residential areas near new developments.',
    },
    {
        id: 'residents-isf',
        actors: ['residents', 'isf'],
        type: 'Assimilation',
        nature: 'Mixed',
        color: '#3b82f6',
        justification:
            'ISFs often integrate socially within barangays, but remain economically marginalized due to insecure tenure.',
        visual: 'ISF avatars slowly blending into the residential zone color palette over time.',
    },
    {
        id: 'lgu-isf',
        actors: ['lgu', 'isf'],
        type: 'Conflict',
        nature: 'Negative',
        color: '#ef4444',
        justification:
            'Clearing operations, eviction threats, and relocation policies create sustained tension between authorities and ISFs.',
        visual: 'Red warning zones and displacement animations near hazard areas.',
    },
    {
        id: 'lgu-developers',
        actors: ['lgu', 'developers'],
        type: 'Cooperation',
        nature: 'Mixed',
        color: '#10b981',
        justification:
            'While developers contribute to local revenue and urban growth, zoning flexibility may weaken protections for low-income groups.',
        visual: 'Gradual replacement of low-density housing with high-rises after permit animations.',
    },
    {
        id: 'vendors-landowners',
        actors: ['vendors', 'landowners'],
        type: 'Assimilation',
        nature: 'Mixed',
        color: '#3b82f6',
        justification:
            'Rising costs of goods and services are normalized and used by landowners to justify rent increases.',
        visual: 'Oscillating price indicators above commercial and housing units in sync.',
    },
    {
        id: 'vendors-students',
        actors: ['vendors', 'students'],
        type: 'Cooperation',
        nature: 'Positive',
        color: '#10b981',
        justification:
            'Students and faculty provide a steady customer base that sustains local micro-enterprises.',
        visual: 'High flow of currency/goods between campus borders and commercial zones.',
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
