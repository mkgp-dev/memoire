import { create } from "zustand";
import localforage from "@/database/LocalForage";
import type { GameState, Difficulty, PokemonCard } from "@/types";
import { fetchCards } from "@/services/pokemon";
import { persist, createJSONStorage } from "zustand/middleware";

const DIFFICULTY_LEVEL: Record<Difficulty, number> = {
    easy: 6,
    normal: 12,
    hard: 18,
} as const;

function shuffle<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]]
    }

    return copy;
}

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            cards: [],
            loading: false,
            error: null,
            currentScore: 0,
            bestScore: 0,
            difficulty: "normal",
            isHydrated: false,

            async fetchCards(count) {
                const { difficulty } = get();
                const level = count ?? DIFFICULTY_LEVEL[difficulty];

                try {
                    set({ loading: true, error: null });
                    const cards = await fetchCards(level);
                    set({
                        cards: shuffle(cards),
                        loading: false,
                        currentScore: 0,
                    });
                } catch (error) {
                    const message = error instanceof Error
                        ? error.message
                        : "An error has occured with PokeAPI.";

                    set({ loading: false, error: message });
                }
            },

            handleCard(id) {
                const { cards, currentScore, bestScore } = get();
                const card = cards.find(item => item.id === id);
                if (!card) return "ok";

                if (card.clicked) {
                    const resetCards = cards.map(item => ({ ...item, clicked: false }));
                    set({
                        cards: shuffle(resetCards),
                        currentScore: 0,
                    });

                    return "duplicate";
                }

                const updateCards: PokemonCard[] = cards.map(item => item.id === id ? { ...item, clicked: true } : item);
                const updateScore = currentScore + 1;
                const updateBest = Math.max(bestScore, updateScore);
                const condition = updateScore === updateCards.length;

                set({
                    cards: shuffle(updateCards),
                    currentScore: updateScore,
                    bestScore: updateBest,
                });

                return condition ? "win" : "ok";
            },

            resetGame() {
                const { cards } = get();
                const resetCards = cards.map(item => ({ ...item, clicked: false }));
                set({
                    cards: shuffle(resetCards),
                    currentScore: 0,
                });
            },

            async setDifficulty(difficulty) {
                set({ difficulty });
                await get().fetchCards(DIFFICULTY_LEVEL[difficulty]);
            },
        }),
        {
            name: "gameData",
            storage: createJSONStorage(() => localforage),
            partialize: (state) => ({
                bestScore: state.bestScore,
                difficulty: state.difficulty,
            }),
            onRehydrateStorage: () => (state) => {
                state?.isHydrated?.valueOf();
            },
        }
    )
);