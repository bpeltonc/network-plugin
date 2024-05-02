export declare enum MessageString {
    PING = "ping",
    SET_ENDPOINT = "set-endpoint",
    RESET_ENDPOINT = "reset-endpoint",
    SET_STATUS_CODE = "set-status-code",
    RESET_STATUS_CODE = "reset-status-code",
    SET_BODY = "set-body",
    RESET_BODY = "reset-body",
    SET_HEADERS = "set-headers",
    RESET_HEADERS = "reset-headers",
    SET_DELAY = "set-delay",
    RESET_DELAY = "reset-delay"
}
export type MessagePayload<T extends MessageString> = {
    message: T;
    params: MessageParams[T];
};
export type MessageParams = {
    [MessageString.PING]: undefined;
    [MessageString.SET_ENDPOINT]: {
        endpoint: string;
    };
    [MessageString.RESET_ENDPOINT]: undefined;
    [MessageString.SET_STATUS_CODE]: {
        statusCode: string;
    };
    [MessageString.RESET_STATUS_CODE]: undefined;
    [MessageString.SET_BODY]: {
        body: string;
    };
    [MessageString.RESET_BODY]: undefined;
    [MessageString.SET_HEADERS]: {
        headers: string;
    };
    [MessageString.RESET_HEADERS]: undefined;
    [MessageString.SET_DELAY]: {
        delay: string;
    };
    [MessageString.RESET_DELAY]: undefined;
};
export type MessagePayloadWithFrom<T extends MessageString> = MessagePayload<T> & {
    from: "web" | "app";
};
export type ResponseHeaders = {
    [key: string]: string;
}[];
//# sourceMappingURL=types.d.ts.map