import { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeOut } from "react-native-reanimated";

import { useTicTacToeStore } from "../../stores/ticTacToeStore";
import { TicTacToeBoard } from "./components/TicTacToeBoard";

export const TicTacToe = () => {
  const { currentPlayer, winner, isDraw, setCurrentPlayer } =
    useTicTacToeStore();

  const handleFirstPlayerChoice = useCallback(
    (symbol: "X" | "O") => {
      setCurrentPlayer(symbol);
    },
    [setCurrentPlayer],
  );

  return (
    <View style={styles.container}>
      {currentPlayer === null ? (
        <Animated.View exiting={FadeOut}>
          <Text style={styles.playerChoiceText}>Who Goes First?</Text>
          <View style={styles.playerChoiceContainer}>
            <Pressable
              style={styles.playerChoicePressable}
              onPress={() => handleFirstPlayerChoice("X")}
            >
              <Text style={styles.playerChoiceText}>X</Text>
              <Text style={styles.playerIdentityText}>(Me)</Text>
            </Pressable>
            <Pressable
              style={styles.playerChoicePressable}
              onPress={() => handleFirstPlayerChoice("O")}
            >
              <Text style={styles.playerChoiceText}>O</Text>
              <Text style={styles.playerIdentityText}>(CPU)</Text>
            </Pressable>
          </View>
        </Animated.View>
      ) : (
        <TicTacToeBoard />
      )}
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
  playerChoiceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 36,
  },
  playerChoicePressable: {
    alignItems: "center",
    backgroundColor: "#C5D5EA",
    borderRadius: 12,
    elevation: 8,
    minWidth: "33%",
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowOpacity: 0.75,
    shadowRadius: 17,
    shadowOffset: { width: 8, height: 8 },
  },
  playerChoiceText: {
    fontSize: 48,
    textAlign: "center",
  },
  playerIdentityText: {
    fontSize: 24,
    marginTop: 8,
  },
});
