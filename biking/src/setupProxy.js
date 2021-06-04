const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/Graph', {
            target: 'http://balance.elbpdpdp.tk:3001/'
        })
    );
    app.use(
        createProxyMiddleware('/Data', {
            target: 'http://balance.elbpdpdp.tk:3001/'
        })
    );
};
