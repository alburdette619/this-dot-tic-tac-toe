import { useCallback, useEffect, useMemo } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { useTicTacToeStore } from "../../../stores/ticTacToeStore";
import { Colors } from "../../../styles/colors";
import { getStrike } from "../../../utils/ticTacToeUtils";

export interface TicTacToeWinningStrikeProps {
  boardSize: number;
  duration?: number;
  thickness: number;
}

export const TicTacToeWinningStrike = ({
  boardSize,
  duration = 250,
  thickness,
}: TicTacToeWinningStrikeProps) => {
  const { setGameFinished, winningLine } = useTicTacToeStore();

  const progress = useSharedValue(0);

  const handleFinishGame = useCallback(() => {
    setGameFinished(true);
  }, [setGameFinished]);

  const handleWinningLineAnimationCallback = useCallback(
    (finished?: boolean) => {
      "worklet";
      if (finished) {
        // Signal the game is finished after the winning line animation completes.
        scheduleOnRN(handleFinishGame);
      }
    },
    [handleFinishGame],
  );

  useEffect(() => {
    // Initialize progress if we have a line.
    progress.value = winningLine
      ? withTiming(
          1,
          { duration, easing: Easing.out(Easing.cubic) },
          handleWinningLineAnimationCallback,
        )
      : 0;
  }, [duration, handleWinningLineAnimationCallback, progress, winningLine]);

  const strike = useMemo(
    () => (winningLine ? getStrike(boardSize, winningLine) : null),
    [boardSize, winningLine],
  );

  const innerAnim = useAnimatedStyle(() => ({
    transform: [{ scaleX: progress.value }],
    transformOrigin: "left center",
  }));

  if (!strike) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.wrapperBase,
        {
          height: thickness,
          left: strike.cx - strike.length / 2,
          top: strike.cy - thickness / 2,
          transform: [{ rotateZ: strike.angle }],
          width: strike.length,
        },
      ]}
    >
      <Animated.View
        style={[styles.stroke, { height: thickness }, innerAnim]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  stroke: {
    backgroundColor: Colors.sky,
    width: "100%",
  },
  wrapperBase: {
    position: "absolute",
    transformOrigin: "center",
  },
});
