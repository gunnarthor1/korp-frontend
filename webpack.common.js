const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function getKorpConfigDir() {
    fs = require('fs')
    let config = "app";
    try {
        json = fs.readFileSync("run_config.json", {encoding: 'utf-8'});
        config = JSON.parse(json).configDir || "app";
        console.log("Using \"" + config + "\" as config directory.");
    } catch(err) {
        console.error(err);
        console.log("No run_config.json given, using \"app\" as config directory (default).");
    }
    return config;
}

const korpConfigDir = getKorpConfigDir();

module.exports = {
  resolve: {
    alias: {
      jquery: "jquery/src/jquery",
      jstorage: "jstorage/jstorage",
      jquerybqq: path.resolve(__dirname, "app/lib/jquery.ba-bbq"),
      jreject: path.resolve(__dirname, "app/lib/jquery.reject"),
      jquerylocalize: path.resolve(__dirname, "app/lib/jquery.localize"),
      img: path.resolve(__dirname, "app/img/"),
      configjs: path.resolve(korpConfigDir, 'config.js'),
      commonjs: path.resolve(korpConfigDir, 'modes/common.js'),
      defaultmode: path.resolve(korpConfigDir, 'modes/default_mode.js')
    }
  },
  module: {
    rules: [
      {
        test: require.resolve(path.resolve(__dirname, "app/lib/jquery.ba-bbq")),
        use: 'imports-loader?this=>window'
      },
      {
        test: require.resolve(path.resolve(__dirname, "app/scripts/cqp_parser/CQPParser.js")),
        use: 'imports-loader?this=>window'
      },
      {
        test: /\.coffee$/,
        use: [
          {
            loader: 'coffee-loader'
          }
        ]
      },
      {
        test: /\.pug$/i,
        exclude: [
          // does not work
          path.resolve(__dirname, "app/index.pug")
        ],
        use: [
          { loader: "file-loader" },
          {
            loader: "extract-loader",
            options: { publicPath: "" }
          },
          { loader: "html-loader" },
          { loader: "pug-html-loader" }
        ]
      },
      {
        test: /index.pug$/,
        use: [
          { loader: "file-loader?name=index.html" },
          {
            loader: "extract-loader",
            options: { publicPath: "" }
          },
          {
            loader: "html-loader",
            options: {
              attrs: ['img:src','link:href']
            }
          },
          {
            loader: "pug-html-loader"
          }
        ]
      },
      {
        test: /user_guide.pug$/,
        use: [
          { loader: "file-loader?name=user_guide.html" },
          {
            loader: "extract-loader",
            options: { publicPath: "" }
          },
          {
            loader: "html-loader",
            options: {
              attrs: ['img:src','link:href']
            }
          },
          {
            loader: "pug-html-loader"
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          { loader: "file-loader" },
          {
            loader: "extract-loader",
            options: { publicPath: "" }
          },
          { loader: "html-loader" }
        ]

      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.ico$/i,
        loader: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.otf$/i,
        loader: "file-loader"
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      {
        from: korpConfigDir + '/modes/*mode.js',
        to: 'modes',
        flatten: true
      },
      {
        from: korpConfigDir + '/modes/*html',
        to: 'modes',
        flatten: true
      },
      {
        from: 'app/translations/angular-locale_*.js',
        to: 'translations',
        flatten: true
      },
      {
        from: 'app/translations/locale-*.json',
        to: 'translations',
        flatten: true
      },
      {
        from: korpConfigDir + '/translations/*',
        to: 'translations',
        flatten: true
      },
      {
        from: 'app/lib/deptrees/',
        to: 'lib/deptrees'
      },
      {
        from: 'node_modules/geokorp/dist/data/*.json',
        // TODO hard-coded in geokorp project that these files should be here
        // we need to change geokorp so that these files are required
        to: 'components/geokorp/dist/data',
        flatten: true
      }
    ])
  ],
  entry: {
    bundle: './app/index.js',
    worker: './app/scripts/statistics_worker.js',
    user_guide: './app/user_guide.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};
