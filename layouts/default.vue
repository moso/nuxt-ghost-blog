<template>
    <div>
        <blog-navbar :settings="pageSettings" />
        <main>
            <nuxt />
        </main>
        <blog-footer :settings="pageSettings" />
    </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

export default {
    components: {
        'blog-navbar': Navbar,
        'blog-footer': Footer
    },

    computed: {
        pageSettings() {
            return this.$store.state.pageSettings
        },

        codeHead() {
            return this.pageSettings.codeinjection_head ? this.pageSettings.codeinjection_head : ''
        },

        codeFoot() {
            return this.pageSettings.codeinjection_foot ? this.pageSettings.codeinjection_foot : ''
        }
    },

    beforeMount() {
        if(this.codeHead.length !== '') {
            const headInject = document.createRange().createContextualFragment(this.codeHead)
            document.getElementsByTagName('head')[0].appendChild(headInject)
        }

        if(this.codeFoot.length !== '') {
            const footInject = document.createRange().createContextualFragment(this.codeFoot)
            document.getElementsByTagName('body')[0].appendChild(footInject)
        }
    }
}
</script>
