import { useDevToolsPluginClient, type EventSubscription } from "expo/devtools";
import { useEffect, useState } from "react";

import {
  MessagePayloadWithFrom,
  MessageString,
  ResponseHeaders,
} from "../common/types";

export function useNetworkPlugin() {
  // TODO: bp - Make useDevToolsPluginClient take a generic type that can be used to get strong type-safety for all its methods
  const client = useDevToolsPluginClient("network-plugin");
  const [interceptUrl, setInterceptUrl] = useState("");
  const [statusCode, setStatusCode] = useState(0);
  const [responseBody, setResponseBody] = useState("");
  const [responseHeaders, setResponseHeaders] = useState<ResponseHeaders[]>([]);
  const [responseDelay, setResponseDelay] = useState(0);

  // Make it explicit that we don't have strong type-safety for addMessageListener
  const unsafe_addMessageListener = client?.addMessageListener;

  useEffect(() => {
    const subscriptions: EventSubscription[] = [];

    subscriptions.push(
      unsafe_addMessageListener?.(
        MessageString.PING,
        // TODO: bp - This isn't REALLY unsafe since we know the sender has type-safety for params at the call site
        (data: MessagePayloadWithFrom<MessageString.PING>) => {
          alert(`Received ping from ${data.from}`);
        },
      ),
      unsafe_addMessageListener?.(
        MessageString.SET_ENDPOINT,
        (data: MessagePayloadWithFrom<MessageString.SET_ENDPOINT>) => {
          setInterceptUrl(data.params.endpoint);
        },
      ),
      unsafe_addMessageListener?.(
        MessageString.SET_STATUS_CODE,
        (data: MessagePayloadWithFrom<MessageString.SET_STATUS_CODE>) => {
          setStatusCode(parseInt(data.params.statusCode, 10));
        },
      ),
      unsafe_addMessageListener?.(
        MessageString.SET_BODY,
        (data: MessagePayloadWithFrom<MessageString.SET_BODY>) => {
          setResponseBody(data.params.body);
        },
      ),
      unsafe_addMessageListener?.(
        MessageString.SET_HEADERS,
        (data: MessagePayloadWithFrom<MessageString.SET_HEADERS>) => {
          try {
            setResponseHeaders(JSON.parse(data.params.headers));
          } catch {
            setResponseHeaders([]);
            console.error("Failed to parse response headers");
          }
        },
      ),
      unsafe_addMessageListener?.(
        MessageString.SET_DELAY,
        (data: MessagePayloadWithFrom<MessageString.SET_DELAY>) => {
          setResponseDelay(parseInt(data.params.delay, 10));
        },
      ),
    );
    client?.sendMessage(MessageString.PING, { from: "app" });

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
