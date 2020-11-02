const sassRegex = /\.(scss|sass)$/;

const getStyleLoaders = cssOptions => {
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          require('postcss-px-to-viewport')({
            viewportWidth: 375,
            viewportHeight: 667,
            unitPrecision: 3,
            viewportUnit: 'vw',
            selectorBlackList: ['.ignore', '.hairlines'],
            minPixelValue: 1,
            mediaQuery: false,
          }),
        ],
      },
    },
    {
      loader: 'sass-loader',
      options: {
        implementation: require('sass'),
      },
    },
  ];
  return loaders;
};

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      },
      // Optional
      {
        loader: require.resolve('react-docgen-typescript-loader'),
      },
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');

  config.module.rules.push({
    test: sassRegex,
    use: getStyleLoaders({
      importLoaders: 2,
    }),
  });
  config.resolve.extensions.push('.scss');

  return config;
};
