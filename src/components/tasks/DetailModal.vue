<template>
    <modal :state="state" @hide="hide">
        <detail ref='detail' v-bind="{ ...$attrs, id: state.data && state.data.id }"></detail>
    </modal>
</template>

<script>
import { isModal } from '@/mixins'

import Detail from '@/views/Tasks/Detail'

export default {
    components: { Detail },
    mixins: [ isModal ],
}
</script>

<style>

</style>
