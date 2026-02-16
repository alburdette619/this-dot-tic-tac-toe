import { create } from "zustand";

import {
  TicTacToePlayerSymbol,
  TicTacToeBoardType,
} from "../types/ticTacToeTypes";
import { getBestMove, getWinner, isDraw } from "../utils/ticTacToeUtils";

interface TicTacToeState {
  board: TicTacToeBoardType;
  currentPlayer: TicTacToePlayerSymbol | null;
  winner: TicTacToePlayerSymbol | null;
  isDraw: boolean;
}

interface TicTacToeFunctions {
  passTurn: () => void;
  resetStore: () => void;
  setCurrentPlayer: (player: TicTacToePlayerSymbol) => void;
}

export interface TicTacToeStore extends TicTacToeState, TicTacToeFunctions {}

const defaultState: TicTacToeState = {
  board: Array(9).fill(null),
  currentPlayer: null,
  winner: null,
  isDraw: false,
};

export const useTicTacToeStore = create<TicTacToeStore>((set, get) => ({
  ...defaultState,
  passTurn: () => {
    // Determine if the game has been won or drawn before passing the turn to the next player.
    const { board, currentPlayer } = get();
    const winner = getWinner(board);
    const draw = isDraw(board);
    const nextPlayer = currentPlayer === "X" ? "O" : "X";

    set({ winner, isDraw: draw });

    if (!winner && !draw) {
      set(() => {
        return { currentPlayer: nextPlayer };
      });

      const aiMove = getBestMove(board);
      set((state) => {
        const newBoard = [...state.board];
        newBoard[aiMove!] = nextPlayer;
        return { board: newBoard };
      });
    }
  },
  resetStore: () => set({ ...defaultState }),
  setCurrentPlayer: (player: TicTacToePlayerSymbol) =>
    set({ currentPlayer: player }),
}));
