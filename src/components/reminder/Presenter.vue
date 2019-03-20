<template>
    <div>
        <div class="flex flex-row items-center justify-between cursor-pointer select-none" @click="showDatepicker">
            <div class="flex flex-row items-center justify-between w-full">
                <div class="flex flex-row items-center justify-start">
                    <span class="icon-presenter">
                        <i class="w-8 h-8 rounded-full" :class="value.remindAt ? 'bg-blue-lightest' : ''"></i>
                        <i class="feather text-blue" :class="value.remindAt ? 'icon-bell' : 'icon-plus'"></i>
                    </span>
                    <div class="flex flex-col items-start justify-start ml-2">
                        <div v-if="!value.remindAt" class="font-bold text-sm text-blue">
                            Add Reminder
                        </div>
                        <div class="font-light">
                            {{ value.humanRemindAt() }}
                        </div>
                    </div>
                </div>
                <div class="rounded-full bg-blue px-2 py-1 uppercase tracking-wide text-white font-bold text-xs">beta</div>
            </div>
            <i v-if="value.remindAt" class="feather icon-x text-grey-darker cursor-pointer select-none" @click.stop="remove"></i>
        </div>
        <datepicker @input="$emit('change', $event)" type="datetime" v-model="value.remindAt" :state="modalState('datepicker')" @hide="hideModal('datepicker')"></datepicker>
        <push-modal :state="modalState('push-modal')" @hide="hideModal('push-modal')"></push-modal>
    </div>
</template> 

<style scoped>
    .icon-presenter {
        display: grid;
        grid-template: "icons" auto / auto;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }
    .icon-presenter > i {
        grid-area: icons;
    }
</style>


<script>
import Page from '@/assets/js/Page'
import hasModals from '@/assets/js/traits/hasModals'
import requiresPush from '@/assets/js/traits/requires-push'

export default new Page()
    .use( requiresPush )
    .props({
        value: Object
    })
    .methods({
        remove() {
            this.value.remindAt = null
            this.$emit('change')
        },
        async showDatepicker($event) {
            await this.requirePush()
            this.showModal('datepicker', $event)
        }
    })
    .use( hasModals({ 'datepicker': 'datepicker' }) )
    .vue()
</script>