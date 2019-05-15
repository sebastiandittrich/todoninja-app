<template>
    <div>
        <greeting class="absolute inset-0"></greeting>
        <div class="absolute inset-0 flex flex-row items-end justify-center">
            <Loader color="#ffffff" class="mb-16"></Loader>
        </div>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'
import loading from '@/assets/js/traits/loading'

export default new Page('Splashscreen')
    .use(loading)
    .with('Greeting')
    .vue()
</script>