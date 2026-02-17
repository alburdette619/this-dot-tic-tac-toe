export type RootStackParamList = {
  TicTacToe: undefined;
  GameResult: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
