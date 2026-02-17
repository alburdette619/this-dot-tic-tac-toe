import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeOut } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { useTicTacToeStore } from "../../stores/ticTacToeStore";
import { cardStyles } from "../../styles/cards";
import { TicTacToeBoard } from "./components/TicTacToeBoard";

export const TicTacToe = () => {
  const { navigate } = useNavigation();

  const { board, currentPlayer, winner, isDraw, startGame } =
    useTicTacToeStore();
  const isFirstMove = board.every((cell) => cell === null);

  // We need to access the store state in the `maybeAiFirstMove` worklet, but worklets capture,
  // so we need to get the state in the component scope and then reference it in the worklet.
  // Creating a reference to `getState` here allows us to call `getState()` in the worklet
  // to get the latest state when the worklet runs.
  const getState = useTicTacToeStore.getState;

  const maybeMakeAiFirstMove = useCallback(() => {
    const { currentPlayer: currentPlayerInWorklet, makeAiMove } = getState();

    if (currentPlayerInWorklet === "O" && isFirstMove) {
      makeAiMove();
    }
  }, [getState, isFirstMove]);

  const handleFirstPlayerChoice = useCallback(
    (symbol: "X" | "O") => {
      startGame(symbol);
    },
    [startGame],
  );

  const handlePlayerChoiceFadeOut = useCallback(
    (finished: boolean) => {
      "worklet";
      if (finished) {
        scheduleOnRN(maybeMakeAiFirstMove);
      }
    },
    [maybeMakeAiFirstMove],
  );

  useEffect(() => {
    if (winner || isDraw) {
      navigate("GameResult");
    }
  }, [isDraw, navigate, winner]);

  return (
    <View style={styles.container}>
      {currentPlayer === null ? (
        // Handle Ai first move AFTER the fade out animation completes to avoid
        // the first 'O' move appearing before the player choice fades out.
        <Animated.View
          exiting={FadeOut.withCallback(handlePlayerChoiceFadeOut)}
        >
          <Text style={styles.playerChoiceText}>Who Goes First?</Text>
          <View style={styles.playerChoiceContainer}>
            <Pressable
              style={[cardStyles.card, styles.playerChoicePressable]}
              onPress={() => handleFirstPlayerChoice("X")}
            >
              <Text style={styles.playerChoiceText}>X</Text>
              <Text style={styles.playerIdentityText}>(Me)</Text>
            </Pressable>
            <Pressable
              style={[cardStyles.card, styles.playerChoicePressable]}
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
    minWidth: "33%",
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
