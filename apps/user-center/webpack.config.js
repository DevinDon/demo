const getConfig = require('@nrwl/react/plugins/webpack');

module.exports = (config) => {
  config = getConfig(config);
  config.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
        }
      }
    ]
  });
  return config;
}
