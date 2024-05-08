import { FaultInjectionSettings } from "../common/types";
export declare function useNetworkPlugin(): {
    isClientReady: boolean;
    interceptUrl: string | null | undefined;
    statusCode: number | null | undefined;
    responseBody: string | null | undefined;
    responseHeaders: string | null | undefined;
    responseDelay: number | null | undefined;
    setSettings: (settings: FaultInjectionSettings) => void;
} | undefined;
//# sourceMappingURL=useNetworkPlugin.d.ts.map