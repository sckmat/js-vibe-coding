import { Player } from "../core/types";

type Props = {
    winner: Player | null;
    draw: boolean;
    current: Player;
    onResetRound: (starter: Player) => void;
    onResetAll: () => void;
};

export function Actions({ winner, draw, current, onResetRound, onResetAll }: Props) {
    const nextStarter = winner ?? current;

    return (
        <div className="actions">
            {winner || draw ? (
                <button className="btn primary" onClick={() => onResetRound(nextStarter)}>
                    Следующий раунд
                </button>
            ) : (
                <button className="btn" onClick={() => onResetRound(current)}>
                    Перезапуск раунда
                </button>
            )}

            <button className="btn ghost" onClick={onResetAll}>
                Сбросить счёт
            </button>
        </div>
    );
}
