import { Player } from "../core/types";

type Props = {
    current: Player;
    winner: Player | null;
    draw: boolean;
    score: Record<Player, number>;
};

export function ScoreBoard({ current, winner, draw, score }: Props) {
    const active = (p: Player) => (current === p && !winner && !draw ? "active" : "");

    return (
        <div className="score">
            <div className={`scoreItem ${active("X")}`}>
                <span className="badge x">X</span>
                <span className="scoreNum">{score.X}</span>
            </div>

            <div className="divider" />

            <div className={`scoreItem ${active("O")}`}>
                <span className="badge o">O</span>
                <span className="scoreNum">{score.O}</span>
            </div>
        </div>
    );
}
