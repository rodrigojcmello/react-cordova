const webpack = require('webpack');
const html = require('html-webpack-plugin');
const producao = process.env.NODE_ENV == 'production';

const config = {
    entry: './componente/index.jsx',
    output: {
        filename: 'pacote.min.js',
        path: `${ __dirname }/cordova/www`
    },
    resolve: {
        extensions: ['.js', '.jsx'],
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
    config.plugins.push(new UglifyJSPlugin());
}

// Desenvolvimento -----------------------------------------------------------------------------------------------------

else {
    config.devtool = 'cheap-module-eval-source-map';
}

// ---------------------------------------------------------------------------------------------------------------------

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
module.exports = config;
