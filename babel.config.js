module.exports = {
  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
        targets: {
          browsers: ['> 1%', 'last 5 versions', 'firefox >= 39', 'ie >= 11', 'chrome >= 37', 'safari >= 9', 'edge >= 14']
        }
      }
    ],
    '@babel/preset-react',
    '@babel/typescript',
  ],
  comments: false,
  env: {
    production: {
      presets: [['@babel/preset-env', { modules: 'commonjs' }], 'minify'],
      plugins: ['babel-plugin-transform-react-remove-prop-types']
    }
  }
};
