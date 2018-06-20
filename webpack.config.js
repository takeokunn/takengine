const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/core.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    serve: {
        content: [path.resolve(__dirname, 'public')]
    }
};
