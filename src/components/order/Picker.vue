<template>
    <div class="">
        <div v-for="property of properties" :key="property.written_name" @click="propertyClick(property)" class="rounded-lg px-4 py-2 flex flex-row items-center justify-start cursor-pointer select-none whitespace-no-wrap" :class="orderBy.properties.includes(property.name) ? 'text-blue dark:text-blue-light font-black' : 'font-light'">
            <span class="mr-2" :class="getIndex(property) < 0 ? 'opacity-0' : ''">{{ getIndex(property) >= 0 ? getIndex(property) + 1 + '.' : '0.' }}</span>
            {{ property.written_name }}
        </div>
    </div>
</template>

<script>
import State from '@/assets/js/State'
import OrderBy from '@/assets/js/OrderBy'

export default {
    props: {
        orderBy: Object
    },
    data: () => ({
        properties: OrderBy
    }),
    methods: {
        propertyClick(property) {
            const index = this.getIndex(property)

            if(index < 0) {
                this.orderBy.properties.push(property.name)
                this.orderBy.directions.push(property.direction)
            } else {
                this.orderBy.properties.splice(index, 1)
                this.orderBy.directions.splice(index, 1)
            }
        },
        getIndex(property) {
            return this.orderBy.properties.indexOf(property.name)
        }
    },
}
</script>

<style>

</style>
