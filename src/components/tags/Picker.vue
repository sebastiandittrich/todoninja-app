<template>
    <div>
        <transition-group tag="div" name="list" class="flex flex-row items-center justify-start flex-wrap -mt-2">
            <div v-for="tag of tags" @click="tagClick(tag.id)" :key="tag.id">
                <transition-group name="list" tag="div" :class="remove ? 'bg-red border-none text-white' : (isActive(tag) ? 'bg-blue-lightest dark:bg-blue-light dark:text-blue-darker font-bold text-blue border-none' : 'text-grey dark:border-grey-darker dark:text-grey-darker')" class="whitespace-no-wrap rounded-full border py-1 px-4 mr-2 mt-2 cursor-pointer select-none flex flex-row items-center transition">
                    <i v-if='remove' key="delete" class="feather icon-trash text-red-lighter"></i>
                    <i v-else-if="!isActive(tag)" key="add" class="feather icon-plus -ml-2 mr-2"></i>
                    <div key="name">{{ tag.name }}</div>
                    <i v-if="isActive(tag)" key="add" class="feather icon-x -mr-2 ml-2"></i>
                </transition-group>
            </div>
            <div v-if="!remove && !hideAddTag" key="add" class="text-blue dark:text-blue-light cursor-pointer select-none flex flex-row items-center ml-2 mt-2 pr-6 flex-no-wrap whitespace-no-wrap" @click="showModal('tags-creator', $event)">
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
import hasModals from '@/mixins/hasModals'
import store from '@/mixins/store'
import _ from 'lodash'

import TagsCreator from '@c/tags/Creator'
import Confirmator from '@c/confirmator'

export default {
    mixins: [
        hasModals({ TagsCreator, Confirmator }),
        store({
            getters: {
                tags_list: 'tags/list',
                getTag: 'tags/get'
            },
        })
    ],
    props: {
        value: Array,
        // Is remove mode
        remove: Boolean,
        hideAddTag: { type: Boolean, default: false },
        activeFirst: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        show_tags_creator: false,
    }),
    methods: {
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
    },
    computed: {
        tags() {
            return this.activeFirst ? _.orderBy(this.tags_list, this.isActive, 'desc') : this.tags_list
        }
    }
}
</script>