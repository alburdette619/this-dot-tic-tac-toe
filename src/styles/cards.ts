import { StyleSheet } from "react-native";

import { Colors } from "./colors";

export const cardStyles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: Colors.sky,
    borderRadius: 12,
    elevation: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowOffset: { height: 8, width: 8 },
    shadowOpacity: 0.75,
    shadowRadius: 17,
  },
});
