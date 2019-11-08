<template>
    <div v-on-clickaway="away" class="dropdown" @click="toggle">
        <slot name="toggler">
            <button>Toggle</button>
        </slot>
        <slot />
    </div>
</template>

<script>
// Inspired by "Dropdowns in Vue: The Right Way"
// Credit: Victor Rønnow
// https://ronnow.io/articles/dropdowns-in-vue
import { mixin as clickaway } from 'vue-clickaway'

export default {
    name: 'Dropdown',

    mixins: [ clickaway ],

    provide() {
        return {
            sharedState: this.sharedState
        }
    },

    data() {
        return {
            sharedState: {
                active: false
            }
        }
    },

    methods: {
        toggle() {
            this.sharedState.active = !this.sharedState.active
        },

        away() {
            this.sharedState.active = false
        }
    }
}
</script>
