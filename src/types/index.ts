export type PokemonCard = {
    id: number;
    name: string;
    imageUrl: string;
    clicked: boolean;
};

export type Difficulty = "easy" | "normal" | "hard";

export type Result = "ok" | "duplicate" | "win";

export type GameState = {
    cards: PokemonCard[];
    loading: boolean;
    error: string | null;
    currentScore: number;
    bestScore: number;
    difficulty: Difficulty;
    isHydrated: boolean;
    fetchCards: (count?: number) => Promise<void>;
    handleCard: (id: number) => Result;
    resetGame: () => void;
    setDifficulty: (difficulty: Difficulty) => Promise<void>;
};