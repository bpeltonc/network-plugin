import "@expo/metro-runtime";
import { useDevToolsPluginClient, type EventSubscription } from "expo/devtools";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { PaperProvider, MD3LightTheme, Divider } from "react-native-paper";

import { getPluginElements } from "./PluginElements";
import Header from "./components/Header";
import TextInputWithButtons, {
  TextInputWithButtonsProps,
} from "./components/TextInputWithButtons";
import { BASE_ELEMENT_WIDTH, theme as customTheme } from "./theme";

const theme = {
  ...MD3LightTheme,
  colors: customTheme.colors,
};

export default function App() {
  const client = useDevToolsPluginClient("network-plugin");

  useEffect(() => {
    const subscriptions: EventSubscription[] = [];

    subscriptions.push(
      client?.addMessageListener("ping", (data) => {
        alert(`Received ping from ${data.from}. Client connected: ${!!client}`);
        client?.sendMessage("ping", { from: "web" });
      }),
    );

    return () => {
      for (const subscription of subscriptions) {
        subscription?.remove();
      }
    };
  }, [client]);

  const Separator = () => (
    <Divider style={{ width: BASE_ELEMENT_WIDTH, alignSelf: "center" }} />
  );

  const renderElement = ({ item }: { item: TextInputWithButtonsProps }) => {
    return <TextInputWithButtons {...item} />;
  };

  return (
    <PaperProvider theme={theme}>
      <Header />
      <Divider />
      <FlatList
        contentContainerStyle={{
          maxWidth: BASE_ELEMENT_WIDTH * 3, // No more than 2 elements per row
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "center",
          flexWrap: "wrap",
          alignContent: "center",
        }}
        data={getPluginElements(client)}
        renderItem={(item) => renderElement(item)}
        ItemSeparatorComponent={Separator}
      />
    </PaperProvider>
  );
}
