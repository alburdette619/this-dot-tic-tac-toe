import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { useCallback, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTicTacToeStore } from "../stores/ticTacToeStore";
import { cardStyles } from "../styles/cards";

export const GameResult = () => {
  const { goBack } = useNavigation();

  const { isDraw, resetStore, winner } = useTicTacToeStore();

  const { animation, resultText } = useMemo(() => {
    if (isDraw) {
      return {
        animation: require("../../assets/lottie/draw.json"),
        resultText: "It's a Draw!",
      };
    } else {
      return winner === "X"
        ? {
            animation: require("../../assets/lottie/you-win.json"),
            resultText:
              "You Win! (this should have been impossible... congrats I guess?)",
          }
        : {
            animation: require("../../assets/lottie/game-over.json"),
            resultText: "You Lose!",
          };
    }
  }, [isDraw, winner]);

  const handlePlayAgain = useCallback(() => {
    resetStore();
    goBack();
  }, [resetStore, goBack]);

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <LottieView
          source={animation}
          autoPlay
          loop={isDraw}
          style={styles.resultAnimation}
        />
        <Text style={styles.resultText}>{resultText}</Text>
      </View>
      <Pressable
        style={[cardStyles.card, styles.playAgainButton]}
        onPress={handlePlayAgain}
      >
        <Text style={styles.playAgainText}>Play Again!</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#735AFE",
    flex: 1,
    justifyContent: "space-between",
    padding: 24,
  },
  playAgainButton: {
    height: 100,
    justifyContent: "center",
    width: "100%",
  },
  playAgainText: {
    fontSize: 48,
  },
  resultAnimation: {
    height: 200,
    width: 200,
  },
  resultContainer: {
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
  },
  resultText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 24,
  },
});
