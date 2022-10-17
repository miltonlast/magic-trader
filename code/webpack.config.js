const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = (env, options) => {
  return {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "bundle.js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(s(a|c)ss)$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|jpg|gif)$/i,
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            publicPath: "./assets",
            postTransformPublicPath: (p) => `__webpack_public_path__ + ${p}`,
          },
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
      alias: {
        "@assets": path.resolve(__dirname, "src/assets/"),
        "@components": path.resolve(__dirname, "src/components/"),
        "@hooks": path.resolve(__dirname, "src/hooks/"),
        "@interfaces": path.resolve(__dirname, "src/interfaces/"),
      },
    },
    plugins: [
      new Dotenv({
        path: options.mode ? `./.env.${options.mode}` : "",
      }),
    ],
    devtool: "inline-source-map",
    devServer: {
      port: 8080,
      historyApiFallback: true,
      static: {
        directory: path.resolve(__dirname, "./src"),
      },
      open: {
        app: {
          name: "google-chrome",
        },
      },
    },
  };
};
