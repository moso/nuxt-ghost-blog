import axios from 'axios'
import { generateRoutes } from './config/ghost'
import { build, feed, meta } from './config'
import { isDev } from './config/dev'

require('dotenv').config()

export default async () => {
    const { data: { settings } } = await axios.get(process.env.GHOST_URI + '/ghost/api/v3/content/settings/?key=' + process.env.GHOST_KEY + '&v=3')
    return {
        mode: 'universal',
        modern: !isDev && 'client',

        watch: ['~/config/*'],

        meta,

        css: [
            '~/node_modules/flexgrid.io/dist/flexgrid-utils.min.css',
            '~/assets/scss/main.scss'
        ],

        loading: { color: '#171717' },

        modules: [
            '@nuxtjs/pwa',
            'nuxt-webfontloader'
        ],

        buildModules: [
            '@nuxtjs/eslint-module',
            '@nuxtjs/feed'
        ],

        env: {
            ghostUri: process.env.GHOST_URI,
            ghostKey: process.env.GHOST_KEY,
            blogUrl: process.env.BLOG_URL
        },

        webfontloader: {
            custom: {
                families: [
                    'Source Sans Pro:n3,n4,n6',
                    'Roboto Mono:n4'
                ],
                urls: [
                    'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600&display=swap',
                    'https://fonts.googleapis.com/css?family=Roboto+Mono:400&display=swap'
                ]
            }
        },

        feed,

        generate: {
            subFolders: false,
            routes: generateRoutes
        },

        router: {
            extendRoutes(routes, resolve) {
                routes.push({
                    name: 'PostIndex',
                    path: '/page/:pageNumber',
                    component: resolve(__dirname, 'pages/index.vue')
                })

                routes.push({
                    name: 'TagIndex',
                    path: '/tag/:slug/page/:pageNumber',
                    component: resolve(__dirname, 'pages/tag/_slug.vue')
                })

                routes.push({
                    name: 'AuthorIndex',
                    path: '/author/:slug/page/:pageNumber',
                    component: resolve(__dirname, 'pages/author/_slug.vue')
                })
            }
        },

        plugins: [
            //
        ],

        pwa: {
            manifest: {
                name: settings.title + ' - ' + settings.description,
                short_name: settings.title,
                description: settings.description,
                lang: settings.lang,
                start_url: '/',
                display: 'standalone'
            }
        },

        build
    }
}
