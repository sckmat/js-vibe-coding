import React, { useMemo, useState, useEffect } from "react";
import "./App.css";

import { Board, Player } from "./core/types";
import { getWinner, isDraw } from "./core/gameLogic";
import { ScoreBoard } from "./components/ScoreBoard";
import { BoardView } from "./components/Board";
import { Status } from "./components/Status";
import { Actions } from "./components/Actions";

export default function App() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [current, setCurrent] = useState<Player>("X");
  const [score, setScore] = useState<Record<Player, number>>({ X: 0, O: 0 });
  const [round, setRound] = useState(1);

  const { winner, line } = useMemo(() => getWinner(board), [board]);
  const draw = !winner && isDraw(board);

  const handleClick = (i: number) => {
    if (board[i] || winner) return;

    setBoard((prev) => {
      const next = [...prev];
      next[i] = current;
      return next;
    });
    setCurrent((p) => (p === "X" ? "O" : "X"));
  };

  useEffect(() => {
    if (winner) {
      setScore((s) => ({ ...s, [winner]: s[winner] + 1 }));
    }
  }, [winner]);

  const resetRound = (starter: Player) => {
    setBoard(Array(9).fill(null));
    setCurrent(starter);
    setRound((r) => r + 1);
  };

  const resetAll = () => {
    setBoard(Array(9).fill(null));
    setCurrent("X");
    setScore({ X: 0, O: 0 });
    setRound(1);
  };

  return (
      <div className="page">
        <div className="card">
          <header className="header">
            <div>
              <h1 className="title">Крестики-нолики</h1>
              <p className="subtitle">Раунд #{round}</p>
            </div>

            <ScoreBoard current={current} winner={winner} draw={draw} score={score} />
          </header>

          <Status winner={winner} draw={draw} current={current} />

          <BoardView board={board} line={line} onClick={handleClick} />

          <Actions
              winner={winner}
              draw={draw}
              current={current}
              onResetRound={resetRound}
              onResetAll={resetAll}
          />

          <footer className="footer">
            <span className="hint">Кликни по клетке. Победа — 3 в ряд.</span>
          </footer>
        </div>
      </div>
  );
}
