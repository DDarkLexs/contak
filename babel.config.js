module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    ['@babel/preset-env', {targets: {node: 'current'}}],
  ],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true, // I tried this with true as well -> no luck either
      },
    ],
  ],
};
