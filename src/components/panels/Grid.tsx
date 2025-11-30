import { useGameStore } from "@/hooks/useGameStore";
import { toast } from "sonner";
import type { PokemonCard as CardType, Result } from "@/types";
import { CardPanel } from "./Card";
import { motion } from "motion/react";
import { Spinner } from "../ui/spinner";
import clsx from "clsx";

export function Grid() {
    const cards = useGameStore(state => state.cards);
    const load = useGameStore(state => state.loading);
    const error = useGameStore(state => state.error);
    const difficulty = useGameStore(state => state.difficulty);
    const handleCard = useGameStore(state => state.handleCard);
    const reset = useGameStore(state => state.resetGame);

    const handleClick = (card: CardType) => {
        const result: Result = handleCard(card.id);

        if (result === "duplicate")
            toast.error("Womp womp.", { description: "You already clicked this one. Your streak has been reset." });

        if (result === "win") {
            reset();
            toast.success("Well done!", { description: "You clicked every Pokémon without a duplicate." });
        }
    };

    if (load)
        return (
            <div className="flex items-center justify-center">
                <Spinner />
            </div>
        );

    if (error)
        return (
            <div className="flex items-center justify-center">
                <p className="text-sm font-thin">{error}</p>
            </div>
        );

    return (
        <motion.section
            className={clsx(
                "grid grid-cols-1 gap-4",
                difficulty === "easy" && "md:grid-cols-3",
                difficulty === "normal" && "md:grid-cols-4",
                difficulty === "hard" && "md:grid-cols-6",
            )}
            key={cards.map((c) => c.id).join("-")}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
        >
            {cards.map(item => (
                <CardPanel
                    key={item.id}
                    card={item}
                    onClick={() => handleClick(item)}
                />
            ))}
        </motion.section>
    );
}