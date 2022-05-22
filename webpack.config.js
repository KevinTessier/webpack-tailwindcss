const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports =  {
    mode: 'development',
    entry: {
      app: ['./src/assets/scripts/app.js', './src/assets/styles/app.scss'],
    },
    devtool: 'inline-source-map',
    output: {
      filename: 'assets/scripts/[name].js',
      path: path.resolve(__dirname, './dist'),
      clean: true,
      publicPath: './',
    },
    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.scss$/i,     
          use: [
              // Creates `style` nodes from JS strings
              MiniCssExtractPlugin.loader,  
              // Translates CSS into CommonJS
              {
                loader: 'css-loader',
                options: {
                  esModule: false,
                }              
              },
              // Compiles Sass to CSS
              "sass-loader",
              "postcss-loader",
          ],
          },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          loader: 'file-loader',
          options: {
            name: '[name].[contenthash].[ext]',
            outputPath: 'assets/images/',
            publicPath: '../images/',
          },  
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          loader: 'file-loader',
          options: {
            name: '[name].[contenthash].[ext]',
            outputPath: 'assets/fonts/',
            publicPath: '../fonts/',

          },  
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'assets/styles/[name].css',
      }),
    ],
};
