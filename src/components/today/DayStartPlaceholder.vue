<template>
    <div key="list" class="flex flex-col items-center justify-start container mx-auto">
        <img src="/img/todaystart.svg" class="w-2/3" >
        <div class="mt-8 font-bold text-xl">
            No Tasks for today.
        </div>
        <div @click="$emit('click', $event)" class="text-blue dark:text-blue-light px-4 py-3 mt-6 font-bold tracking-wide uppercase select-none cursor-pointer">
            <i class="feather icon-compass mr-2"></i> Suggestions
        </div>
    </div>
</template>