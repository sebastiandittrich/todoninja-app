<template>
    <modal :state="state" @hide="hide">

            <headline>Suggestions</headline>

            <div class="mx-4">
                <list></list>
            </div>

            <actions>
                
            </actions>

    </modal>
</template>

<script>
import { isModal } from '@/mixins'

import List from '@c/today/suggestions/List'
import TasksPlaceholder from '@c/tasks/Placeholder'

export default {
    components: { List, TasksPlaceholder },
    mixins: [ isModal ]
}
</script>

<style>

</style>
