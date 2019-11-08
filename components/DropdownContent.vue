<template>
    <transition name="dropdown-content">
        <div v-if="active" class="dropdown-content-inner">
            <slot />
        </div>
    </transition>
</template>

<script>
// Inspired by "Dropdowns in Vue: The Right Way"
// Credit: Victor Rønnow
// https://ronnow.io/articles/dropdowns-in-vue
export default {
    name: 'DropdownContent',

    inject: [ 'sharedState' ],

    computed: {
        active() {
            return this.sharedState.active
        }
    }
}
</script>

<style lang="scss">
.dropdown-content-enter-active,
.dropdown-content-leave-active {
    transition: all .2s;
}

.dropdown-content-enter,
.dropdown-content-leave-to {
    opacity: 0;
    transform: translateY(-5px);
}
</style>
