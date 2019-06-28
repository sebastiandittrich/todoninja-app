<template>
    <modal :state="state" @hide="hide">
        <detail v-bind="$attrs"></detail>
    </modal>
</template>

<script>
import { isModal } from '@/mixins'

import Detail from '@/views/Tasks/Detail'

export default {
    components: { Detail },
    mixins: [ isModal ]
}
</script>

<style>

</style>
