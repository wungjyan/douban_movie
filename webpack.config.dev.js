/**
 * 此配置指定了不同环境
 * 通过判断命令行参数，判断是否执行打包
 * 添加生产环境一些功能：抽取CSS到单文件，压缩js和css代码，开启sourceMap功能
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin') //提取css到单文件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') //压缩js代码

module.exports = env => {
  if (!env) {
    env = {}
  }

  //本地开发环境用到的插件
  let plugins = [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/views/index.html'
    })
  ]

  //执行打包时，添加提取CSS和开启sourceMap的插件
  if (env.production) {
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new ExtractTextPlugin('style.css'),
      new UglifyJsPlugin({
        sourceMap: true
      })
    )
  }
  return {
    entry: ['./src/js/hotcss.js', './src/js/main.js'],
    devtool: 'source-map', //开启sourceMap
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
      proxy: {
        '/api': {
          target: 'https://api.douban.com/v2',
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            cssModules: {
              localIdentName: '[path][name]---[local]---[hash:base64:5]',
              camelCase: true
            },
            //根据不同的环境，选择不同的预处理，生产环境时，提取CSS和压缩CSS
            loaders: env.production
              ? {
                  css: ExtractTextPlugin.extract({
                    use:
                      'css-loader?minimize!px2rem-loader?remUnit=40&remPrecision=8',
                    fallback: 'vue-style-loader'
                  }),
                  scss: ExtractTextPlugin.extract({
                    use:
                      'css-loader?minimize!px2rem-loader?remUnit=40&remPrecision=8!sass-loader',
                    fallback: 'vue-style-loader'
                  })
                }
              : {
                  css:
                    'vue-style-loader!css-loader!px2rem-loader?remUnit=40&remPrecision=8', // <style lang="css">
                  scss:
                    'vue-style-loader!css-loader!px2rem-loader?remUnit=40&remPrecision=8!sass-loader' // <style lang="scss">
                }
          }
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader'
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192
              }
            }
          ]
        }
      ]
    },
    plugins,
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
      }
    },
    output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'dist')
    }
  }
}
