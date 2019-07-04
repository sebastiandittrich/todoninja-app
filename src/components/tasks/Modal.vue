<template>
    <modal :state="state" @hide="hide">

            <headline>{{ headline }}</headline>

            <div class="mx-4">
                <list :tasks="tasks" :filter="filter"></list>
            </div>

            <actions>
                
            </actions>

    </modal>
</template>

<script>
import isModal from '@/mixins/isModal'

import List from './List'

export default {
    mixins: [ isModal ],
    components: { List },
    props: {
        headline: {
            type: String,
            default: 'Tasks'
        },
        tasks: {
            type: Array,
            default: () => []
        },
        filter: {
            type: Boolean,
            default: false,
        }
    },
}
</script>

<style>

</style>
