import { useState } from "react";
import { View } from "react-native";
import { Button, TextInput, Text, TextInputProps } from "react-native-paper";

import { BASE_PADDING, BASE_ELEMENT_WIDTH } from "../theme";

export enum InputSize {
  Small = 150,
  Medium = BASE_ELEMENT_WIDTH * 0.75,
  Large = BASE_ELEMENT_WIDTH,
}

export type TextInputWithButtonsProps = {
  title: string;
  description?: string;
  sampleText?: string;
  size: InputSize;
  onReset: () => void;
  onSave: (data: string) => void;
} & Partial<TextInputProps>;

export default function TextInputWithButtons(props: TextInputWithButtonsProps) {
  const { title, description, sampleText, onReset, onSave } = props;

  const [value, setValue] = useState("");

  return (
    <View
      style={{
        flex: 1,
        margin: BASE_PADDING,
        alignItems: "center",
        justifyContent: "center",
        width: BASE_ELEMENT_WIDTH,
        minHeight: 210,
      }}
    >
      <Text variant="titleLarge">{title}</Text>
      <Text
        variant="bodySmall"
        style={{ marginTop: BASE_PADDING / 4, textAlign: "center" }}
      >
        {description}
      </Text>
      <Text variant="labelSmall" style={{ marginBottom: BASE_PADDING / 4 }}>
        {sampleText}
      </Text>
      <TextInput
        mode="outlined"
        style={{ width: props.size }}
        {...props}
        onChangeText={setValue}
        value={value}
      />
      <View
        style={{
          flexDirection: "row",
          marginVertical: BASE_PADDING / 2,
          justifyContent: "space-evenly",
          alignSelf: "center",
          width: 200,
        }}
      >
        <Button
          mode="outlined"
          onPress={() => {
            setValue("");
            onReset();
          }}
        >
          Reset
        </Button>
        <Button mode="contained" onPress={() => onSave(value)}>
          Save
        </Button>
      </View>
      {/* <Divider style={{ width: BASE_ELEMENT_WIDTH }} /> */}
    </View>
  );
}
