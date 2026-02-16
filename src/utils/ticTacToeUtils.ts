import {
  TicTacToeBoardType,
  TicTacToePlayerSymbol,
} from "../types/ticTacToeTypes";

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

export const getWinner = (
  board: TicTacToeBoardType,
): TicTacToePlayerSymbol | null => {
  for (const [a, b, c] of WIN_LINES) {
    const v = board[a];

    // A winning line will have the same non-null value in all three positions.
    if (v && v === board[b] && v === board[c]) return v;
  }
  return null;
};

export const isDraw = (board: TicTacToeBoardType): boolean => {
  // The board is full but no winning lines exist
  return !getWinner(board) && board.every((c) => c !== null);
};

const availableMoves = (board: TicTacToeBoardType): number[] => {
  const moves: number[] = [];
  board.forEach((cell, index) => {
    if (board[index] === null) {
      moves.push(index);
    }
  });
  return moves;
};

const miniMax = (
  board: TicTacToeBoardType,
  turn: TicTacToePlayerSymbol,
  movesAhead: number,
  aiSymbol: TicTacToePlayerSymbol = "O",
  humanSymbol: TicTacToePlayerSymbol = "X",
): { score: number; move: number | null } => {
  const boardCopy = [...board];

  const winner = getWinner(boardCopy);
  if (winner === aiSymbol) return { score: 10 - movesAhead, move: null };
  if (winner === humanSymbol) return { score: movesAhead - 10, move: null };
  if (boardCopy.every((c) => c !== null)) return { score: 0, move: null };

  const moves = availableMoves(boardCopy);

  // AI tries to maximize score; human tries to minimize score.
  let best =
    turn === aiSymbol
      ? { score: -Infinity, move: null as number | null }
      : { score: Infinity, move: null as number | null };

  moves.forEach((m) => {
    boardCopy[m] = turn;
    const next = miniMax(
      boardCopy,
      turn === "X" ? "O" : "X", // next player's turn
      movesAhead + 1,
      aiSymbol,
      humanSymbol,
    );
    boardCopy[m] = null;

    if (turn === aiSymbol) {
      if (next.score > best.score) best = { score: next.score, move: m };
    } else {
      if (next.score < best.score) best = { score: next.score, move: m };
    }
  });

  return best;
};

export const getBestMove = (
  board: TicTacToeBoardType,
  ai: TicTacToePlayerSymbol = "O",
  human: TicTacToePlayerSymbol = "X",
): number | null => {
  if (getWinner(board) || board.every((c) => c !== null)) {
    return null;
  }

  return miniMax(board, ai, 0, ai, human).move;
};
