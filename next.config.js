/** @type {import('next').NextConfig} */
const nextConfig = {
  // 环境变量
  env: {
    BUILT_TIME: new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
  },

  // 输出配置
  output: 'standalone',

  // 图片优化
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // 压缩
  compress: true,

  // 生成 source map（开发环境）
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
