// TODO: bp - DRY this up by creating a shared type file that the webui app can import
export var MessageString;
(function (MessageString) {
    MessageString["SET_ENDPOINT"] = "set-endpoint";
    MessageString["RESET_ENDPOINT"] = "reset-endpoint";
    MessageString["SET_STATUS_CODE"] = "set-status-code";
    MessageString["RESET_STATUS_CODE"] = "reset-status-code";
    MessageString["SET_BODY"] = "set-body";
    MessageString["RESET_BODY"] = "reset-body";
    MessageString["SET_HEADERS"] = "set-headers";
    MessageString["RESET_HEADERS"] = "reset-headers";
    MessageString["SET_DELAY"] = "set-delay";
    MessageString["RESET_DELAY"] = "reset-delay";
})(MessageString || (MessageString = {}));
//# sourceMappingURL=types.js.map