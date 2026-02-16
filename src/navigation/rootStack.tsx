import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { GameResult } from "./screens/GameResult";
import { TicTacToe } from "./screens/TicTacToe";

const Stack = createNativeStackNavigator();

export const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TicTacToe" component={TicTacToe} />
      <Stack.Screen name="GameResult" component={GameResult} />
    </Stack.Navigator>
  );
};
