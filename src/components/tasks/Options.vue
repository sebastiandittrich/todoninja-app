<template>
    <modal :state="state" @hide="hide" positioned>
        <headline>
            Options
        </headline>

        <div class="mx-8 whitespace-no-wrap">
            <div class="text-red-dark dark:text-red-light cursor-pointer select-none" @click="showModal('confirmator')">
                <i class="feather icon-trash"></i> Delete Task
            </div>
        </div>

        <actions>
            <!-- <cancel @click="hide"></cancel> -->
        </actions>
        <div slot="submodals">
            <confirmator @confirm="remove" @hide="hideModal('confirmator')" :state="modalState('confirmator')" title="Delete Task">
                Are you sure you want to remove this Task? This can <span class="font-bold">not</span> be undone!

                <div slot="confirm" class="button-red">Delete</div>
            </confirmator>
        </div>
    </modal>
</template>

<script>
import isModal from '@/mixins/isModal'
import hasModals from '@/mixins/hasModals'

import Confirmator from '@c/confirmator'

export default {
    mixins: [ isModal, hasModals({ Confirmator }) ],
    props: {
        task: Object
    },
    methods: {
        async remove() {
            await this.task.remove()
            this.$emit('delete')
            this.$emit('hide')
            this.$store.dispatch('events/success', { message: 'Task deleted', color: 'orange' })
        }
    }
}
</script>