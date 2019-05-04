<template>
    <transition name="opacity">
        <div class="px-8 bg-theme-gradient flex flex-col items-center justify-center h-full">

            <div class="text-white font-bold text-gigantic">404</div>
            <div class="font-light text-white mt-8">
                This is not the Page you are searching for...
            </div>
            <router-link to="/" class="mt-16 button bg-white"><i class="feather icon-home mr-2"></i> Take me Home</router-link>

        </div>
  </transition>
</template>

<script>
export default {
  
}
</script>
