<template>
    <modal :state="state" @hide="hide">

            <headline>More options</headline>

            <div class="mx-4">
                <list></list>
            </div>

            <actions>
                
            </actions>

    </modal>
</template>

<script>
import { isModal } from '@/mixins'

import List from './List'

export default {
    components: { List },
    mixins: [ isModal ]
}
</script>
