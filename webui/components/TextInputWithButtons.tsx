import { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Button,
  TextInput,
  Text,
  TextInputProps,
  HelperText,
} from "react-native-paper";
import { ZodError, ZodTypeAny } from "zod";

import { FaultInjectionSettings } from "../../common/types";
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
  validator?: ZodTypeAny;
  validationTransformer?: (data: string) => any;
  customErrorMessage?: string;
  key: keyof FaultInjectionSettings;
  initialValue?: string;
} & Partial<TextInputProps>;

export default function TextInputWithButtons(props: TextInputWithButtonsProps) {
  const {
    title,
    description,
    sampleText,
    onReset,
    onSave,
    validator,
    validationTransformer,
    customErrorMessage,
    initialValue,
  } = props;

  const [value, setValue] = useState<string>();
  const [error, setError] = useState<string>();

  const handleSave = () => {
    if (!value) {
      return;
    }
    let transformedValue = value;
    if (validator) {
      try {
        transformedValue = validationTransformer?.(value);
        validator.parse(transformedValue);
      } catch (error) {
        if (error instanceof ZodError) {
          if (error.issues[0].code === "invalid_type" && customErrorMessage) {
            setError(customErrorMessage);
          } else {
            setError(error.issues[0].message);
          }
        }
        return;
      }
    }
    onSave(transformedValue);
  };

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

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
        error={!!error}
        onSubmitEditing={handleSave}
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
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
        <Button mode="contained" onPress={handleSave}>
          Save
        </Button>
      </View>
    </View>
  );
}
