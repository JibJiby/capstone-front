// /** @type {import('next').NextConfig} */
// module.exports = {
//     reactStrictMode: true,
// }

// 참고 : https://kir93.tistory.com/entry/NextJS%EC%97%90%EC%84%9C-antd-less%ED%8C%8C%EC%9D%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EA%B8%B0

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
  
module.exports = withBundleAnalyzer({
compress: true,
webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === 'production';
    return {
    ...config,
    mode: prod ? 'production' : 'development',
    devtool: prod ? 'hidden-source-map' : 'eval',
    plugins: [...config.plugins, new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/)],
    };
},
});