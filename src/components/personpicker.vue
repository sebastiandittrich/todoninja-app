<template>
    <modal :state="state" @hide="hide" @after-enter="afterEnter" @before-enter="beforeEnter">

        <headline>For who are you waiting?</headline>

        <div class="mx-8">
            <div class="overflow-x-auto mb-4 -mx-8 pr-8">
                <div class="mx-8 flex flex-row items-center justify-start">
                    <div v-for="person of persons" :key="person" @click="choosePerson(person)" class="rounded-lg p-2 border-2 border-blue-lightest dark:border-blue-darker text-blue dark:text-blue-light font-bold tracking-wide mr-2 whitespace-no-wrap cursor-pointer select-none">
                        {{ person }}
                    </div>
                </div>
            </div>
            <inputt @press-enter="add" placeholder="Or type a name..." type="text" v-model="newperson" ref="inputt"></inputt>
        </div>

        <actions>
            <cancel @click="hide"/>
            <action primary @click="add">Add Person <i class="feather icon-check ml-2"></i> </action>
        </actions>

    </modal>
</template>


<script>
import { isModal } from '@/mixins'

import Inputt from '@c/inputt'

export default {
    components: { Inputt },
    props: {
        value: String,
        default: null
    },
    data: () => ({
        newperson: null,
    }),
    methods: {
        add() {
            this.$emit('input', this.newperson)
            this.newperson = null
            this.hide()
        },
        beforeEnter() {
            this.newperson = this.value
        },
        afterEnter() {
            this.$refs.inputt.focus()
        },
        choosePerson(person) {
            this.$emit('input', person)
            this.hide()
        }
    },
    computed: {
        persons() {
            const names = []
            return this.$store.getters['tasks/find']().data.map(task => task.waiting_for).filter(name => {
                const result = !!name && !names.includes(name)
                if(!names.includes(name)) names.push(name)
                return result
            })
        }
    }
}
</script>
