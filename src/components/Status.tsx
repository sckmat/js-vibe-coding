import { Player } from "../core/types";

type Props = {
    winner: Player | null;
    draw: boolean;
    current: Player;
};

export function Status({ winner, draw, current }: Props) {
    const text = winner
        ? `Победили ${winner} 🎉`
        : draw
            ? "Ничья 🤝"
            : `Ход: ${current}`;

    return <div className="status">{text}</div>;
}
