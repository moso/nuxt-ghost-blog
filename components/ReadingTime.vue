<template>
    <span>{{ readingTime }} min read</span>
</template>

<script>
export default {
    name: 'ReadingTime',

    props: {
        content: {
            type: String,
            default: null
        }
    },

    computed: {
        readingTime() {
            let minutes = 0
            const contentString = JSON.stringify(this.content)
            const words = contentString.split(' ').length
            const wordsPerMinute = 250
            minutes = Math.ceil(words / wordsPerMinute)
            return minutes
        }
    }
}
</script>
