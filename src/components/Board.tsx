import { Board } from "../core/types";

type Props = {
    board: Board;
    line: number[] | null;
    onClick: (i: number) => void;
};

export function BoardView({ board, line, onClick }: Props) {
    return (
        <div className="board">
            {board.map((cell, i) => {
                const isWin = line?.includes(i);
                return (
                    <button
                        key={i}
                        className={`cell ${cell ? "filled" : ""} ${isWin ? "win" : ""}`}
                        onClick={() => onClick(i)}
                    >
            <span className={`mark ${cell === "X" ? "x" : cell === "O" ? "o" : ""}`}>
              {cell ?? ""}
            </span>
                        <span className="cellGlow" />
                    </button>
                );
            })}
        </div>
    );
}
