export let useNetworkPlugin;
// @ts-ignore process.env.NODE_ENV is defined by metro transform plugins
if (process.env.NODE_ENV !== 'production') {
    useNetworkPlugin = require('./useNetworkPlugin').useNetworkPlugin;
}
else {
    useNetworkPlugin = () => { };
}
//# sourceMappingURL=index.js.map