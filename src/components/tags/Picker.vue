<template>
    <div>
        <transition-group tag="div" name="list" class="flex flex-row items-center justify-start">
            <div v-for="tag of tags" @click="tagClick(tag.id)" :key="tag.id" :class="remove ? 'bg-red border-none text-white' : (isActive(tag) ? 'border-blue text-blue' : 'border-grey text-grey')" class="whitespace-no-wrap transition rounded-full border py-1 px-4 mr-2 cursor-pointer select-none">
                <i v-if='remove' class="feather icon-trash text-red-lighter"></i>
                {{ tag.name }}
            </div>
            <div v-if="!remove && !hideAddTag" key="add" class="text-blue cursor-pointer select-none flex flex-row items-center ml-2 pr-6 flex-no-wrap whitespace-no-wrap" @click="showModal('tags-creator', $event)">
                <i class="feather icon-plus mr-2"></i>
                Add tag
            </div>
        </transition-group>    
        <tags-creator :state="modalState('tags-creator')" @hide="hideModal('tags-creator')" @created="tagCreated"></tags-creator>
        <confirmator @confirm="deleteTag" @hide="hideModal('confirmator')" :state="modalState('confirmator')" title="Delete tag">
            Are you sure you want to delete this tag?

            <div slot="confirm" class="button-red">Delete</div>
        </confirmator>
    </div>
</template>

<script>
import Page from '@/assets/js/Page'
import hasModals from '@/assets/js/traits/hasModals'

export default new Page('TagsPicker')
    .props({
        value: Array,
        // Is remove mode
        remove: Boolean,
        hideAddTag: { type: Boolean, default: false }
    })
    .use( hasModals({ 'tags-creator': 'tags/Creator', 'confirmator': 'confirmator' }) )
    .getters({
        tags_list: 'tags/list',
        getTag: 'tags/get'
    })
    .data(() => ({
        show_tags_creator: false,
    }))
    .methods({
        isActive(tag) {
            return this.value.includes(tag.id)
        },
        async tagClick(id) {
            if(this.remove) {
                return this.showModal('confirmator', { data: id })
            }

            if(this.value.includes(id)) {
                this.$emit('input', this.value.filter(tagid => tagid != id))
            } else {
                this.$emit('input', [ ...this.value, id ])
            }
        },
        async deleteTag(id) {
            const ret = await this.$store.dispatch('tags/remove', id)
            this.$store.dispatch('events/success', { message: 'Tag deleted.', color: 'orange' })
            return ret
        },
        tagCreated(tag) {
            this.tagClick(tag.id)
        }
    })
    .computed({
        tags() {
            return this.tags_list.sort((a, b) => {
                const aactive = this.isActive(a)
                const bactive = this.isActive(b)

                if(aactive == bactive) return 0
                else if(aactive && !bactive) return -1
                else return 1
            })
        }
    })
    .vue()
</script>