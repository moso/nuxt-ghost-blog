<template>
    <div>
        <nav id="nav" class="navbar">
            <div class="container-fluid">
                <div class="nav">
                    <div class="nav-header">
                        <div class="logo">
                            <nuxt-link v-if="settings.logo" to="/">
                                <img :src="settings.logo" :alt="settings.title" @click="close">
                            </nuxt-link>
                            <h1 v-else-if="settings.title" @click="close">{{ settings.title }}</h1>
                            <h1 v-else @click="close">Blog title</h1>
                        </div>
                        <button class="nav-toggle" :class="toggled" @click="toggle">
                            <span class="icon-bar bar1" />
                            <span class="icon-bar bar2" />
                            <span class="icon-bar bar3" />
                        </button>
                        <div class="nav-content" :class="classes" @keyup.esc="close">
                            <ul>
                                <li v-for="(item, index) in settings.navigation" :key="index">
                                    <a v-if="isAbsolute(item.url)" :href="item.url" target="_blank" rel="noopener" :title="item.label"><span @click="close">{{ item.label }}</span></a>
                                    <nuxt-link v-else :to="{ path: item.url }" :title="item.label"><span @click="close">{{ item.label }}</span></nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <transition name="sidebar-backdrop">
            <div v-if="sidebarShow" class="sidebar-backdrop" @click="close();" />
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        settings: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            sidebarShow: false,
        }
    },

    computed: {
        classes() {
            return this.sidebarShow && 'sidebar-open'
        },

        toggled() {
            return this.sidebarShow && 'toggled'
        }
    },

    mounted() {
        this.$nextTick(() => {
            window.addEventListener('scroll', () => {
                const navbar = document.getElementById('nav')
                const navbarClasses = navbar.classList

                if(document.documentElement.scrollTop >= 50) {
                    if (navbarClasses.contains('solid') === false) {
                        navbarClasses.toggle('solid')
                    }
                } else if(navbarClasses.contains('solid') === true) {
                    navbarClasses.toggle('solid')
                }
            })
        })
    },

    methods: {
        show() {
            this.open()
        },

        open() {
            document.querySelector('body').classList.add('open-sidebar')
            this.sidebarShow = true
            this.$el.focus()
            this.$emit('open')
        },

        close() {
            document.querySelector('body').classList.remove('open-sidebar')
            this.sidebarShow = false
            this.$el.blur()
            this.$emit('close')
        },

        toggle() {
            if (this.sidebarShow) {
                this.close()
            } else {
                this.open()
            }
        },

        isAbsolute(value) {
            const regexp = new RegExp('^(http|https)', 'i')
            return regexp.test(value)
        }
    }
}
</script>
