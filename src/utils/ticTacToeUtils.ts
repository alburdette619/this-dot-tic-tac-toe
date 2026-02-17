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

const OPTIMAL_FIRST_MOVES = [0, 2, 4, 6, 8];

export const getWinner = (
  board: TicTacToeBoardType,
): null | TicTacToePlayerSymbol => {
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
): { move: null | number; score: number } => {
  const boardCopy = [...board];

  const winner = getWinner(boardCopy);
  if (winner === aiSymbol) return { move: null, score: 10 - movesAhead };
  if (winner === humanSymbol) return { move: null, score: movesAhead - 10 };
  if (boardCopy.every((c) => c !== null)) return { move: null, score: 0 };

  const moves = availableMoves(boardCopy);

  // AI tries to maximize score; human tries to minimize score.
  let best =
    turn === aiSymbol
      ? { move: null as null | number, score: -Infinity }
      : { move: null as null | number, score: Infinity };

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
      if (next.score > best.score) best = { move: m, score: next.score };
    } else {
      if (next.score < best.score) best = { move: m, score: next.score };
    }
  });

  return best;
};

export const getBestMove = (
  board: TicTacToeBoardType,
  ai: TicTacToePlayerSymbol = "O",
  human: TicTacToePlayerSymbol = "X",
): null | number => {
  // If the board is empty, just take the middle. No need to run the minimax algorithm.
  if (board.every((c) => c === null))
    return OPTIMAL_FIRST_MOVES[
      Math.floor(Math.random() * OPTIMAL_FIRST_MOVES.length)
    ];

  if (getWinner(board) || board.every((c) => c !== null)) {
    return null;
  }

  return miniMax(board, ai, 0, ai, human).move;
};
