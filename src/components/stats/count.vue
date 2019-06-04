<template>
    <div class="flex flex-col items-center p-8 bg-white dark:bg-black-deep">
        <div class="text-5xl">
            {{ value }}
        </div>
        <div class="text-grey-darker dark:text-grey uppercase text-sm mt-2">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: '',
    }
}
</script>
