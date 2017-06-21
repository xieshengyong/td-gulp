
module.exports = {
    entry: {
        main: "./src/js/index.js",
    },
    output: {
        path: '.',
        filename: ''
    },
    module: {
        loaders: [
            {
                test: /js[\/|\\]lib[\/||\\][\w|\.|_|-]+js$/,
                loader: 'url-loader?importLoaders=1&limit=1000&name=/js/lib/[name].[ext]'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|dist|js[\/|\\]lib[\/||\\][\w|\.|_|-]+js$|fx_methods)/,
                loaders: ['babel-loader', 'eslint-loader']
            }
        ]
    },
    resolve: {
        alias: {
            'zepto': './lib/zepto.min.js'
        }
    },
    plugins: [
        
    ],
    externals: {
        '$':'window.$',
        'global' : 'window.global'
    }
};