<template>
    <modal :state="state" @hide="hide" @after-enter="afterEnter">

            <headline>Search</headline>

            <div class="mx-4">
                <search-bar ref="searchinput"></search-bar>
            </div>

            <actions>
                <cancel @click="hide"/>
            </actions>

        </modal>
</template>

<script>
import Modal from '@/assets/js/Modal'

export default new Modal()
    .with('search/Bar')
    .methods({
        afterEnter() {
            this.$refs.searchinput.focus()
        }
    })
    .vue()
</script>

<style>

</style>
