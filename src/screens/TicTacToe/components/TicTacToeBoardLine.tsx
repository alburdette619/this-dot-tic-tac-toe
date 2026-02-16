import { StyleSheet } from "react-native";
import Animated, { StretchInY, StretchInX } from "react-native-reanimated";

export type LineType = "horizontal" | "vertical";

interface TicTacToeBoardLineProps {
  boardSize: number;
  delay?: number;
  positionStart: number;
  thickness: number;
  type?: LineType;
}

export const TicTacToeBoardLine = ({
  boardSize,
  delay = 0,
  positionStart,
  thickness,
  type = "vertical",
}: TicTacToeBoardLineProps) => {
  return (
    <Animated.View
      entering={(type === "vertical"
        ? StretchInY.duration(500)
        : StretchInX.duration(500)
      ).delay(delay)}
      style={[
        styles.boardLines,
        type === "vertical" ? styles.verticalLine : styles.horizontalLine,
        type === "vertical"
          ? {
              height: boardSize,
              left: positionStart,
              width: thickness,
            }
          : {
              height: thickness,
              top: positionStart,
              width: boardSize,
            },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  boardLines: {
    backgroundColor: "black",
    position: "absolute",
  },
  horizontalLine: {
    left: 0,
    transformOrigin: "left",
  },
  verticalLine: {
    top: 0,
    transformOrigin: "top",
  },
});
