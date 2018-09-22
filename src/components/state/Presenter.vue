<template>
    <div>
        <div class="flex flex-row items-center justify-start" @click="showModal('state-picker', $event)">
            <span class="mi-stack">
                <i class="mi mi-CircleFill text-blue mi-stack-2x"></i>
                <i class="mi mi-Upload text-white mi-rotate-90 mi-stack-1x"></i>
            </span>
            <div class="flex flex-col items-start justify-start ml-2">
                <div class="font-bold text-sm">
                    Verschoben
                </div>
                <div class="font-light text-lg">
                    24. September 2018
                </div>
            </div>
        </div>
        <state-picker v-model="value" :state="modalState('state-picker')" @hide="hideModal('state-picker')"/>
    </div>
</template> 

<script>
import Page from '@/assets/js/Page'
import hasModals from '@/assets/js/traits/hasModals'

export default new Page()
    .props('value')
    .use( hasModals({ 'state-picker': 'state/Picker' }) )
    .vue()
</script>