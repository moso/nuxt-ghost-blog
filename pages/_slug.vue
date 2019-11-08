<template>
    <div class="container">
        <div class="row">
            <div class="xs-12 lg-10 mx-auto">
                <article class="single-post">
                    <scroll-progress-bar />
                    <div v-if="post.feature_image" class="post-image">
                        <img :src="post.feature_image" :alt="post.title">
                    </div>
                    <div class="row">
                        <div class="md-11 lg-10 mx-auto">
                            <div class="post-content">
                                <div class="post-tags">
                                    <ul class="list inline">
                                        <li v-for="tag in post.tags" :key="tag.id">
                                            <nuxt-link :to="{ path: '/tag/' + tag.slug }" class="button tag-button" :title="tag.name">{{ tag.name }}</nuxt-link>
                                        </li>
                                    </ul>
                                </div>
                                <h1 class="post-title">{{ post.title }}</h1>
                                <div v-if="!pageSettings.page === 'true'" class="post-author">
                                    <div v-if="post.primary_author.profile_image" class="post-author-avatar">
                                        <nuxt-link :to="{ path: '/author/' + post.primary_author.slug }">
                                            <img :src="post.primary_author.profile_image" :alt="post.primary_author.name" />
                                        </nuxt-link>
                                    </div>
                                    <div class="post-author-info">
                                        <div class="post-author-info-description">Author</div>
                                        <div class="post-author-info-name">
                                            <nuxt-link :to="{ path: '/author/' + post.primary_author.slug }" :title="post.primary_author.name">{{ post.primary_author.name }}</nuxt-link>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="!pageSettings.page === 'true'" class="post-meta">
                                    <ul class="list inline meta">
                                        <li v-if="post.featured">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" version="1.1">
                                                <path d="M 4.5 2 C 3.675781 2 3 2.675781 3 3.5 L 3 14.484375 L 8 10.820313 L 13 14.484375 L 13 3.5 C 13 2.675781 12.324219 2 11.5 2 Z M 4.5 3 L 11.5 3 C 11.78125 3 12 3.21875 12 3.5 L 12 12.515625 L 8 9.578125 L 4 12.515625 L 4 3.5 C 4 3.21875 4.21875 3 4.5 3 Z " />
                                            </svg>
                                            <span class="post-featured">Featured</span>
                                        </li>
                                        <li>
                                            <div class="post-meta-date">
                                                <div class="post-meta-date-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                        <path d="M 6 1 L 6 3 L 5 3 C 3.9 3 3 3.9 3 5 L 3 19 C 3 20.1 3.9 21 5 21 L 19 21 C 20.1 21 21 20.1 21 19 L 21 5 C 21 3.9 20.1 3 19 3 L 18 3 L 18 1 L 16 1 L 16 3 L 8 3 L 8 1 L 6 1 z M 5 5 L 19 5 L 19 7 L 5 7 L 5 5 z M 5 9 L 19 9 L 19 19 L 5 19 L 5 9 z M 12.75 10 L 9 11.455078 L 9 13.068359 L 11 12.365234 L 11 18 L 13 18 L 13 10 L 12.75 10 z" />
                                                    </svg>
                                                </div>
                                                <div class="post-meta-date-info">
                                                    <span class="published_at">{{ post.published_at | dayjs }}</span><span v-if="post.updated_at !== post.published_at" class="updated_at">- updated <span>{{ post.updated_at | dayjs }}</span></span>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z" />
                                            </svg>
                                            <span><reading-time :content="post.html" /></span>
                                        </li>
                                    </ul>
                                    <dropdown>
                                        <template slot="toggler">
                                            <span>Share</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path d="M 18 2 A 3 3 0 0 0 15 5 A 3 3 0 0 0 15.054688 5.5605469 L 7.9394531 9.7109375 A 3 3 0 0 0 6 9 A 3 3 0 0 0 3 12 A 3 3 0 0 0 6 15 A 3 3 0 0 0 7.9355469 14.287109 L 15.054688 18.439453 A 3 3 0 0 0 15 19 A 3 3 0 0 0 18 22 A 3 3 0 0 0 21 19 A 3 3 0 0 0 18 16 A 3 3 0 0 0 16.0625 16.712891 L 8.9453125 12.560547 A 3 3 0 0 0 9 12 A 3 3 0 0 0 8.9453125 11.439453 L 16.060547 7.2890625 A 3 3 0 0 0 18 8 A 3 3 0 0 0 21 5 A 3 3 0 0 0 18 2 z" />
                                            </svg>
                                        </template>
                                        <dropdown-content>
                                            <div class="dropdown-header">Share this</div>
                                            <dropdown-item :url="'https://twitter.com/share?text=' + post.title + '&url=' + blogUrl + post.slug" click="window.open(this.href,'twitter-share','width=550,height=235');return false;" link-class="twitter">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" version="1.1">
                                                    <path d="M 15 3.296875 C 14.476563 3.523438 13.949219 3.691406 13.367188 3.746094 C 13.949219 3.410156 14.417969 2.84375 14.648438 2.226563 C 14.066406 2.5625 13.484375 2.789063 12.84375 2.902344 C 12.257813 2.339844 11.5 2 10.683594 2 C 9.109375 2 7.824219 3.242188 7.824219 4.765625 C 7.824219 4.988281 7.824219 5.214844 7.882813 5.386719 C 4.875 5.386719 2.8125 3.691406 1.414063 2 C 1.121094 2.394531 1.003906 2.902344 1.003906 3.410156 C 1.003906 4.367188 1.53125 5.214844 2.289063 5.722656 C 1.820313 5.667969 1.355469 5.554688 1.003906 5.386719 C 1.003906 5.386719 1.003906 5.386719 1.003906 5.441406 C 1.003906 6.796875 1.996094 7.921875 3.28125 8.148438 C 3.046875 8.203125 2.8125 8.261719 2.519531 8.261719 C 2.347656 8.261719 2.171875 8.261719 1.996094 8.207031 C 2.347656 9.335938 3.976563 10.632813 5.257813 10.632813 C 4.265625 11.363281 3.34375 12 1.5 12 C 1.265625 12 1.453125 12 1 12 C 2.28125 12.789063 3.800781 13 5.375 13 C 10.683594 13 13.542969 8.769531 13.542969 5.101563 C 13.542969 4.988281 13.542969 4.878906 13.542969 4.765625 C 14.125 4.367188 14.59375 3.863281 15 3.296875 " />
                                                </svg>
                                                <span>Twitter</span>
                                            </dropdown-item>
                                            <dropdown-item :url="'https://www.facebook.com/sharer.php?u=' + blogUrl + post.slug" click="window.open(this.href,'facebook-share','width=580,height=296');return false;" link-class="facebook">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" version="1.1">
                                                    <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h7.621v-6.961h-2.343v-2.725h2.343V9.309 c0-2.324,1.421-3.591,3.495-3.591c0.699-0.002,1.397,0.034,2.092,0.105v2.43h-1.428c-1.13,0-1.35,0.534-1.35,1.322v1.735h2.7 l-0.351,2.725h-2.365V21H19c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z" />
                                                </svg>
                                                <span>Facebook</span>
                                            </dropdown-item>
                                        </dropdown-content>
                                    </dropdown>
                                </div>
                                <!-- eslint-disable-next-line vue/no-v-html -->
                                <div class="post-wrap" v-html="post.html" />
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import hljs from 'highlight.js'

import { ghostAPI } from '~/config/ghost'

import Dropdown from '~/components/Dropdown.vue'
import DropdownContent from '~/components/DropdownContent.vue'
import DropdownItem from '~/components/DropdownItem.vue'
import ReadingTime from '~/components/ReadingTime.vue'
import ScrollProgressBar from '~/components/ScrollProgressBar.vue'

dayjs.extend(advancedFormat)
hljs.configure({ tabReplace: '    ' })

export default {
    name: 'PostsPage',

    components: {
        'dropdown': Dropdown,
        'dropdown-content': DropdownContent,
        'dropdown-item': DropdownItem,
        'reading-time': ReadingTime,
        'scroll-progress-bar': ScrollProgressBar
    },

    filters: {
        dayjs(date) {
            return dayjs(date).format('MMMM Do, YYYY')
        }
    },

    async fetch({ error, params, payload, store }) {
        if(payload) {
            store.commit('setSinglePost', payload)
        } else {
            const postLinks = store.state.postNavigation.find(post => post.slug === params.slug)

            if(!postLinks) {
                try {
                    const page = await ghostAPI().pages.read({
                        slug: params.slug,
                        include: 'authors,tags'
                    })

                    store.commit('setSinglePost', page)
                } catch (err) {
                    error({
                        statusCode: 404,
                        message: err.message
                    })
                }
            } else {
                try {
                    const post = await ghostAPI().posts.read({
                        slug: params.slug,
                        include: 'authors,tags'
                    })

                    store.commit('setSinglePost', {
                        ...post,
                        prevSlug: postLinks.prevSlug,
                        nextSlug: postLinks.nextSlug
                    })
                } catch (err) {
                    error({
                        statusCode: 404,
                        message: err.message
                    })
                }
            }
        }
    },

    data() {
        return {
            blogUrl: process.env.blogUrl
        }
    },

    computed: {
        post() {
            return this.$store.state.singlePost
        },

        pageSettings() {
            return this.$store.state.pageSettings
        },

        pageUrl() {
            return this.pageSettings.url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]
        }
    },

    mounted() {
        window.addEventListener('load', () => {
            document.querySelectorAll('pre > code').forEach((block) => {
                hljs.highlightBlock(block)
            })
        })

        const cards = document.getElementsByClassName('kg-embed-card')
        for(const card of cards) {
            const iframe = card.firstElementChild
            const iframeHeight = iframe.getAttribute('height')
            if(iframeHeight) {
                iframe.style.height = iframeHeight + 'px'
            }
        }
    },

    head() {
        return {
            title: this.post.title + ' | ' + this.pageUrl,
            meta: [
                { hid: 'description', name: 'description', content: this.post.meta_description || this.post.excerpt },
                { hid: 'author', name: 'author', content: this.post.primary_author.name },
                { hid: 'og:description', property: 'og:description', content: this.post.meta_description || this.post.excerpt },
                { hid: 'og:image', property: 'og:image', content: this.post.og_image || this.post.feature_image },
                { hid: 'og:site_name', property: 'og:site_name', content: this.post.title },
                { hid: 'og:title', property: 'og:title', content: this.post.og_title || this.post.title },
                { hid: 'og:type', property: 'og:type', content: 'article' },
                { hid: 'og:url', property: 'og:url', content: process.env.blogUrl + this.$route.path },
                { hid: 'twitter:creator', name: 'twitter:creator', content: this.post.primary_author.twitter || this.post.primary_author.name },
                { hid: 'twitter:data1', name: 'twitter:data1', content: this.post.primary_author.name },
                { hid: 'twitter:description', name: 'twitter:description', content: this.post.twitter_description || this.post.meta_description || this.post.excerpt },
                { hid: 'twitter:image', name: 'twitter:image', content: this.post.twitter_image || this.post.feature_image },
                { hid: 'twitter:label1', name: 'twitter:label1', content: 'Written by' },
                { hid: 'twitter:title', name: 'twitter:title', content: this.post.twitter_title || this.post.title },
                { hid: 'twitter:url', name: 'twitter:url', content: process.env.blogUrl + this.$route.path },
                { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: this.post.title }
            ]
        }
    }
}
</script>
