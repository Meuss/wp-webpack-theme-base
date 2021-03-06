const pkg = require('./package.json');
const {
  getFileLoaderOptions,
  issuerForNonStyleFiles,
  issuerForStyleFiles,
  babelLoader,
  fileLoader,
} = require('@wpackio/scripts');

module.exports = {
  useBabelConfig: true,
  // Project Identity
  appName: 'wpWebpackThemeBase', // Unique name of your project
  type: 'theme', // Plugin or theme
  slug: 'wp-webpack-theme-base', // Plugin or Theme slug, basically the directory name under `wp-content/<themes|plugins>`
  // Used to generate banners on top of compiled stuff
  bannerConfig: {
    name: 'WP Webpack',
    author: 'Thomas Miller',
    license: 'ISC',
    link: 'ISC',
    version: pkg.version,
    copyrightText: 'This software is released under the ISC License\nhttps://opensource.org/licenses/ISC',
    credit: true,
  },
  // Files we need to compile, and where to put
  files: [
    // If this has length === 1, then single compiler
    {
      name: 'global',
      entry: {
        main: ['./js/global.js'], // Or an array of string (string[])
      },
      webpackConfig: (config, merge, appDir, isDev) => {
        const svgoLoader = {
          loader: 'svgo-loader',
          options: {
            plugins: [{ removeTitle: true }, { convertColors: { shorthex: false } }, { convertPathData: false }],
          },
        };
        const configWithSvg = {
          module: {
            rules: [
              // SVGO Loader
              // https://github.com/rpominov/svgo-loader
              // This rule handles SVG for javascript files
              {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: fileLoader,
                    options: getFileLoaderOptions(appDir, isDev, false),
                  },
                  svgoLoader,
                ],
                issuer: issuerForNonStyleFiles,
              },
              // This rule handles SVG for style files
              {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: fileLoader,
                    options: getFileLoaderOptions(appDir, isDev, true),
                  },
                  svgoLoader,
                ],
                issuer: issuerForStyleFiles,
              },
            ],
          },
        };
        // merge the new module.rules with webpack-merge api
        return merge(config, configWithSvg);
      },
    },
    {
      name: 'homepage',
      entry: {
        main: './js/homepage.js',
      },
    },
  ],
  // Output path relative to the context directory
  // We need relative path here, else, we can not map to publicPath
  outputPath: 'dist',
  // Project specific config
  // Needs react(jsx)?
  hasReact: false,
  // Needs sass?
  hasSass: true,
  // Needs less?
  hasLess: false,
  // Needs flowtype?
  hasFlow: false,
  // Externals
  // <https://webpack.js.org/configuration/externals/>
  externals: {
    // jquery: 'jQuery',
  },
  // Webpack Aliases
  // <https://webpack.js.org/configuration/resolve/#resolve-alias>
  alias: undefined,
  // Show overlay on development
  errorOverlay: true,
  // Auto optimization by webpack
  // Split all common chunks with default config
  // <https://webpack.js.org/plugins/split-chunks-plugin/#optimization-splitchunks>
  // Won't hurt because we use PHP to automate loading
  optimizeSplitChunks: true,
  // Usually PHP and other files to watch and reload when changed
  watch: './**/*.php',
  // Files that you want to copy to your ultimate theme/plugin package
  // Supports glob matching from minimatch
  // @link <https://github.com/isaacs/minimatch#usage>
  packageFiles: [
    'inc/**',
    'vendor/**',
    'dist/**',
    '*.php',
    '*.md',
    'readme.txt',
    'languages/**',
    'layouts/**',
    'LICENSE',
    '*.css',
  ],
  // Path to package directory, relative to the root
  packageDirPath: 'package',
};
