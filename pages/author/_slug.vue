<template>
    <div class="author">
        <header :style="{ backgroundColor: '#171717', backgroundImage: `${pageAuthor.cover_image}`}">
            <div class="container-fluid">
                <div class="row">
                    <div class="xs-12 lg-8 mx-auto">
                        <div class="author-info">
                            <img v-if="pageAuthor.profile_image" :src="pageAuthor.profile_image" :alt="pageAuthor.name">
                            <h1 v-if="pageAuthor.name" class="author-title">{{ pageAuthor.name }}</h1>
                            <h2 v-if="pageAuthor.bio" class="author-bio">{{ pageAuthor.bio }}</h2>
                            <div class="author-meta">
                                <div class="author-stats">{{ pageAuthor.count.posts }} posts</div>
                                <a v-if="pageAuthor.website" class="social-link" :href="pageAuthor.website" title="Website">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" version="1.1">
                                        <path d="M 9 2 L 9 3 L 12.292969 3 L 6.023438 9.273438 L 6.726563 9.976563 L 13 3.707031 L 13 7 L 14 7 L 14 2 Z M 4 4 C 2.894531 4 2 4.894531 2 6 L 2 12 C 2 13.105469 2.894531 14 4 14 L 10 14 C 11.105469 14 12 13.105469 12 12 L 12 7 L 11 8 L 11 12 C 11 12.550781 10.550781 13 10 13 L 4 13 C 3.449219 13 3 12.550781 3 12 L 3 6 C 3 5.449219 3.449219 5 4 5 L 8 5 L 9 4 Z " />
                                    </svg>
                                </a>
                                <a v-if="pageAuthor.twitter" class="social-link" :href="'https://twitter.com/' + pageAuthor.twitter" title="Twitter">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" version="1.1">
                                        <path d="M 15 3.296875 C 14.476563 3.523438 13.949219 3.691406 13.367188 3.746094 C 13.949219 3.410156 14.417969 2.84375 14.648438 2.226563 C 14.066406 2.5625 13.484375 2.789063 12.84375 2.902344 C 12.257813 2.339844 11.5 2 10.683594 2 C 9.109375 2 7.824219 3.242188 7.824219 4.765625 C 7.824219 4.988281 7.824219 5.214844 7.882813 5.386719 C 4.875 5.386719 2.8125 3.691406 1.414063 2 C 1.121094 2.394531 1.003906 2.902344 1.003906 3.410156 C 1.003906 4.367188 1.53125 5.214844 2.289063 5.722656 C 1.820313 5.667969 1.355469 5.554688 1.003906 5.386719 C 1.003906 5.386719 1.003906 5.386719 1.003906 5.441406 C 1.003906 6.796875 1.996094 7.921875 3.28125 8.148438 C 3.046875 8.203125 2.8125 8.261719 2.519531 8.261719 C 2.347656 8.261719 2.171875 8.261719 1.996094 8.207031 C 2.347656 9.335938 3.976563 10.632813 5.257813 10.632813 C 4.265625 11.363281 3.34375 12 1.5 12 C 1.265625 12 1.453125 12 1 12 C 2.28125 12.789063 3.800781 13 5.375 13 C 10.683594 13 13.542969 8.769531 13.542969 5.101563 C 13.542969 4.988281 13.542969 4.878906 13.542969 4.765625 C 14.125 4.367188 14.59375 3.863281 15 3.296875 " />
                                    </svg>
                                </a>
                                <a v-if="pageAuthor.facebook" class="social-link" :href="'https://facebook.com/' + pageAuthor.facebook" title="Facebook">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" version="1.1">
                                        <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h7.621v-6.961h-2.343v-2.725h2.343V9.309 c0-2.324,1.421-3.591,3.495-3.591c0.699-0.002,1.397,0.034,2.092,0.105v2.43h-1.428c-1.13,0-1.35,0.534-1.35,1.322v1.735h2.7 l-0.351,2.725h-2.365V21H19c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div class="container">
            <div class="row">
                <div class="xs-12 lg-9 mx-auto">
                    <posts :posts="postsIndex" :pagination="paginationIndex" :base-url="'/author/' + pageAuthor.slug + '/'" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Posts from '~/components/Posts.vue'

export default {
    name: 'AuthorIndex',

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
                    filter: 'author:' + params.slug,
                    include: 'count.posts',
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

        pageAuthor() {
            return this.$store.state.pageAuthors.find(author => author.slug === this.$route.params.slug)
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
            title: this.pageAuthor.name + ' | ' + this.pageUrl
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/_variables.scss';

header {
    margin: -1rem 0 1rem;
    height: 100vh;

    @media (min-width: 992px) {
        min-height: 200px;
        max-height: 450px;
    }

    .container-fluid,
    .container-fluid > .row,
    .container-fluid > .row > div {
        height: 100%;
    }

    .author-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;

        > img {
            margin: 0 0 1.125rem;
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }

        h1, h2 {
            margin: 0;
            color: #fff;
        }

        h1 {
            font-size: 2.5rem;
        }

        h2 {
            font-weight: 300;
        }

        .author-meta {
            display: flex;
            margin: 1rem 0 0;
            font-style: italic;
            color: rgba(255,255,255,.75);

            .author-stats {
                margin: 0 .5rem;
            }
        }

        .social-link {
            margin: 0 .5rem;

            svg {
                height: 1.25rem;
                fill: rgba(255,255,255,.75);
                transition: fill .2s ease;
            }

            &:hover,
            &:focus,
            &:active,
            &:hover:active {
                svg {
                    fill: #fff;
                }
            }
        }
    }
}
</style>
