import { useDevToolsPluginClient } from "expo/devtools";
import { useEffect, useState } from "react";
import { MessageString } from "../common/types";
export function useNetworkPlugin() {
    // TODO: bp - Make useDevToolsPluginClient take a generic type that can be used to get strong type-safety for all its methods
    const client = useDevToolsPluginClient("network-plugin");
    // There are three states for each of these values:
    // - undefined: the value has not been set (the user has not interacted with the plugin)
    // - null: the value has been reset (the user has interacted with the plugin but reset the value)
    // - string or number: the value has been set (the user has interacted with the plugin and set the value)
    const [interceptUrl, setInterceptUrl] = useState();
    const [statusCode, setStatusCode] = useState();
    const [responseBody, setResponseBody] = useState();
    const [responseHeaders, setResponseHeaders] = useState();
    const [responseDelay, setResponseDelay] = useState();
    const [isClientReady, setIsClientReady] = useState(false);
    const setSettings = (settings) => {
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
        client?.sendMessage(MessageString.SET_SETTINGS, {
            settings: JSON.stringify(settings),
            from: "app",
        });
    };
    // This is kind of a hack. The client remains unitialized for a short time when the app starts.
    // This way, we check that the client is indeed ready to send messages before we start sending them.
    useEffect(() => {
        if (!!client && !!client.sendMessage) {
            setIsClientReady(true);
        }
    }, [client]);
    useEffect(() => {
        const subscriptions = [];
        subscriptions.push(client?.addMessageListener?.(MessageString.SET_ENDPOINT, (data) => {
            setInterceptUrl(data.endpoint);
        }), client?.addMessageListener?.(MessageString.RESET_ENDPOINT, () => {
            setInterceptUrl(null);
        }), client?.addMessageListener?.(MessageString.SET_STATUS_CODE, (data) => {
            setStatusCode(parseInt(data.statusCode, 10));
        }), client?.addMessageListener?.(MessageString.RESET_STATUS_CODE, () => {
            setStatusCode(null);
        }), client?.addMessageListener?.(MessageString.SET_BODY, (data) => {
            setResponseBody(data.body);
        }), client?.addMessageListener?.(MessageString.RESET_BODY, () => {
            setResponseBody(null);
        }), client?.addMessageListener?.(MessageString.SET_HEADERS, (data) => {
            setResponseHeaders(data.headers);
        }), client?.addMessageListener?.(MessageString.RESET_HEADERS, () => {
            setResponseHeaders(null);
        }), client?.addMessageListener?.(MessageString.SET_DELAY, (data) => {
            setResponseDelay(parseInt(data.delay, 10));
        }), client?.addMessageListener?.(MessageString.RESET_DELAY, () => {
            setResponseDelay(null);
        }));
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
        isClientReady,
        interceptUrl,
        statusCode,
        responseBody,
        responseHeaders,
        responseDelay,
        setSettings,
    };
}
//# sourceMappingURL=useNetworkPlugin.js.map