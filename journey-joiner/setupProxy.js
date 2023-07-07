const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/signup',
    createProxyMiddleware({
      target: 'http://localhost:8000', // Replace with the URL of your Django backend
      changeOrigin: true,
    })
  );
};
