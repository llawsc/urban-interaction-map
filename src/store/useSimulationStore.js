import { create } from 'zustand'
import { ACTORS } from '../data/actors'
import { RELATIONSHIPS } from '../data/relationships'

const useSimulationStore = create((set, get) => ({
    // Simulation controls
    timeStep: 0,
    enrollment: 8000,
    isPlaying: false,

    // UI state
    isUIHidden: false,
    showSummary: false,

    // Actor visibility
    actorVisibility: Object.fromEntries(ACTORS.map((a) => [a.id, true])),

    // Selection state
    selectedActor: null,
    selectedRelationship: null,

    // Static data refs
    actors: ACTORS,
    relationships: RELATIONSHIPS,

    // Actions
    setTimeStep: (val) => set({ timeStep: val }),
    setEnrollment: (val) => set({ enrollment: val }),
    togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
    stopPlay: () => set({ isPlaying: false }),
    toggleUI: () => set((s) => ({ isUIHidden: !s.isUIHidden })),
    toggleSummary: () => set((s) => ({ showSummary: !s.showSummary })),

    toggleActorVisibility: (actorId) =>
        set((s) => ({
            actorVisibility: {
                ...s.actorVisibility,
                [actorId]: !s.actorVisibility[actorId],
            },
        })),

    selectActor: (actorId) =>
        set((s) => ({
            selectedActor: s.selectedActor === actorId ? null : actorId,
            selectedRelationship: null,
        })),

    selectRelationship: (relId) =>
        set((s) => ({
            selectedRelationship: s.selectedRelationship === relId ? null : relId,
            selectedActor: null,
        })),

    clearSelection: () =>
        set({ selectedActor: null, selectedRelationship: null }),

    // Tick forward for auto-play
    tick: () =>
        set((s) => ({
            timeStep: Math.min(100, s.timeStep + 0.5),
        })),
}))

export default useSimulationStore
