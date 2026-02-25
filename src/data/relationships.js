export const RELATIONSHIPS = [
    {
        id: 'transients-vendors',
        actors: ['transients', 'vendors'],
        type: 'Cooperation',
        nature: 'Positive',
        color: '#10b981',
        justification:
            'Transients rely on nearby vendors for affordable food and daily services, while vendors depend on the consistent transient population to sustain their businesses. This mutual dependence constitutes cooperation.',
        visual: 'High flow of currency/goods between campus borders and commercial zones.',
    },
    {
        id: 'uplb-landowners',
        actors: ['uplb', 'landowners'],
        type: 'Accommodation',
        nature: 'Mixed',
        color: '#f59e0b',
        justification:
            'Due to insufficient on-campus housing, private landowners provide off-campus rentals. The university indirectly benefits from this arrangement without formal coordination, reflecting accommodation rather than cooperation.',
        visual: 'Flow of students radiating outward from campus into surrounding residential areas.',
    },
    {
        id: 'transients-residents',
        actors: ['transients', 'residents'],
        type: 'Competition',
        nature: 'Negative',
        color: '#ef4444',
        justification:
            'The influx of transients creates sustained demand for housing and urban space. Since most do not settle permanently, they intensify competition over limited rental units and land, disadvantaging long-term residents.',
        visual: 'Gentrification heatmaps expanding outward, shrinking original residential zones.',
    },
    {
        id: 'lgu-isf',
        actors: ['lgu', 'isf'],
        type: 'Conflict',
        nature: 'Negative',
        color: '#ef4444',
        justification:
            'The LGU enforces zoning laws and disaster-risk regulations that directly oppose the interests of ISFs, resulting in structural conflict and eviction threats.',
        visual: 'Red warning zones and displacement animations near hazard areas.',
    },
    {
        id: 'landowners-vendors',
        actors: ['landowners', 'vendors'],
        type: 'Accommodation',
        nature: 'Mixed',
        color: '#f59e0b',
        justification:
            'Landowners and vendors coexist through economic adjustment rather than collaboration. Rising commodity prices are tolerated rather than jointly managed.',
        visual: 'Oscillating price indicators above commercial and housing units in sync.',
    },
    {
        id: 'developers-lgu',
        actors: ['developers', 'lgu'],
        type: 'Accommodation',
        nature: 'Mixed',
        color: '#f59e0b',
        justification:
            'Developers pursue profit-driven projects while the LGU regulates development; compromises via permits and zoning define the relationship.',
        visual: 'Gradual replacement of low-density housing with high-rises after permit animations.',
    },
    {
        id: 'transients-isf',
        actors: ['transients', 'isf'],
        type: 'Accommodation',
        nature: 'Mixed',
        color: '#f59e0b',
        justification:
            'Transients and ISFs coexist in the same urban space. Transients\' housing and resource use indirectly affects ISFs, but both groups adjust to each other out of necessity.',
        visual: 'ISF avatars adjusting positions as transient zones expand.',
    },
    {
        id: 'uplb-transients',
        actors: ['uplb', 'transients'],
        type: 'Accommodation',
        nature: 'Mixed',
        color: '#f59e0b',
        justification:
            'The university regulates student enrollment and limited on-campus housing. Transients adapt to these institutional constraints without direct negotiation, reflecting accommodation.',
        visual: 'Pipeline showing student flow from campus into town proper.',
    },
    {
        id: 'vendors-isf',
        actors: ['vendors', 'isf'],
        type: 'Cooperation',
        nature: 'Positive',
        color: '#10b981',
        justification:
            'ISFs purchase goods and services from local vendors, while vendors rely on ISFs as part of their customer base. This mutual support constitutes cooperation.',
        visual: 'Goods flow between commercial strips and informal settlement areas.',
    },
    {
        id: 'developers-landowners',
        actors: ['developers', 'landowners'],
        type: 'Cooperation',
        nature: 'Positive',
        color: '#10b981',
        justification:
            'Developers may buy land from private landowners to build housing or commercial projects. This mutually beneficial arrangement represents cooperation between actors.',
        visual: 'Low-density houses gradually merging and transforming into high-rise structures.',
    },
]

export const INTERACTION_TYPES = {
    Cooperation: { color: '#10b981', label: 'Cooperation', emoji: '🤝' },
    Conflict: { color: '#ef4444', label: 'Conflict', emoji: '⚔️' },
    Competition: { color: '#ef4444', label: 'Competition', emoji: '🏁' },
    Accommodation: { color: '#f59e0b', label: 'Accommodation', emoji: '🤞' },
}
