<template>
    <transition-group tag="div" name="list" class="flex-col items-stretch">
        <div v-for="week of value" :key="week.number" class="flex flex-row items-center p-4">
            <progress-circle :basecolor="week.color" :completed="week.relation >= 1" :data="week.data" :total="{ name: 'Created', value: week.total }" :radius="50" :stroke="8"></progress-circle>
            <div class="ml-4">
                <div class="font-bold text-black dark:text-white">
                    {{ week.from.format('wo') }} week
                </div>
                <div class="text-grey-dark">
                    {{ week.data[0].value }} done / {{ week.total }} created
                </div>
            </div>
        </div>
    </transition-group>
</template>

<script>
import ProgressCircle from "@c/progress/Circle";

export default {
    components: { ProgressCircle },
    props: {
        value: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style>

</style>
