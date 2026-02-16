import { create } from "zustand";

import {
  TicTacToePlayerSymbol,
  TicTacToeBoardType,
} from "../types/ticTacToeTypes";

export interface TicTacToeState {
  board: TicTacToeBoardType;
  currentPlayer: TicTacToePlayerSymbol;
  winner: TicTacToePlayerSymbol | null;
  isDraw: boolean;
}

export const useTicTacToeStore = create<TicTacToeState>((_set) => ({
  board: Array(9).fill(null),
  currentPlayer: "X",
  winner: null,
  isDraw: false,
}));
