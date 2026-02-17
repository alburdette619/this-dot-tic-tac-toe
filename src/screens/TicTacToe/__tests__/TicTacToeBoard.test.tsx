import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { useTicTacToeStore } from "../../../stores/ticTacToeStore";
import { TicTacToeCellType, WinningLine } from "../../../types/ticTacToeTypes";
import { TicTacToeBoard } from "../components/TicTacToeBoard";
import { TicTacToeBoardLine } from "../components/TicTacToeBoardLine";
import { TicTacToeWinningStrike } from "../components/TicTacToeWinningLine";

jest.mock("../../../stores/ticTacToeStore", () => ({
  __esModule: true,
  useTicTacToeStore: jest.fn(),
}));

// Mock child components so we can assert calls/props without Reanimated concerns
jest.mock("../components/TicTacToeBoardLine", () => ({
  __esModule: true,
  TicTacToeBoardLine: jest.fn(() => null),
}));
jest.mock("../components/TicTacToeWinningLine", () => ({
  __esModule: true,
  TicTacToeWinningStrike: jest.fn(() => null),
}));

const useTicTacToeStoreMock = jest.mocked(useTicTacToeStore);
const TicTacToeBoardLineMock = jest.mocked(TicTacToeBoardLine as any);
const TicTacToeWinningStrikeMock = jest.mocked(TicTacToeWinningStrike as any);

describe("TicTacToeBoard", () => {
  const passTurn = jest.fn();

  const makeBoard = (overrides?: Partial<ReturnType<typeof defaultStore>>) => ({
    ...defaultStore(),
    ...overrides,
  });

  const defaultStore = () => ({
    board: Array(9).fill(null) as TicTacToeCellType[],
    currentPlayer: "X" as TicTacToeCellType,
    passTurn,
    winner: null as TicTacToeCellType,
    winningLine: undefined as undefined | WinningLine,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    useTicTacToeStoreMock.mockReturnValue(defaultStore() as any);
  });

  it("renders 4 board divider lines with expected props (vertical/vertical/horizontal/horizontal)", () => {
    render(<TicTacToeBoard />);

    expect(TicTacToeBoardLineMock).toHaveBeenCalledTimes(4);

    const calls = (TicTacToeBoardLineMock as jest.Mock).mock.calls.map(
      (c) => c[0],
    );

    // 1) vertical line, no delay prop passed
    expect(calls[0]).toMatchObject({
      boardSize: expect.any(Number),
      positionStart: expect.any(Number),
      thickness: expect.any(Number),
    });

    // 2) vertical line with delay 80
    expect(calls[1]).toMatchObject({
      boardSize: expect.any(Number),
      delay: 80,
      positionStart: expect.any(Number),
      thickness: expect.any(Number),
    });

    // 3) horizontal line with delay 160
    expect(calls[2]).toMatchObject({
      boardSize: expect.any(Number),
      delay: 160,
      positionStart: expect.any(Number),
      thickness: expect.any(Number),
      type: "horizontal",
    });

    // 4) horizontal line with delay 240
    expect(calls[3]).toMatchObject({
      boardSize: expect.any(Number),
      delay: 240,
      positionStart: expect.any(Number),
      thickness: expect.any(Number),
      type: "horizontal",
    });
  });

  it("renders 9 pressable cells sized to board / 3", () => {
    const { getAllByTestId } = render(<TicTacToeBoard />);

    const cells = getAllByTestId(/tic-tac-toe-cell-/);
    expect(cells).toHaveLength(9);
  });

  it("when it's X's turn and a cell is empty, pressing sets the board index and calls passTurn", () => {
    const board = Array(9).fill(null) as TicTacToeCellType[];

    useTicTacToeStoreMock.mockReturnValue(
      makeBoard({ board, currentPlayer: "X" }) as any,
    );

    const { getAllByTestId } = render(<TicTacToeBoard />);
    const cells = getAllByTestId(/tic-tac-toe-cell-/);

    expect(board[0]).toBeNull();

    fireEvent.press(cells[0]);

    // component mutates board directly and then calls passTurn
    expect(board[0]).toBe("X");
    expect(passTurn).toHaveBeenCalledTimes(1);
  });

  it("disables cells when it's not X's turn", () => {
    const board = Array(9).fill(null) as TicTacToeCellType[];
    useTicTacToeStoreMock.mockReturnValue(
      makeBoard({ board, currentPlayer: "O" }) as any,
    );

    const { getAllByTestId } = render(<TicTacToeBoard />);
    const cells = getAllByTestId(/tic-tac-toe-cell-/);

    expect(cells[0].props.accessibilityState.disabled).toBe(true);
  });

  it("disables a filled cell even when it's X's turn", () => {
    const board = Array(9).fill(null) as TicTacToeCellType[];
    board[0] = "X";

    useTicTacToeStoreMock.mockReturnValue(
      makeBoard({ board, currentPlayer: "X" }) as any,
    );

    const { getAllByTestId, getByText } = render(<TicTacToeBoard />);

    // sanity: text is rendered for filled cell
    expect(getByText("X")).toBeTruthy();

    const cells = getAllByTestId(/tic-tac-toe-cell-/);
    expect(cells[0].props.accessibilityState.disabled).toBe(true);
  });

  it("renders the winning strike only when winner AND winningLine exist", () => {
    const board = Array(9).fill(null) as TicTacToeCellType[];
    const winningLine = [0, 1, 2] as WinningLine;

    useTicTacToeStoreMock.mockReturnValue(
      makeBoard({ board, winner: "X", winningLine }) as any,
    );

    render(<TicTacToeBoard />);

    expect(TicTacToeWinningStrikeMock).toHaveBeenCalledTimes(1);
  });

  it("does NOT render winning strike if winner is missing or winningLine is missing", () => {
    // winner missing
    useTicTacToeStoreMock.mockReturnValue(
      makeBoard({ winner: null, winningLine: [0, 1, 2] }) as any,
    );
    render(<TicTacToeBoard />);
    expect(TicTacToeWinningStrikeMock).not.toHaveBeenCalled();

    jest.clearAllMocks();

    // winningLine missing
    useTicTacToeStoreMock.mockReturnValue(
      makeBoard({ winner: "X", winningLine: undefined }) as any,
    );
    render(<TicTacToeBoard />);
    expect(TicTacToeWinningStrikeMock).not.toHaveBeenCalled();
  });
});
