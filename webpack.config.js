const webpack = require('webpack');
const html = require('html-webpack-plugin');
const producao = process.env.NODE_ENV == 'production';

const config = {
    mode: producao ? 'production' : 'development',
    entry: './componente/index.jsx',
    output: {
        filename: 'pacote.min.js',
        path: `${ __dirname }/cordova/www`
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        mainFields: ['browser', 'main', 'module']
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
                test: /\.scss$/,
                use: [
                    'style-loader', {
                        loader: 'css-loader',
                        options: { sourceMap: !producao }
                    }, {
                        loader: 'sass-loader',
                        options: { sourceMap: !producao }
                    }
                ]
            },
            {
                test: /\.p?css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: 'inline',
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
            Component: ['react', 'Component'],
            _: 'lodash',
            store: 'store'
        })
    ]
};

// Produção ------------------------------------------------------------------------------------------------------------

if (producao) {

    // Persiste a variável de ambiente em produção
    // config.plugins.push(
    //     new webpack.DefinePlugin({
    //         'process.env': { 'NODE_ENV': JSON.stringify('production') }
    //     })
    // );

    // Remove os logs
    config.plugins.push(['transform-remove-console']);

}

// Desenvolvimento -----------------------------------------------------------------------------------------------------

else {

    // Persiste a variável de ambiente em desenvolvimento
    // config.plugins.push(
    //     new webpack.DefinePlugin({
    //         'process.env': { 'NODE_ENV': JSON.stringify('development') }
    //     })
    // );

    // Mapeia o código para o navegador
    config.devtool = 'inline-source-map';

}

// ---------------------------------------------------------------------------------------------------------------------

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
module.exports = config;
