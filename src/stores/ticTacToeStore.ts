import { create } from "zustand";

import {
  TicTacToePlayerSymbol,
  TicTacToeBoardType,
} from "../types/ticTacToeTypes";

export interface TicTacToeState {
  board: TicTacToeBoardType;
  currentPlayer: TicTacToePlayerSymbol | null;
  winner: TicTacToePlayerSymbol | null;
  isDraw: boolean;
  passTurn: () => void;
  resetStore: () => void;
  setCurrentPlayer: (player: TicTacToePlayerSymbol) => void;
}

const defaultState: Omit<TicTacToeState, "resetStore" | "setCurrentPlayer"> = {
  board: Array(9).fill(null),
  currentPlayer: null,
  winner: null,
  isDraw: false,
};

export const useTicTacToeStore = create<TicTacToeState>((set) => ({
  ...defaultState,
  passTurn: () =>
    set((state) => {
      const nextPlayer = state.currentPlayer === "X" ? "O" : "X";
      return { currentPlayer: nextPlayer };
    }),
  resetStore: () => set({ ...defaultState }),
  setCurrentPlayer: (player: TicTacToePlayerSymbol) =>
    set({ currentPlayer: player }),
}));
