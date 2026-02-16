import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { GameResult } from "../screens/GameResult";
import { TicTacToe } from "../screens/TicTacToe";
import { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="TicTacToe"
    >
      <Stack.Screen name="TicTacToe" component={TicTacToe} />
      <Stack.Screen name="GameResult" component={GameResult} />
    </Stack.Navigator>
  );
};
