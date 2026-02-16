import { StyleSheet, View } from "react-native";

import { TicTacToeBoard } from "./components/TicTacToeBoard";

export const TicTacToe = () => {
  return (
    <View style={styles.container}>
      <TicTacToeBoard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#735AFE",
    flex: 1,
    justifyContent: "center",
  },
});
