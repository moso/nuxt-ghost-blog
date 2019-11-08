import { ghostAPI, postsPerPage } from '~/config/ghost'

export const state = () => ({
    postNavigation: [],
    postsIndex: [],
    paginationIndex: [],
    singlePost: null,
    pageSettings: null,
    pageTags: null,
    pageAuthors: null,
    tagsIndex: []
})

export const mutations = {
    setPostNavigation(state, postNavigation) {
        state.postNavigation = postNavigation
    },

    setPostsIndex(state, postsIndex) {
        state.postsIndex = postsIndex
        state.paginationIndex = postsIndex.meta.pagination
    },

    setSinglePost(state, singlePost) {
        state.singlePost = singlePost
    },

    setPageSettings(state, pageSettings) {
        state.pageSettings = pageSettings
    },

    setPageTags(state, pageTags) {
        state.pageTags = pageTags
    },

    setPageAuthors(state, pageAuthors) {
        state.pageAuthors = pageAuthors
    }
}

export const actions = {
    async nuxtServerInit({ commit }, { error }) {
        try {
            const settings = await ghostAPI().settings.browse()
            const tags = await ghostAPI().tags.browse({
                limit: 'all',
                filter: 'visibility:public',
                include: 'count.posts'
            })
            const authors = await ghostAPI().authors.browse({
                limit: 'all',
                include: 'count.posts'
            })
            const posts = await ghostAPI().posts.browse({
                limit: 'all',
                fields: 'slug,title'
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

            commit('setPageSettings', settings)
            commit('setPageTags', tags)
            commit('setPageAuthors', authors)
            commit('setPostNavigation', postsWithLinks)
        } catch(err) {
            error({
                statusCode: 500,
                message: err.message
            })
            throw err
        }
    },

    async getPostsIndex({ commit }, pagination) {
        const posts = await ghostAPI().posts.browse({
            limit: postsPerPage,
            page: pagination.pageNumber,
            include: 'tags,authors',
            filter: pagination.filter,
            order: 'featured DESC, published_at DESC'
        })
        commit('setPostsIndex', posts)
    }
}
