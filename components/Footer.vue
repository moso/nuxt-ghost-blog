<template>
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="xs-12 lg-10 mx-auto">
                    <div class="footer-content">
                        <div class="copy">
                            <p>Copyright &copy; {{ settings.title }} {{ year }}</p>
                            <p class="muted">Published with <a href="https://ghost.io" target="_blank" rel="noopener" title="Ghost">Ghost</a></p>
                        </div>
                        <div class="social">
                            <ul>
                                <li v-if="settings.twitter">
                                    <a class="social-link" :href="'https://twitter.com/' + settings.twitter" title="Twitter">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" version="1.1">
                                            <path d="M 15 3.296875 C 14.476563 3.523438 13.949219 3.691406 13.367188 3.746094 C 13.949219 3.410156 14.417969 2.84375 14.648438 2.226563 C 14.066406 2.5625 13.484375 2.789063 12.84375 2.902344 C 12.257813 2.339844 11.5 2 10.683594 2 C 9.109375 2 7.824219 3.242188 7.824219 4.765625 C 7.824219 4.988281 7.824219 5.214844 7.882813 5.386719 C 4.875 5.386719 2.8125 3.691406 1.414063 2 C 1.121094 2.394531 1.003906 2.902344 1.003906 3.410156 C 1.003906 4.367188 1.53125 5.214844 2.289063 5.722656 C 1.820313 5.667969 1.355469 5.554688 1.003906 5.386719 C 1.003906 5.386719 1.003906 5.386719 1.003906 5.441406 C 1.003906 6.796875 1.996094 7.921875 3.28125 8.148438 C 3.046875 8.203125 2.8125 8.261719 2.519531 8.261719 C 2.347656 8.261719 2.171875 8.261719 1.996094 8.207031 C 2.347656 9.335938 3.976563 10.632813 5.257813 10.632813 C 4.265625 11.363281 3.34375 12 1.5 12 C 1.265625 12 1.453125 12 1 12 C 2.28125 12.789063 3.800781 13 5.375 13 C 10.683594 13 13.542969 8.769531 13.542969 5.101563 C 13.542969 4.988281 13.542969 4.878906 13.542969 4.765625 C 14.125 4.367188 14.59375 3.863281 15 3.296875 " />
                                        </svg>
                                    </a>
                                </li>
                                <li v-if="settings.facebook">
                                    <a class="social-link" :href="'https://facebook.com/' + settings.facebook" title="Facebook">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" version="1.1">
                                            <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h7.621v-6.961h-2.343v-2.725h2.343V9.309 c0-2.324,1.421-3.591,3.495-3.591c0.699-0.002,1.397,0.034,2.092,0.105v2.43h-1.428c-1.13,0-1.35,0.534-1.35,1.322v1.735h2.7 l-0.351,2.725h-2.365V21H19c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a class="social-link" href="/rss.xml" title="RSS">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" version="1.1">
                                            <path d="M6.18,15.64A2.18,2.18 0 0,1 8.36,17.82C8.36,19 7.38,20 6.18,20C5,20 4,19 4,17.82A2.18,2.18 0 0,1 6.18,15.64M4,4.44A15.56,15.56 0 0,1 19.56,20H16.73A12.73,12.73 0 0,0 4,7.27V4.44M4,10.1A9.9,9.9 0 0,1 13.9,20H11.07A7.07,7.07 0 0,0 4,12.93V10.1Z" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    props: {
        settings: {
            type: Object,
            required: true
        }
    },

    computed: {
        year() {
            const now = new Date()
            const yyyy = now.getFullYear()
            return yyyy
        }
    }
}
</script>
