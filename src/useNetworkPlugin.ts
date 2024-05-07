import { useDevToolsPluginClient, type EventSubscription } from "expo/devtools";
import { useEffect, useState } from "react";

import { FaultInjectionSettings, MessageString } from "../common/types";

export function useNetworkPlugin() {
  // TODO: bp - Make useDevToolsPluginClient take a generic type that can be used to get strong type-safety for all its methods
  const client = useDevToolsPluginClient("network-plugin");

  // There are three states for each of these values:
  // - undefined: the value has not been set (the user has not interacted with the plugin)
  // - null: the value has been reset (the user has interacted with the plugin but reset the value)
  // - string or number: the value has been set (the user has interacted with the plugin and set the value)
  const [interceptUrl, setInterceptUrl] = useState<string | null>();
  const [statusCode, setStatusCode] = useState<number | null>();
  const [responseBody, setResponseBody] = useState<string | null>();
  const [responseHeaders, setResponseHeaders] = useState<string | null>();
  const [responseDelay, setResponseDelay] = useState<number | null>();

  const setSettings = (settings: FaultInjectionSettings) => {
    if (settings.interceptUrl) {
      setInterceptUrl(settings.interceptUrl);
    }
    if (settings.statusCode) {
      setStatusCode(settings.statusCode);
    }
    if (settings.responseBody) {
      setResponseBody(settings.responseBody);
    }
    if (settings.responseHeaders) {
      setResponseHeaders(settings.responseHeaders);
    }
    if (settings.responseDelay) {
      setResponseDelay(settings.responseDelay);
    }
    client?.sendMessage(MessageString.SET_SETTINGS, settings);
  };

  useEffect(() => {
    const subscriptions: EventSubscription[] = [];

    subscriptions.push(
      client?.addMessageListener?.(MessageString.SET_ENDPOINT, (data) => {
        setInterceptUrl(data.endpoint);
      }),
      client?.addMessageListener?.(MessageString.RESET_ENDPOINT, () => {
        setInterceptUrl(null);
      }),
      client?.addMessageListener?.(MessageString.SET_STATUS_CODE, (data) => {
        setStatusCode(parseInt(data.statusCode, 10));
      }),
      client?.addMessageListener?.(MessageString.RESET_STATUS_CODE, () => {
        setStatusCode(null);
      }),
      client?.addMessageListener?.(MessageString.SET_BODY, (data) => {
        setResponseBody(data.body);
      }),
      client?.addMessageListener?.(MessageString.RESET_BODY, () => {
        setResponseBody(null);
      }),
      client?.addMessageListener?.(MessageString.SET_HEADERS, (data) => {
        setResponseHeaders(data.headers);
      }),
      client?.addMessageListener?.(MessageString.RESET_HEADERS, () => {
        setResponseHeaders(null);
      }),
      client?.addMessageListener?.(MessageString.SET_DELAY, (data) => {
        setResponseDelay(parseInt(data.delay, 10));
      }),
      client?.addMessageListener?.(MessageString.RESET_DELAY, () => {
        setResponseDelay(null);
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
    statusCode,
    responseBody,
    responseHeaders,
    responseDelay,
    setSettings,
  };
}
