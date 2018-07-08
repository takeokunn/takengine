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
            // for game
            game: path.resolve(__dirname, 'src/game'),
            entities: path.resolve(__dirname, 'src/entities'),
            // for engine
            engine_core: path.resolve(__dirname, 'src/engine/core'),
            engine_systems: path.resolve(__dirname, 'src/engine/systems'),
            engine_components: path.resolve(__dirname, 'src/engine/components'),
            engine_utils: path.resolve(__dirname, 'src/engine/utils'),
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
