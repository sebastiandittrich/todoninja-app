<template>
    <transition name="opacity-slide-up">
        <div class="flex flex-col items-center">
            <img v-if="tasksCount > 0" :src="image" alt="illustration for text below" class="w-1/2 mt-8">
            <img v-else src="/img/no_data.svg" alt="illustration for text below" class="w-1/2 mt-8">
            <div class="font-light text-xl text-blue-darkest px-8 mt-8 text-center">
                <slot v-if="tasksCount > 0"></slot>
                <span v-else>Looks empty here!</span>
                <div class="text-sm font-bold mt-4">
                    <slot v-if="tasksCount > 0" name="subtitle"></slot>
                    <span v-else>Add your first task by clicking the <i class="feather icon-plus"></i> icon</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .props({
        image: String,
    })
    .data(() => ({
        tasksCount: null
    }))
    .created(async vue => vue.tasksCount = (await vue.$store.dispatch('tasks/find', {query: { $limit: 0 }})).data.length)
    .vue()
</script>

<style>

</style>
