import { useDevToolsPluginClient } from "expo/devtools";
import { useEffect } from "react";
export function useNetworkPlugin() {
    const client = useDevToolsPluginClient("network-plugin");
    useEffect(() => {
        const subscriptions = [];
        subscriptions.push(client?.addMessageListener("ping", (data) => {
            alert(`Received ping from ${data.from}`);
        }));
        client?.sendMessage("ping", { from: "app" });
        return () => {
            for (const subscription of subscriptions) {
                subscription?.remove();
            }
        };
    }, [client]);
}
//# sourceMappingURL=useNetworkPlugin.js.map