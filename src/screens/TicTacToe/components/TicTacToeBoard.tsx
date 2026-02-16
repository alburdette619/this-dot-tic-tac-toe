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

const lineDelay = 80;
const baseThickness = 4;

export const TicTacToeBoard = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const { board } = useTicTacToeStore();

  const { boardSize, cellSize, t, v1, v2, h1, h2 } = useMemo(() => {
    const boardSize = Math.min(screenWidth, screenHeight) * 0.9;
    const t = Math.max(baseThickness, Math.round(boardSize / 180));
    const cellSize = boardSize / 3;

    const v1 = cellSize - t / 2;
    const v2 = cellSize * 2 - t / 2;
    const h1 = cellSize - t / 2;
    const h2 = cellSize * 2 - t / 2;

    return { boardSize, cellSize, t, v1, v2, h1, h2 };
  }, [screenWidth, screenHeight]);

  const handleCellPress = useCallback((index: number) => {
    console.log(`Cell ${index} pressed`);
  }, []);

  const renderCell = useCallback(
    ({ item, index }: ListRenderItemInfo<TicTacToeCellType>) => {
      return (
        <Pressable
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
    [cellSize, handleCellPress],
  );

  return (
    <View style={{ width: boardSize, height: boardSize }}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <TicTacToeBoardLine
          boardSize={boardSize}
          positionStart={v1}
          thickness={t}
        />
        <TicTacToeBoardLine
          delay={lineDelay}
          boardSize={boardSize}
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
        style={{ position: "absolute" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    fontSize: 48,
  },
});
