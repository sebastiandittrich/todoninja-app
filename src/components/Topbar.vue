<template>
    <div>
        <div class="p-4 px-6 flex flex-row items-center justify-start text-2xl mx-auto container">
            <i @click="$router.back()" class="feather icon-arrow-left cursor-pointer select-none"></i>
            <div class="ml-8">
                <slot></slot>
            </div>
        </div>
    </div>
</template>