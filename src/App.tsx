import React, { useMemo, useState } from "react";
import "./App.css";

type Player = "X" | "O";
type Cell = Player | null;
type Board = Cell[];

const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinner(board: Board): { winner: Player | null; line: number[] | null } {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return { winner: null, line: null };
}

function isDraw(board: Board) {
  return board.every((c) => c !== null);
}

export default function App() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [current, setCurrent] = useState<Player>("X");
  const [score, setScore] = useState<Record<Player, number>>({ X: 0, O: 0 });
  const [round, setRound] = useState(1);

  const { winner, line } = useMemo(() => getWinner(board), [board]);
  const draw = !winner && isDraw(board);

  function handleClick(i: number) {
    if (board[i] || winner) return;

    setBoard((prev) => {
      const next = prev.slice();
      next[i] = current;
      return next;
    });
    setCurrent((p) => (p === "X" ? "O" : "X"));
  }

  function resetBoard(nextStarter: Player = current) {
    setBoard(Array(9).fill(null));
    setCurrent(nextStarter);
    setRound((r) => r + 1);
  }

  function resetAll() {
    setBoard(Array(9).fill(null));
    setCurrent("X");
    setScore({ X: 0, O: 0 });
    setRound(1);
  }

  // когда появился победитель — обновим счёт один раз
  React.useEffect(() => {
    if (winner) {
      setScore((s) => ({ ...s, [winner]: s[winner] + 1 }));
    }
  }, [winner]);

  const statusText = winner
      ? `Победили ${winner} 🎉`
      : draw
          ? "Ничья 🤝"
          : `Ход: ${current}`;

  return (
      <div className="page">
        <div className="card">
          <header className="header">
            <div>
              <h1 className="title">Крестики-нолики</h1>
              <p className="subtitle">Раунд #{round}</p>
            </div>

            <div className="score">
              <div className={`scoreItem ${current === "X" && !winner && !draw ? "active" : ""}`}>
                <span className="badge x">X</span>
                <span className="scoreNum">{score.X}</span>
              </div>
              <div className="divider" />
              <div className={`scoreItem ${current === "O" && !winner && !draw ? "active" : ""}`}>
                <span className="badge o">O</span>
                <span className="scoreNum">{score.O}</span>
              </div>
            </div>
          </header>

          <div className="status" aria-live="polite">
            {statusText}
          </div>

          <div className="board" role="grid" aria-label="Tic tac toe board">
            {board.map((cell, i) => {
              const isWinCell = line?.includes(i);
              return (
                  <button
                      key={i}
                      className={`cell ${cell ? "filled" : ""} ${isWinCell ? "win" : ""}`}
                      onClick={() => handleClick(i)}
                      role="gridcell"
                      aria-label={`cell-${i + 1}`}
                  >
                <span className={`mark ${cell === "X" ? "x" : cell === "O" ? "o" : ""}`}>
                  {cell ?? ""}
                </span>
                    <span className="cellGlow" />
                  </button>
              );
            })}
          </div>

          <div className="actions">
            {(winner || draw) ? (
                <button className="btn primary" onClick={() => resetBoard(winner ? winner : current)}>
                  Следующий раунд
                </button>
            ) : (
                <button className="btn" onClick={() => resetBoard(current)}>
                  Перезапуск раунда
                </button>
            )}
            <button className="btn ghost" onClick={resetAll}>
              Сбросить счёт
            </button>
          </div>

          <footer className="footer">
          <span className="hint">
            Кликни по клетке. Победа — 3 в ряд.
          </span>
          </footer>
        </div>
      </div>
  );
}
