<template>
    <div class="container">
        <div class="row">
            <div class="xs-12 lg-10 mx-auto">
                <posts :posts="postsIndex" :pagination="paginationIndex" />
            </div>
        </div>
    </div>
</template>

<script>
import Posts from '~/components/Posts.vue'

export default {
    components: {
        'posts': Posts
    },

    async fetch({ error, params, payload, store }) {
        if(payload) {
            store.commit('setPostsIndex', payload)
        } else {
            let pageNumber = 1
            if(params.pageNumber) {
                pageNumber = params.pageNumber
            }

            try {
                await store.dispatch('getPostsIndex', {
                    filter: '',
                    pageNumber
                })
            } catch(err) {
                error({
                    statusCode: 404,
                    message: err.message
                })
            }
        }
    },

    computed: {
        postsIndex() {
            return this.$store.state.postsIndex
        },

        paginationIndex() {
            return this.$store.state.paginationIndex
        },

        pageSettings() {
            return this.$store.state.pageSettings
        },

        pageUrl() {
            return this.pageSettings.url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]
        }
    },

    head() {
        return {
            title: this.pageSettings.title + ' - ' + this.pageSettings.description + ' | ' + this.pageUrl,
            meta: [
                { hid: 'author', name: 'author', content: this.pageSettings.primary_author ? this.pageSettings.primary_author : '' },
                { hid: 'description', name: 'description', content: this.pageSettings.description },
                { hid: 'og:description', property: 'og:description', content: this.pageSettings.description },
                { hid: 'og:image', property: 'og:image', content: this.pageSettings.cover_image },
                { hid: 'og:site_name', property: 'og:site_name', content: this.pageSettings.title },
                { hid: 'og:title', property: 'og:title', content: this.pageSettings.title },
                { hid: 'og:url', property: 'og:url', content: process.env.blogUrl },
                { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: this.pageSettings.title }
            ]
        }
    }
}
</script>
