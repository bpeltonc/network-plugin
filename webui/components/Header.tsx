import { Image } from "expo-image";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { BASE_PADDING } from "../theme";

export default function Header() {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Image
        source="./assets/react-logo.svg"
        style={{
          height: 100,
          width: 100,
        }}
      />
      <Text
        variant="headlineLarge"
        style={{ alignSelf: "center", paddingVertical: BASE_PADDING }}
      >
        Network Plugin
      </Text>
    </View>
  );
}
