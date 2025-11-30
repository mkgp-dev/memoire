import { useGameStore } from "@/hooks/useGameStore";
import type { Difficulty } from "@/types";
import { Card, CardContent } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

export function Scoreboard() {
    const difficulty = useGameStore(state => state.difficulty);
    const setDifficulty = useGameStore(state => state.setDifficulty);
    const fetchCards = useGameStore(state => state.fetchCards);
    const score = useGameStore(state => state.currentScore);
    const bestScore = useGameStore(state => state.bestScore);

    const handleChange = (value: string) => setDifficulty(value as Difficulty);

    return (
        <Card className="bg-slate-800 border border-gray-600 text-slate-300 w-full max-w-md">
            <CardContent className="space-y-2">
                <Select value={difficulty} onValueChange={handleChange}>
                    <SelectTrigger className="w-full border border-gray-600">
                        <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex items-center justify-between">
                    <Button
                        size="sm"
                        variant="outline"
                        className="bg-sky-500 text-black border-none cursor-pointer hover:bg-sky-600"
                        onClick={() => void fetchCards()}
                    >
                        Generate cards
                    </Button>

                    <div className="flex flex-col items-end">
                        <span>Current score is {score}</span>
                        <span className="text-emerald-500">Your best score is {bestScore}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}