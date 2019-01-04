const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
    // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    storybookBaseConfig.module.rules.push({
        test: /\.(sass|scss)$/,
        loaders: ['style-loader', 'sass-loader', 'css-loader'],
        include: path.resolve(__dirname, '../')
    });
    storybookBaseConfig.module.rules.push({
        test: /\.(png|jpg|gif|svg)$/,
        loaders: ['url-loader'],
        include: path.resolve(__dirname, '../')
    });

    // Return the altered config
    return storybookBaseConfig;
};
