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
  makeAiMove: () => void;
  passTurn: () => void;
  resetStore: () => void;
  startGame: (player: TicTacToePlayerSymbol) => void;
}

export interface TicTacToeStore extends TicTacToeState, TicTacToeFunctions {}

const getNewBoard = (): TicTacToeBoardType => Array(9).fill(null);

const defaultState: TicTacToeState = {
  board: getNewBoard(),
  currentPlayer: null,
  winner: null,
  isDraw: false,
};

export const useTicTacToeStore = create<TicTacToeStore>((set, get) => ({
  ...defaultState,
  makeAiMove: () => {
    const { board } = get();
    const aiMove = getBestMove(board);

    if (aiMove !== null) {
      set((state) => {
        const newBoard = [...state.board];
        newBoard[aiMove] = "O";
        return { board: newBoard };
      });

      get().passTurn();
    }
  },
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

      if (nextPlayer === "O") {
        get().makeAiMove();
      }
    }
  },
  // TODO: We shouldn't need the call to `getNewBoard`, but we're currently mutating the board directly
  // in the `TicTacToeBoard` component, so we need to ensure that we're resetting to a new array
  // reference here to trigger re-renders.
  resetStore: () => set({ ...defaultState, board: getNewBoard() }),
  startGame: (player: TicTacToePlayerSymbol) => set({ currentPlayer: player }),
}));
