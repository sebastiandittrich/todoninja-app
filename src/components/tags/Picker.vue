<template>
    <div>
        <transition-group tag="div" name="list" class="flex flex-row items-center justify-start">
            <div v-for="tag of tags" @click="tagClick(tag.id)" :key="tag.id" :class="isActive(tag) ? 'border-blue text-blue' : 'border-grey text-grey'" class="whitespace-no-wrap transition rounded-full border py-1 px-4 mr-2">
                {{ tag.name }}
            </div>
            <div key="add" class="text-blue cursor-pointer flex flex-row items-center ml-2 pr-6 flex-no-wrap whitespace-no-wrap" @click="show_tags_creator = true">
                <i class="mi mi-Add mr-2"></i>
                Add tag
            </div>
        </transition-group>    
        <tags-creator :show="show_tags_creator" @hide="show_tags_creator = false"></tags-creator>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'

export default new Page('TagsPicker')
    .props('value')
    .with('tags/Creator')
    .getters({
        tags_list: 'tags/list'
    })
    .data(() => ({
        show_tags_creator: false,
    }))
    .methods({
        isActive(tag) {
            return this.value.includes(tag.id)
        },
        tagClick(id) {
            if(this.value.includes(id)) {
                this.$emit('input', this.value.filter(tagid => tagid != id))
            } else {
                this.$emit('input', [ ...this.value, id ])
            }
        }
    })
    .computed({
        tags() {
            console.log('resort')
            return this.tags_list.sort((a, b) => {
                const aactive = this.isActive(a)
                const bactive = this.isActive(b)

                if(aactive == bactive) return 0
                else if(aactive && !bactive) return -1
                else return 1
            })
        }
    })
    .created(() => console.log('lol'))
    .vue()
</script>