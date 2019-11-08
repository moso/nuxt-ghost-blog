<template>
    <div class="container">
        <div class="row">
            <div class="xs-12 lg-9 mx-auto">
                <div class="tags">
                    <h1 class="tags-title">Tags</h1>
                    <ul class="tags-list">
                        <li v-for="tag in pageTags" :key="tag.id">
                            <nuxt-link :to="{ path: '/tag/' + tag.slug }" class="tag" :title="tag.name">{{ tag.name }} ({{ tag.count.posts }})</nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        pageTags() {
            return this.$store.state.pageTags
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
            title: 'Tags' + ' | ' + this.pageUrl
        }
    }
}
</script>
<style lang="scss" scoped>
.tags {
   .tags-title {
        margin: 0 0 1rem;
        max-width: 80%;
        font-size: 2rem;
        font-weight: 600;
        line-height: 1.2;
    }

    .tags-list {
        margin: 0 0 2rem;
        padding: 0;
        list-style: none;

        li {
            margin: 0 0 .5rem;
        }
    }
}
</style>
