import { defineUserConfig, defaultTheme } from 'vuepress'
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'
import { copyCodePlugin } from 'vuepress-plugin-copy-code2'
import { searchProPlugin } from 'vuepress-plugin-search-pro'

const USER_NAME = 'Sun-ZhenXing'
const BASE_PATH = '/vuepress-embedded-template/'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '嵌入式合集',
  description: '各类嵌入式芯片及其开发总结',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '嵌入式合集',
      description: '各类嵌入式芯片及其开发总结',
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
    editLinkText: '在 GitHub 上编辑此页',
    contributorsText: '贡献者',
    lastUpdatedText: '上次更新',
    navbar: [
      {
        text: '合集',
        children: [
          '/raspberrypi-pico/',
        ]
      }
    ],
    sidebar: {
      '/raspberrypi-pico/': [
        {
          text: '树莓派 Pico',
          children: [
            '/raspberrypi-pico/intro/',
            '/raspberrypi-pico/c-cpp/',
            '/raspberrypi-pico/micropython/',
          ]
        }
      ],
      '/raspberrypi-pico/micropython/': [
        {
          text: 'MicroPython 开发树莓派 Pico',
          children: [
            '/raspberrypi-pico/micropython/chapter01/',
          ]
        }
      ],
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
      imageLazyload: true,
      tasklist: true,
      katex: true,
      mermaid: true,
      delay: 200,
    }),
    searchProPlugin({}),
    copyCodePlugin({
      showInMobile: true,
    }),
  ]
})
