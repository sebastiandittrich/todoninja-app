<template>
    <modal :state="state" @hide="hide">

        <headline color="red">{{ title }}</headline>

        <div class="mx-8">
            <slot></slot>
        </div>

        <actions>
            <cancel @click="hide"/>
            <div @click="$emit('confirm', state.data); hide()" class="cursor-pointer select-none">
                <slot name="confirm">
                    <action @click="$emit('confirm', state.data); hide()">{{ confirmtext }}</action>
                </slot>
            </div>
        </actions>

    </modal>
</template>

<script>
import { isModal } from '@/mixins'

export default {
    mixins: [ isModal ],
    props: {
        title: {
            type: String,
            default: 'Confirm your action'
        },
        confirmtext: {
            type: String,
            default: 'Confirm'
        }
    }
}
</script>