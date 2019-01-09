<template>
    <modal :state="state" @hide="hide" positioned>
        <headline>
            Options
        </headline>

        <div class="mx-8 whitespace-no-wrap">
            <div class="text-red-dark cursor-pointer" @click="showModal('confirmator')">
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
import Modal from '@/assets/js/Modal'
import hasModals from '@/assets/js/traits/hasModals'

export default new Modal()
    .use( hasModals({ confirmator: 'confirmator' }) )
    .props({
        task: Object
    })
    .methods({
        async remove() {
            await this.task.remove()
            this.$emit('delete')
            this.$emit('hide')
        }
    })
    .vue()
</script>