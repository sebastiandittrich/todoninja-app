<template>
    <img :src="src" alt="" class="w-4/5 md:w-1/2">
</template>

<script>
export default {
    props: {
        src: String
    }
}
</script>
