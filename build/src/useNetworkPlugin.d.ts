import { ResponseHeaders } from "../common/types";
export declare function useNetworkPlugin(): {
    interceptUrl: string;
    setInterceptUrl: import("react").Dispatch<import("react").SetStateAction<string>>;
    statusCode: number;
    setStatusCode: import("react").Dispatch<import("react").SetStateAction<number>>;
    responseBody: string;
    setResponseBody: import("react").Dispatch<import("react").SetStateAction<string>>;
    responseHeaders: ResponseHeaders[];
    setResponseHeaders: import("react").Dispatch<import("react").SetStateAction<ResponseHeaders[]>>;
    responseDelay: number;
    setResponseDelay: import("react").Dispatch<import("react").SetStateAction<number>>;
} | undefined;
//# sourceMappingURL=useNetworkPlugin.d.ts.map