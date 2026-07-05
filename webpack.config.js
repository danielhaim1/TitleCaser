const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");

const package = require("./package.json");

const distPath = path.resolve(__dirname, "dist");
const dictionaryProfiles = ["lite", "full"];
const terserOptions = {
  extractComments: false,
};

const banner =
  `/*!
 * ${package.name} - v${package.version} - ${new Date().toISOString().split("T")[0]}
 * ${package.repository.url}
 * Copyright (c) ${new Date().getFullYear()} ${package.author.name}, Licensed ${package.license}
 */`;

function createBannerPlugin() {
  return new webpack.BannerPlugin({
    banner,
    raw: true,
  });
}

function createDictionaryProfilePlugin(profile) {
  return new webpack.NormalModuleReplacementPlugin(
    /data[\\/]dictionary[\\/]index\.js$/,
    path.resolve(__dirname, `src/data/dictionary/profile-${profile}.js`)
  );
}

function createBabelRule({ targets, modules }) {
  return {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          [
            "@babel/preset-env",
            {
              targets,
              modules,
            },
          ],
        ],
      },
    },
  };
}

function createConfig({
  filename,
  target,
  babelTargets,
  babelModules,
  output = {},
  experiments,
  externals,
  profile,
}) {
  const plugins = [createBannerPlugin()];

  if (profile) {
    plugins.unshift(createDictionaryProfilePlugin(profile));
  }

  return {
    mode: "production",
    target,
    entry: "./index.js",
    output: {
      filename,
      path: distPath,
      ...output,
    },
    experiments,
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin(terserOptions)],
    },
    plugins,
    module: {
      rules: [
        createBabelRule({
          targets: babelTargets,
          modules: babelModules,
        }),
      ],
    },
    externals,
  };
}

function createAmdConfig(filename, profile) {
  return createConfig({
    filename,
    target: "web",
    babelTargets: {
		browsers: ["last 2 versions"]
    },
    babelModules: "amd",
    profile,
  });
}

function createCommonJsConfig(filename, profile) {
  return createConfig({
    filename,
    target: "node",
    babelTargets: {
      node: "8",
    },
    babelModules: "commonjs",
    output: {
      libraryTarget: "commonjs2",
    },
    externals: [nodeExternals()],
    profile,
  });
}

function createEsmConfig(filename, profile) {
  return createConfig({
    filename,
    target: "web",
    babelTargets: {
      esmodules: true,
    },
    babelModules: false,
    output: {
      library: {
        type: "module",
      },
    },
    experiments: {
      outputModule: true,
    },
    profile,
  });
}

const profileConfigs = dictionaryProfiles.flatMap((profile) => [
  createAmdConfig(`${profile}/titlecaser.amd.js`, profile),
  createCommonJsConfig(`${profile}/titlecaser.module.js`, profile),
  createEsmConfig(`${profile}/titlecaser.esm.js`, profile),
]);

module.exports = profileConfigs;
