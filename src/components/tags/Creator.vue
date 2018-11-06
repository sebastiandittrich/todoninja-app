<template>
        <modal :state="state" @hide="hide" @after-enter="afterEnter">

            <headline>New tag</headline>

            <div class="mx-8">
                <inputt @press-enter="createClick" placeholder="Name your tag" type="text" v-model="tag.name" ref="inputt"></inputt>
            </div>

            <actions>
                <cancel @click="hide"/>
                <action @click="createClick">Create <i class="feather icon-check ml-2"></i> </action>
            </actions>

        </modal>
</template>

<script>
import Modal from '@/assets/js/Modal'

export default new Modal()
    .with('inputt')
    .data(() => ({
        tag: {
            name: ''
        },
    }))
    .methods({
        async createClick() {
            const created = await this.$store.dispatch('tags/create', this.tag)
            this.tag.name = ''
            this.$emit('created', created)
            this.$emit('hide')
        },
        afterEnter() {
            this.$refs.inputt.focus()
        }
    })
    .vue()
</script>