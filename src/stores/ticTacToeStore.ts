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
  setCurrentPlayer: (player: TicTacToePlayerSymbol) => void;
}

export const useTicTacToeStore = create<TicTacToeState>((set) => ({
  board: Array(9).fill(null),
  currentPlayer: null,
  winner: null,
  isDraw: false,
  setCurrentPlayer: (player: TicTacToePlayerSymbol) =>
    set({ currentPlayer: player }),
}));
