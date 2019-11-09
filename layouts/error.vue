<template>
    <div class="container container-404">
        <div class="row">
            <div class="xs-12">
                <div class="box-404">
                    <div class="content-404">
                        <h1>404</h1>
                        <h3>Whoops!</h3>
                        <p>It looks like the page you're looking for no longer exists. Or maybe a mistake happend.</p>
                        <p>Nevertheless, you can always go back to the <nuxt-link to="/" title="front page">front page</nuxt-link> and try again.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        error: {
            type: Object,
            default: null
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/_variables.scss';

.container-404,
.container > .row,
.container > .row > .xs-12 {
    height: 100%;
}

.box-404 {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - (#{$navbar-height + 1rem} + 160px));

    @media (min-width: 992px) {
        height: calc(100vh - (#{$navbar-height + 1rem} + 107px));
    }

    .content-404 {
        width: 100%;
        text-align: center;

        @media (min-width: 576px) {
            max-width: 300px;
        }

        h1 {
            margin: 0;
            font-size: 7.5rem;
            font-weight: 300;
        }

        h3 {
            margin: 0 0 2rem;
            font-size: 1.25rem;
            font-weight: 600;
            color: rgba($text-color, .6);
        }

        p {
            font-size: 1.125rem;

            &:last-of-type {
                margin: 0;
            }
        }
    }
}
</style>
