const webpack = require('webpack');
const html = require('html-webpack-plugin');
const producao = process.env.NODE_ENV == 'production';

const config = {
    entry: './componente/index.jsx',
    output: {
        filename: 'pacote.min.js',
        path: `${ __dirname }/cordova/www`
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', { 'targets': { 'browsers': ['last 2 versions'] } }],
                        'react'
                    ],
                    plugins: ['transform-object-rest-spread'],
                    cacheDirectory: true,
                    sourceMaps: !producao
                },
                exclude: /node_modules/
            },
            {
                test: /\.p?css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]--[hash:base64:5]',
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: [
                                require('postcss-import')(),
                                require('precss')(),
                                require('postcss-color-function')(),
                                require('autoprefixer')(),
                                require('postcss-calc')()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|eot|woff2?|ttf|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: { name: 'assets/[ext]/[name].[ext]' }
                }]
            }
        ]
    },
    plugins: [
        new html({
            template: `./assets/html/${ producao ? 'producao' : 'desenvolvimento' }.html`,
            inject: false
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            Component: ['react', 'Component']
        })
    ]
};

// Produção ------------------------------------------------------------------------------------------------------------

if (producao) {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': { 'NODE_ENV': JSON.stringify('production') }
        })
    );
}

// Desenvolvimento -----------------------------------------------------------------------------------------------------

else {
    // config.devtool = 'cheap-module-eval-source-map';
    // config.devtool = 'eval';
    config.devtool = 'inline-source-map';
}

// ---------------------------------------------------------------------------------------------------------------------

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
module.exports = config;
