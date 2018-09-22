<template>
    <div>
        <bg :show="show" @hide="hide">

            <headline>Choose state</headline>

            <div class="mx-8">
                <div class="text-lg flex flex-col items-stretch">
                    <div class="rounded-lg px-4 py-2 flex flex-row items-center justify-start cursor-pointer text-blue font-black">
                        <i class="mi mi-Lightbulb mr-4"></i>
                        Do
                    </div>
                    <div class="rounded-lg px-4 py-2 flex flex-row items-center justify-start cursor-pointer font-light text-grey-darker">
                        <i class="mi mi-Upload mi-rotate-90 mr-4"></i>
                        Postponed
                    </div>
                    <div class="rounded-lg px-4 py-2 flex flex-row items-center justify-start cursor-pointer font-light text-grey-darker">
                        <i class="mi mi-Calendar mr-4"></i>
                        Calendar
                    </div>
                    <div class="rounded-lg px-4 py-2 flex flex-row items-center justify-start cursor-pointer font-light text-grey-darker">
                        <i class="mi mi-DevUpdate mr-4"></i>
                        Waiting
                    </div>
                </div>
            </div>

            <actions>
                <cancel @click="hide"/>
            </actions>

        </bg>
    </div>
</template>

<script>
import Modal from '@/assets/js/Modal'

export default new Modal()
    .props()
    .vue()
</script>