import { useNavigation } from "@react-navigation/native";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { GameResult } from "..";
import { useTicTacToeStore } from "../../../stores/ticTacToeStore";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));

jest.mock("lottie-react-native", () => "LottieView");

jest.mock("../../../stores/ticTacToeStore", () => ({
  __esModule: true,
  useTicTacToeStore: jest.fn(),
}));

const mockResetStore = jest.fn();
const mockGoBack = jest.fn();

const useTicTacToeStoreMock = jest.mocked(useTicTacToeStore);
const useNavigationMock = jest.mocked(useNavigation);

describe("GameResult", () => {
  beforeEach(() => {
    useNavigationMock.mockReturnValue({ goBack: mockGoBack });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders draw result correctly", () => {
    useTicTacToeStoreMock.mockReturnValue({
      isDraw: true,
      resetStore: mockResetStore,
      winner: null,
    });

    const { getByText } = render(<GameResult />);
    expect(getByText("It's a Draw!")).toBeTruthy();
    expect(getByText("Play Again!")).toBeTruthy();
  });

  it("renders win result correctly", () => {
    useTicTacToeStoreMock.mockReturnValue({
      isDraw: false,
      resetStore: mockResetStore,
      winner: "X",
    });

    const { getByText } = render(<GameResult />);
    expect(getByText(/You Win!/)).toBeTruthy();
  });

  it("renders lose result correctly", () => {
    useTicTacToeStoreMock.mockReturnValue({
      isDraw: false,
      resetStore: mockResetStore,
      winner: "O",
    });

    const { getByText } = render(<GameResult />);
    expect(getByText("You Lose!")).toBeTruthy();
  });

  it("calls resetStore and goBack when Play Again is pressed", () => {
    useTicTacToeStoreMock.mockReturnValue({
      isDraw: true,
      resetStore: mockResetStore,
      winner: null,
    });

    const { getByText } = render(<GameResult />);
    fireEvent.press(getByText("Play Again!"));
    expect(mockResetStore).toHaveBeenCalled();
    expect(mockGoBack).toHaveBeenCalled();
  });
});
