import {
  InputSize,
  TextInputWithButtonsProps,
} from "./components/TextInputWithButtons";
import { MessageParams, MessagePayload, MessageString } from "./types";

export const getPluginElements = (client: any): TextInputWithButtonsProps[] => {
  function sendMessage<T extends MessageString>(
    type: MessagePayload<T>["message"],
    data?: MessageParams[T],
  ) {
    client?.sendMessage(type, { ...data, from: "web" });
  }
  return [
    {
      title: "Endpoint Matcher",
      description:
        "Include all or part of the request URL to match for interception",
      sampleText: "E.g. https://foo.com/api/bar, /api/v2/baz, /[0-9]+/users",
      label: "Endpoint",
      placeholder: "Enter request regex or string to intercept",
      size: InputSize.Large,
      onReset: () => sendMessage(MessageString.RESET_ENDPOINT),
      onSave: (endpoint: string) =>
        sendMessage(MessageString.SET_ENDPOINT, { endpoint }),
    },
    {
      title: "Response Status Code",
      description: "Return a specific status code for the intercepted request",
      sampleText: "E.g. 200, 404, 500",
      label: "Status Code",
      placeholder: "503",
      size: InputSize.Small,
      onReset: () => sendMessage(MessageString.RESET_STATUS_CODE),
      onSave: (statusCode: string) =>
        sendMessage(MessageString.SET_STATUS_CODE, { statusCode }),
    },
    {
      title: "Response Body",
      description:
        "Return a specific response body for the intercepted request",
      sampleText: `E.g. {"message": "Hello, world!"}, <html>...</html>`,
      label: "Response Body",
      placeholder: "Enter response body",
      size: InputSize.Large,
      onReset: () => sendMessage(MessageString.RESET_BODY),
      onSave: (body: string) => sendMessage(MessageString.SET_BODY, { body }),
      multiline: true,
    },
    {
      title: "Response Headers",
      description:
        "Return specific response headers for the intercepted request",
      sampleText:
        "E.g. [Content-Type: application/json, X-Custom-Header: value]",
      label: "Response Headers",
      placeholder: "Enter response headers as array of key-value pairs",
      size: InputSize.Large,
      onReset: () => sendMessage(MessageString.RESET_HEADERS),
      onSave: (headers: string) =>
        sendMessage(MessageString.SET_HEADERS, { headers }),
      multiline: true,
    },
    {
      title: "Response Delay",
      description: "Delay the response by a specific number of milliseconds",
      sampleText: "E.g. 1000, 5000, 10000",
      label: "Delay",
      placeholder: "1000",
      size: InputSize.Small,
      onReset: () => sendMessage(MessageString.RESET_DELAY),
      onSave: (delay: string) =>
        sendMessage(MessageString.SET_DELAY, { delay }),
    },
  ];
};
