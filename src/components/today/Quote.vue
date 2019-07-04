<template>
    <div class="text-center flex flex-col items-center">
        <div class="italic text-2xl relative" style="font-family: 'Lora', serif;">
            {{ quote.text }}
            <div class="absolute top-0 left-0 text-5xl -mt-4 -ml-4 italic text-grey">
                “
            </div>
            <div class="absolute right-0 top-0 text-5xl -mt-4 -mr-4 italic text-grey">
                ”
            </div>
        </div>
        <div class="text-grey-dark font-xs mt-4">
            ~ {{ quote.from }}
        </div>
    </div>
</template>

<script>
import quotes from '@/assets/today/quotes.json'

export default {
    computed: {
        quote() {
            return quotes[moment().dayOfYear() % quotes.length]
        },
    }
}
</script>

<style>

</style>
