<template>
    <transition name="opacity-slide-up">
        <div>
            <div class="flex flex-row items-center px-4 py-4 shadow-md text-grey-darker">
                <i @click="$router.back()" class="feather icon-arrow-left text-2xl mr-4"></i>
                <inputt ref="searchinputt" iclass="border-none" class="inline-flex w-full" :value="query" placeholder="Search for a task..." type="text"></inputt>
                <i v-if="query" @click="query = ''" class="feather icon-x text-grey-darker cursor-pointer"></i>
            </div>
            <tasks-list class="mt-8" :tasks="tasks"></tasks-list>
        </div>
    </transition>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .with('inputt', 'tasks/List')
    .data(() => ({
        query: ''
    }))
    .getters({
        tasks: 'tasks/list'
    })
    .methods({
        focus() {
            if(this.$refs.searchinputt) {
                this.$refs.searchinputt.focus()
            } else {
                setTimeout(this.focus, 0)
            }
        }
    })
    .created(vue => {
        vue.focus()
    })
    .vue()
</script>

<style>

</style>
