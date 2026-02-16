export type RootStackParamList = {
  TicTacToe: undefined;
  GameResult: {
    result: "win" | "lose" | "draw";
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
