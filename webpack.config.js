const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }]
    },
    resolve: {
        alias: {
            entities: path.resolve(__dirname, 'src/entities'),
            engine: path.resolve(__dirname, 'src/engine'),
            engine_systems: path.resolve(__dirname, 'src/engine/systems'),
            engine_components: path.resolve(__dirname, 'src/engine/components'),
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    serve: {
        content: [path.resolve(__dirname, 'public')]
    }
};
