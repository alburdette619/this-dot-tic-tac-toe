export type TicTacToeBoardType = TicTacToeCellType[];

export type TicTacToeCellType = null | TicTacToePlayerSymbol;

export type TicTacToePlayerSymbol = "O" | "X";

export type WinningLine = [number, number, number];
