import { defineUserConfig, defaultTheme } from 'vuepress'
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'
import { copyCodePlugin } from 'vuepress-plugin-copy-code2'
import { searchProPlugin } from 'vuepress-plugin-search-pro'
import { autoCatalogPlugin } from 'vuepress-plugin-auto-catalog'

const USER_NAME = 'Sun-ZhenXing'
const BASE_PATH = '/vuepress-embedded-notes/'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '嵌入式合集',
  description: '各类嵌入式芯片开发总结',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '嵌入式合集',
      description: '各类嵌入式芯片开发总结',
    }
  },
  head: [
    ['link', { rel: 'icon', href: `${BASE_PATH}favicon.svg` }]
  ],
  base: BASE_PATH,
  markdown: {
    code: {
      lineNumbers: 10
    }
  },
  theme: defaultTheme({
    logo: '/favicon.svg',
    repo: `${USER_NAME}${BASE_PATH}`,
    docsDir: 'docs',
    editLinkText: '在 GitHub 上编辑此页',
    contributorsText: '贡献者',
    lastUpdatedText: '上次更新',
    navbar: [
      {
        text: '合集',
        children: [
          '/awesome/',
          '/esp/',
          '/jetson/',
          '/raspberrypi-pico/',
          '/rockchip/',
        ]
      }
    ],
    sidebar: {
      '/jetson/': [
        '/jetson/jetson-nano/',
      ],
      '/jetson/common/': [
        '/jetson/common/compile-opencv-with-cuda.md',
        '/jetson/common/compile-ncnn.md',
      ],
      '/jetson/jetson-nano/': [
        '/jetson/jetson-nano/get-started.md',
        '/jetson/jetson-nano/gpio.md',
        '/jetson/jetson-nano/utils.md',
        '/jetson/jetson-nano/emmc.md',
      ],
      '/raspberrypi-pico/': [
        '/raspberrypi-pico/tutorial/',
        '/raspberrypi-pico/c-cpp/',
        '/raspberrypi-pico/micropython/',
      ],
      '/raspberrypi-pico/tutorial/': [
        '/raspberrypi-pico/tutorial/chapter01/',
        '/raspberrypi-pico/tutorial/chapter02/',
        '/raspberrypi-pico/tutorial/chapter03/',
      ],
      '/raspberrypi-pico/c-cpp/': [
        '/raspberrypi-pico/c-cpp/chapter01/',
      ],
      '/raspberrypi-pico/micropython/': [
        '/raspberrypi-pico/micropython/chapter01/',
        '/raspberrypi-pico/micropython/chapter02/',
        '/raspberrypi-pico/micropython/chapter03/',
        '/raspberrypi-pico/micropython/chapter04/',
        '/raspberrypi-pico/micropython/chapter05/',
        '/raspberrypi-pico/micropython/chapter06/',
        '/raspberrypi-pico/micropython/chapter07/',
        '/raspberrypi-pico/micropython/chapter08/',
        '/raspberrypi-pico/micropython/chapter09/',
      ]
    }
  }),
  plugins: [
    mdEnhancePlugin({
      gfm: true,
      container: true,
      linkCheck: true,
      vPre: true,
      tabs: true,
      codetabs: true,
      align: true,
      attrs: true,
      sub: true,
      sup: true,
      footnote: true,
      mark: true,
      imgLazyload: true,
      tasklist: true,
      katex: true,
      mermaid: true,
      delay: 200,
      stylize: [
        {
          matcher: '@def',
          replacer: ({ tag }) => {
            if (tag === 'em') return {
              tag: 'Badge',
              attrs: { type: 'tip' },
              content: '定义'
            }
          }
        },
        {
          matcher: '@TODO',
          replacer: ({ tag }) => {
            if (tag === 'em') return {
              tag: 'Badge',
              attrs: { type: 'danger' },
              content: 'TODO'
            }
          }
        }
      ]
    }),
    searchProPlugin({}),
    autoCatalogPlugin({}),
    copyCodePlugin({
      showInMobile: true
    })
  ]
})
