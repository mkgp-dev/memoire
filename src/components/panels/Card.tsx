import type { PokemonCard as CardType } from "@/types";
import { Card, CardContent } from "../ui/card";

type Props = {
    card: CardType;
    onClick: () => void;
};

export function CardPanel({ card, onClick }: Props) {

    return (
        <Card
            onClick={onClick}
            className="bg-slate-800 border border-gray-600 cursor-pointer hover:border-sky-500"
        >
            <CardContent className="flex flex-col items-center space-y-3">
                <div className="w-28 h-28">
                    <img
                        src={card.imageUrl}
                        alt={card.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <p className="text-slate-300">{card.name}</p>
            </CardContent>
        </Card>
    );
}