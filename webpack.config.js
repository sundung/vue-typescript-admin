
const path = require('path');

// 自动引入 html 文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 自动清理 dist 目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 压缩 css 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 压缩js文件   注意:uglifyjs-webpack-plugin 不支持压缩 ES6 语法的代码
const TerserWebpackPlugin = require('terser-webpack-plugin');

// 识别 vue 
const { VueLoaderPlugin } = require('vue-loader/dist/index');

// 打包友好提示
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');

// 分析打包文件大小
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  // 当前环境
  mode: 'development',
  // 入口
  entry: './src/index.js',
  // 出口
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  // loader
  module: {
    rules: [
      // js文件
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      // css 
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      // less
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      // 图片格式
      {
        test: /\.(jpg|png|jpeg|gif|bmp)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            fallback: {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          }
        }
      },
      // 视频格式
      {
        test: /\.(mp4|ogg|mp3|wav)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            fallback: {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          }
        }
      },
      // typescript
      {
        test: /\.ts$/,
        use: [
          'ts-loader'
        ]
      },
      // vue
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      }
    ]
  },
  // 插件选项
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      title: 'Vue3 + TS -> Web App',
      minify: {
        collapseWhitespace: true, // 去掉空格
        removeComments: true // 去掉注释
      }
    }),
    // 指定清理 dist 目录
    new CleanWebpackPlugin(),
    // 压缩 css
    new OptimizeCssAssetsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    // vue
    new VueLoaderPlugin(),
    // 打包友好提示
    new FriendlyErrorsWebpackPlugin({
      onErrors: (severity, errors) => {
        notifier.notify({
          title: 'webpack 编译失败了~',
          message: `${severity} ${errors[0].name}`,
          subtitle: errors[0].file || ''
        });
      },
    }),
    // 分析打包文件大小
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true
    }),
  ],

  // 服务器配置
  // ...
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    contentBase: '../dist'
  },

  // 压缩js文件的配置选项
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin()
    ]
  }

}