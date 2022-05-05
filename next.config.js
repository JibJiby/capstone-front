// /** @type {import('next').NextConfig} */
// module.exports = {
//     reactStrictMode: true,
// }

// 참고 : https://kir93.tistory.com/entry/NextJS%EC%97%90%EC%84%9C-antd-less%ED%8C%8C%EC%9D%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EA%B8%B0
// bundle-analyzer 와 antd-less 같이 쓰기 : https://velog.io/@maliethy/next-plugin-antd-less-%EB%A1%9C-Antd-primary-color-%EB%B3%80%EA%B2%BD%ED%95%98%EA%B8%B0

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const withPlugins = require('next-compose-plugins')
const withAntdLess = require('next-plugin-antd-less')

// module.exports = withAntdLess({
//     webpack(config) {
//         return config
//     },
// })

const plugins = [[withBundleAnalyzer], [withAntdLess]]

const nextConfig = {
    compress: true,
    webpack(config, { webpack }) {
        const prod = process.env.NODE_ENV === 'production'
        return {
            ...config,
            mode: prod ? 'production' : 'development',
            devtool: prod ? 'hidden-source-map' : 'eval-source-map',
            plugins: [...config.plugins, new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/)],
        }
    },
}

module.exports = withPlugins(plugins, nextConfig)
