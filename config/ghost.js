// Main difference from `nuxt-ghost-starter` is that we no longer limit
// the output from Ghost with `postIndexFields`, as this was the main issue
// for the post excerpt not being sent from the API. Reason is unknown.

import GhostContentAPI from '@tryghost/content-api'

const ghost = (url, key) => {
    return new GhostContentAPI({
        url,
        key,
        version: "v3"
    })
}

const postsPerPage = 10

const generateRoutes = async () => {
    const host = process.env.GHOST_URI
    const key = process.env.GHOST_KEY

    const api = ghost(host, key)

    const routes = []

    // 404 page
    const settings = await api.settings.browse()
    routes.push({
        route: '/404',
        payload: settings
    })

    // Pagination
    let nextPage = 1
    do {
        const posts = await api.posts.browse({
            limit: postsPerPage,
            page: nextPage,
            include: 'author,tags'
        })

        if(nextPage === 1) {
            routes.push({
                route: '/',
                payload: posts
            })
        } else {
            routes.push({
                route: '/page/' + posts.meta.pagination.page,
                payload: posts
            })
        }

        nextPage = posts.meta.pagination.next
    } while(nextPage)

    // Posts
    const posts = await api.posts.browse({
        limit: 'all',
        include: 'authors,tags',
        filter: 'visibility:public'
    })

    const postsWithLinks = posts.map((post, index) => {
        const prevSlug = posts[index - 1] ? posts[index - 1].slug : null
        const nextSlug = posts[index + 1] ? posts[index + 1].slug : null

        return {
            ...post,
            prevSlug,
            nextSlug
        }
    })

    postsWithLinks.forEach((post) => {
        routes.push({
            route: '/' + post.slug,
            payload: post
        })
    })

    // Pages
    const pages = await api.pages.browse({
        limit: 'all',
        include: 'authors,tags',
        filter: 'visibility:public'
    })

    pages.forEach((page) => {
        routes.push({
            route: '/' + page.slug,
            payload: page
        })
    })

    // Tags
    const tags = await api.tags.browse({
        fields: 'name,slug,id',
        limit: 'all',
        filter: 'visibility:public'
    })

    for(const tag of tags) {
        let nextPage = 1
        do {
            const posts = await api.posts.browse({
                limit: postsPerPage,
                page: nextPage,
                include: 'authors,tags',
                filter: `tag:${tag.slug}`
            })

            if(nextPage === 1) {
                routes.push({
                    route: '/tag/' + tag.slug,
                    payload: posts
                })
            } else {
                routes.push({
                    route: '/tag/' + tag.slug + '/page/' + posts.meta.pagination.page,
                    payload: posts
                })
            }

            nextPage = posts.meta.pagination.next
        } while(nextPage)
    }

    // Author
    const authors = await api.authors.browse({
        fields: 'name,slug,id',
        limit: 'all'
    })

    for (const author of authors) {
        let nextPage = 1
        do {
            const posts = await api.posts.browse({
                limit: postsPerPage,
                page: nextPage,
                include: 'authors,tags',
                filter: `author:${author.slug}`
            })

            if(nextPage === 1) {
                routes.push({
                    route: '/author/' + author.slug,
                    payload: posts
                })
            } else {
                routes.push({
                    route: '/author/' + author.slug + '/page/' + posts.meta.pagination.page,
                    payload: posts
                })
            }

            nextPage = posts.meta.pagination.next
        } while(nextPage)
    }

    return routes
}

const ghostAPI = () => {
    return ghost(process.env.ghostUri, process.env.ghostKey)
}

export { ghostAPI, generateRoutes, postsPerPage }
