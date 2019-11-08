// Configuration for `@nuxtjs/feed`.
// Docs at https://github.com/nuxt-community/feed-module

import axios from 'axios'

export default [
    {
        path: '/rss.xml', // Change this if you want a different name and/or another location
        cacheTime: 1000 * 60 * 15, // Change this if you want your feed to cache more/less
        type: 'rss2', // Types: rss2, atom1, json1
        async create(feed) {
            const [
                { data: { posts } },
                { data: { settings } }
            ] = await Promise.all([
                axios.get(process.env.GHOST_URI + '/ghost/api/v3/content/posts/?key=' + process.env.GHOST_KEY + '&v=3&include=authors'),
                axios.get(process.env.GHOST_URI + '/ghost/api/v3/content/settings/?key=' + process.env.GHOST_KEY + '&v=3')
            ])
            posts.forEach(post => {
                feed.options = {
                    title: settings.title,
                    link: process.env.BLOG_URL,
                    description: settings.description
                }

                feed.addItem({
                    title: post.title,
                    id: process.env.BLOG_URL + '/' + post.slug,
                    link: process.env.BLOG_URL + '/' + post.slug,
                    image: post.feature_image,
                    description: post.custom_excerpt ? post.custom_excerpt : post.excerpt,
                    date: new Date(post.published_at),
                    updated: new Date(post.updated_at),
                    content: post.html,
                    author: {
                        name: post.primary_author.name,
                        email: post.primary_author.email,
                        link: post.primary_author.website
                    }
                })
            })
        }
    }
]
