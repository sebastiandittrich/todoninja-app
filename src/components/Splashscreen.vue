<template>
    <div class="flex flex-col items-center justify-center h-full text-center text-3xl font-light text-grey-darkest">
        Welcome back {{ user.name.split(' ')[0] }}!
        <i class="feather icon-loader mt-16"></i>
    </div>
</template>

<style scoped>
    @keyframes spin {
        0% {
            transform: rotate(0deg)
        }
        50% {
            transform: rotate(180deg)
        }
        0% {
            transform: rotate(360deg)
        }
    }

    .icon-loader {
        animation: spin 2s linear infinite;
    }
</style>


<script>
import Page from '@/assets/js/Page'
import loading from '@/assets/js/traits/loading'

export default new Page('Splashscreen')
    .use(loading)
    .computed({
        isLoggedIn() {
            return !!this.$store.state.auth.accessToken
        },
        user() {
            return this.isLoggedIn ? this.$store.state.auth.user : { name: '' }
        }
    })
    .vue()
</script>