import { useDevToolsPluginClient, type EventSubscription } from "expo/devtools";
import { useEffect, useState } from "react";

import { MessageString } from "../common/types";

export function useNetworkPlugin() {
  // TODO: bp - Make useDevToolsPluginClient take a generic type that can be used to get strong type-safety for all its methods
  const client = useDevToolsPluginClient("network-plugin");
  const [interceptUrl, setInterceptUrl] = useState("");
  const [statusCode, setStatusCode] = useState(0);
  const [responseBody, setResponseBody] = useState("");
  const [responseHeaders, setResponseHeaders] = useState("");
  const [responseDelay, setResponseDelay] = useState(0);

  useEffect(() => {
    const subscriptions: EventSubscription[] = [];

    subscriptions.push(
      client?.addMessageListener?.(MessageString.SET_ENDPOINT, (data) => {
        setInterceptUrl(data.endpoint);
      }),
      client?.addMessageListener?.(MessageString.RESET_ENDPOINT, () => {
        setInterceptUrl("");
      }),
      client?.addMessageListener?.(MessageString.SET_STATUS_CODE, (data) => {
        setStatusCode(parseInt(data.statusCode, 10));
      }),
      client?.addMessageListener?.(MessageString.RESET_STATUS_CODE, () => {
        setStatusCode(0);
      }),
      client?.addMessageListener?.(MessageString.SET_BODY, (data) => {
        setResponseBody(data.body);
      }),
      client?.addMessageListener?.(MessageString.RESET_BODY, () => {
        setResponseBody("");
      }),
      client?.addMessageListener?.(MessageString.SET_HEADERS, (data) => {
        setResponseHeaders(data.headers);
      }),
      client?.addMessageListener?.(MessageString.RESET_HEADERS, () => {
        setResponseHeaders("");
      }),
      client?.addMessageListener?.(MessageString.SET_DELAY, (data) => {
        setResponseDelay(parseInt(data.delay, 10));
      }),
      client?.addMessageListener?.(MessageString.RESET_DELAY, () => {
        setResponseDelay(0);
      }),
    );

    return () => {
      for (const subscription of subscriptions) {
        subscription?.remove();
      }
    };
  }, [client]);

  // @ts-ignore
  if (process.env.NODE_ENV === "production") {
    return;
  }

  return {
    interceptUrl,
    setInterceptUrl,
    statusCode,
    setStatusCode,
    responseBody,
    setResponseBody,
    responseHeaders,
    setResponseHeaders,
    responseDelay,
    setResponseDelay,
  };
}
