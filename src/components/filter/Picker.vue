<template>
    <div class="mx-4">
        <div class="overflow-auto -mx-4">
            <tags-picker class="mx-4" v-model="tags" hideAddTag></tags-picker>
        </div>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page()
    .with('tags/Picker')
    .data(() => ({
        tags: [],
    }))
    .methods({
        tagsFilter(task) {
            if(this.tags.length < 1) {
                return true
            }
            for(let tag of this.tags) {
                if(task.tags.includes(tag)) {
                    return true
                }
            }
            return false
        },
        updateFilterActive() {
            const active = (value = true) => this.$store.commit('tasks/setCurrentFilter', { path: '$meta.filter.active', value })

            if(this.tags.length > 0) {
                return active()
            }

            return active(false)
        }
    })
    .watch('tags', 'updateFilterActive')
    .created(vue => {
        vue.$store.commit('tasks/addCurrentFilterFunction', vue.tagsFilter)
    })
    .vue()
</script>

<style>

</style>
