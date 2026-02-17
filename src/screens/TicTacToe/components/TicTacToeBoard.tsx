import { useCallback, useMemo } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { useTicTacToeStore } from "../../../stores/ticTacToeStore";
import { TicTacToeCellType } from "../../../types/ticTacToeTypes";
import { TicTacToeBoardLine } from "./TicTacToeBoardLine";
import { TicTacToeWinningStrike } from "./TicTacToeWinningLine";

const lineDelay = 80;
const baseThickness = 4;

export const TicTacToeBoard = () => {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const { board, currentPlayer, passTurn, winner, winningLine } =
    useTicTacToeStore();

  const { boardSize, cellSize, h1, h2, t, v1, v2 } = useMemo(() => {
    const boardSize = Math.min(screenWidth, screenHeight) * 0.9;
    const t = Math.max(baseThickness, Math.round(boardSize / 180));
    const cellSize = boardSize / 3;

    const v1 = cellSize - t / 2;
    const v2 = cellSize * 2 - t / 2;
    const h1 = cellSize - t / 2;
    const h2 = cellSize * 2 - t / 2;

    return { boardSize, cellSize, h1, h2, t, v1, v2 };
  }, [screenWidth, screenHeight]);

  const handleCellPress = useCallback(
    (index: number) => {
      board[index] = currentPlayer;

      passTurn();
    },
    [board, currentPlayer, passTurn],
  );

  const renderCell = useCallback(
    ({ index, item }: ListRenderItemInfo<TicTacToeCellType>) => {
      return (
        <Pressable
          disabled={currentPlayer !== "X" || item !== null}
          onPress={() => handleCellPress(index)}
          style={[
            styles.cell,
            {
              height: cellSize,
              width: cellSize,
            },
          ]}
        >
          <Text style={styles.cellText}>{item ?? ""}</Text>
        </Pressable>
      );
    },
    [cellSize, currentPlayer, handleCellPress],
  );

  return (
    <View style={{ height: boardSize, width: boardSize }}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <TicTacToeBoardLine
          boardSize={boardSize}
          positionStart={v1}
          thickness={t}
        />
        <TicTacToeBoardLine
          boardSize={boardSize}
          delay={lineDelay}
          positionStart={v2}
          thickness={t}
        />
        <TicTacToeBoardLine
          boardSize={boardSize}
          delay={lineDelay * 2}
          positionStart={h1}
          thickness={t}
          type="horizontal"
        />
        <TicTacToeBoardLine
          boardSize={boardSize}
          delay={lineDelay * 3}
          positionStart={h2}
          thickness={t}
          type="horizontal"
        />
      </View>
      <FlatList
        data={board}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        renderItem={renderCell}
        scrollEnabled={false}
        style={{ position: "absolute" }}
      />
      {winner && winningLine && (
        <TicTacToeWinningStrike boardSize={boardSize} thickness={t} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    fontSize: 72,
    fontWeight: "bold",
  },
});
