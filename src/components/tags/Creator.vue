<template>
    <div>
        <bg :show="show" @hide="hide">

            <headline>New tag</headline>

            <div class="mx-8">
                <inputt placeholder="Name your tag" type="text" v-model="tag.name"></inputt>
            </div>

            <actions>
                <cancel @click="hide"/>
                <action @click="createClick">Create <i class="mi mi-Add ml-2"></i> </action>
            </actions>

        </bg>
    </div>
</template>

<script>
import Modal from '@/assets/js/Modal'

export default new Modal()
    .with('inputt')
    .data(() => ({
        tag: {
            name: ''
        }
    }))
    .methods({
        async createClick() {
            const created = await this.$store.dispatch('tags/create', this.tag)
            this.tag.name = ''
            this.$emit('created', created)
            this.$emit('hide')
        }
    })
    .vue()
</script>