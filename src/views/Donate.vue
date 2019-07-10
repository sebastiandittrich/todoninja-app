<template>
    <transition name="opacity-slide-up">
        <div class="bg-grey-lighter overflow-auto">

            <div class="pb-32" style="background: linear-gradient(-45deg, rgb(39, 121, 189), rgb(70, 84, 124))">
                <topbar class="text-white"></topbar>
                <div class="p-8 pb-16">
                    <transition name="opacity-slide-down" appear>
                        <div class="text-4xl font-bold text-white text-center mt-8 wait-1">Support Todoninja</div>
                    </transition>
                    <transition name="opacity-slide-down" appear>
                        <div class="text-xl font-bold text-blue-lighter text-center mt-4 wait-2">Choose how much it is worth to you.</div>
                    </transition>
                </div>
            </div>

            <div class="flex flex-col md:flex-row items-center justify-center -mt-32 mx-4 mb-8">

                <transition name="opacity-slide-up" appear>
                    <div ref="ninja" class="shadow-2xl overflow-hidden bg-white rounded-lg md:rounded-r-none mx-6 md:mx-0 wait-3">
                        <div class="pt-8 pb-10 px-10">
                            <h4 class="text-blue uppercase text-xl tracking-wide mb-3 font-bold">Ninja</h4>
                            <p class="mb-4">
                                <sup class="font-light text-grey-dark text-3xl">€</sup>
                                <span class="font-light text-blue-darkest text-5xl">1.79</span>
                            </p>
                            <ul class="leading-normal text-grey-darkest">
                                <li class="flex items-center py-2">
                                    <i class="feather icon-dollar-sign text-blue mr-2"></i>
                                    Buy a coffee for the developer!
                                </li>
                                <li class="flex items-center py-2">
                                    <i class="feather icon-bell-off text-blue mr-2"></i>
                                    Get rid of the donate promt
                                </li>
                            </ul>
                        </div>
                        <div class="cursor-pointer select-none p-6 flex flex-row items-center justify-center bg-grey-lighter hover:bg-grey-lightest text-center text-blue uppercase tracking-wide font-bold">
                            Donate
                            <i class="feather icon-chevron-right ml-2"></i>
                        </div>
                    </div>
                </transition>

                <transition name="opacity-slide-up" appear>
                    <div class="shadow-2xl overflow-hidden bg-white rounded-lg mt-8 md:mt-0 wait-4">
                        <div class="pt-8 pb-10 px-10">
                            <h4 class="text-blue uppercase text-xl tracking-wide mb-3 font-bold">Samurai</h4>
                            <p class="mb-4">
                                <sup class="font-light text-grey-dark text-3xl">€</sup>
                                <span class="font-light text-blue-darkest text-5xl">1.79</span>
                                <span class="font-light text-grey-dark text-2xl">/ month</span>
                            </p>
                            <ul class="leading-normal text-grey-darkest">
                                <li class="flex items-center py-2">
                                    <i class="feather icon-dollar-sign text-blue mr-2"></i>
                                    <div>
                                        Buy a coffee for the developer <span class="font-bold">monthly!</span>
                                    </div>
                                </li>
                                <li class="flex items-center py-2">
                                    <i class="feather icon-bell-off text-blue mr-2"></i>
                                    Get rid of the donate promt
                                </li>
                                <li class="flex items-center py-2">
                                    <i class="feather icon-x-circle text-blue mr-2"></i>
                                    No more "donate" button on the home page
                                </li>
                                <li class="flex items-center py-2">
                                    <i class="feather icon-mail text-blue mr-2"></i>
                                    Email support
                                </li>
                            </ul>
                        </div>
                        <div ref="samurai" class="cursor-pointer select-none p-8 flex flex-row items-center justify-center bg-blue hover:bg-blue-darker text-center text-white uppercase tracking-wide font-bold">
                            Donate
                            <i class="feather icon-chevron-right ml-2"></i>
                        </div>
                    </div>
                </transition>

            </div>

        </div>
    </transition>
</template>

<style scoped>
 [class*="wait-"] {
     transition-duration: 0.5s;
 }
 .wait-1 { transition-delay: 0.2s; }
 .wait-2 { transition-delay: 0.3s; }
 .wait-3 { transition-delay: 1.3s; }
 .wait-4 { transition-delay: 1.5s; }

 .avatar-img {
     box-shadow: 0 0 0 0.75rem #faad63, 0 0 0 1.5rem #fcd9b6, 0 0 0 2.25rem #fff5eb;
 }
</style>


<script>
import { themeColor } from '@/mixins'

import Topbar from '@c/Topbar'

export default {
    components: { Topbar },
    mixins: [ themeColor('blue') ],
    methods: {
        async checkoutNinja() {
            await this.$store.dispatch('stripe/redirectToCheckout', { 
                submitType: 'donate',
                items: [
                    {
                        sku: 'sku_FOsgR6BmeEb7Cj',
                        quantity: 1
                    }
                ],
            })
        },
        async checkoutSamurai() {
            await this.$store.dispatch('stripe/redirectToCheckout', { 
                submitType: 'donate',
                items: [
                    {
                        plan: 'plan_FOsoJANNPTvJCs',
                        quantity: 1
                    }
                ],
            })
        },   
    },
}
</script>