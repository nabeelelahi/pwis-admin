const path = require('path');

module.exports = {
  webpack: {
    alias: { 
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@services': path.resolve(__dirname, './src/services'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@routes': path.resolve(__dirname, './src/routes'),
      // '@config': path.resolve(__dirname, './src/config'),
    },
  },
};