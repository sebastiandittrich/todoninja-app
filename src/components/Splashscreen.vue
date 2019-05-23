<template>
    <div class="flex flex-col items-center justify-center h-full text-center text-3xl font-light text-grey-darkest dark:text-grey-lightest p-8">
        Welcome back {{ user && user.name && user.name.split(' ')[0] }}!
        <Loader class="w-16 mt-16" :color="{ dark: 'white', light: 'black' } | color"></Loader>
    </div>
</template>

<script>
import { themeColor } from '@/mixins'

import Loader from '@c/loader'

export default {
    mixins: [ themeColor({ dark: 'black', light: 'white' }) ],
    components: { Loader },
    computed: {
        isLoggedIn() {
            return !!this.$store.state.auth.accessToken
        },
        user() {
            return this.isLoggedIn ? this.$store.state.auth.user : { name: '' }
        }
    }
}
</script>