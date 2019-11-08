// Extending `build`

export default {
    extend(config, { isDev, isClient }) {
        if(isDev && isClient) {
            config.module.rules.push({
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /(node_modules)/
            })
        }
    },

    babel: {
        plugins: [
            ['@babel/plugin-proposal-export-namespace-from']
        ]
    }
}
