const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const modeConfig = env => require(`./build-utils/webpack.${env.mode}.js`)(env);
const loadPresets = require('./build-utils/loadPresets');

module.exports = ({ mode, presets }) => {
  return webpackMerge(
    {
      mode,
      plugins: [
        //new CleanWebpackPlugin(['dist']),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin(
          { filename: 'index.html', template: './src/index.html' }
        ),
        new CopyWebpackPlugin([
            { from: "./src/manifest.webmanifest", to: "manifest.webmanifest" },
            { from: './src/img', to: 'img/' },
            { from: './src/js',  to: 'js/'  },
            { from: './src/css', to: 'css/' },
            { from: './src/data', to: 'data/' },
            { from: './src/qafco', to: 'qafco/' },
            { from: './src/pages', to: 'pages/' }, 
            'src/manifest.webmanifest'],
          { ignore: ['.DS_Store'] }
        )
      ]
    },
    modeConfig({ mode }),
    loadPresets({ mode, presets })
  );
};
