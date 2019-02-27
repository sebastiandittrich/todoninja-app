export default {
    namespaced: true,
    state: {
        subscription: null,
        pushManager: null,
        available: false,
        activated: false,
        vapidPublicKey: 'BEVgPD-nE5y91D9BVik6b4l6ENl49ElA2qamVCi-bMFVkepvUnBdKqNkkYqmlg-pHLHkGVRyjx0W0eZbBsZlxLw'
    },
    getters: {
        vapidPublicKey(state) {
            function urlBase64ToUint8Array(base64String) {
                const padding = '='.repeat((4 - base64String.length % 4) % 4);
                const base64 = (base64String + padding)
                    .replace(/\-/g, '+')
                    .replace(/_/g, '/')
                const rawData = window.atob(base64)
                const outputArray = new Uint8Array(rawData.length)
                for (let i = 0; i < rawData.length; ++i) {
                   outputArray[i] = rawData.charCodeAt(i)
                }
                return outputArray
            }
            return urlBase64ToUint8Array(state.vapidPublicKey)
        }
    },
    mutations: {
        setSubscription(state, subscription) {
            state.subscription = subscription
        },
        setPushManager(state, manager) {
            state.pushManager = manager
        },
        setAvailable(state, available) {
            state.available = available
            if(available == false) state.activated = false
        },
        setActivated(state, activated) {
            state.activated = activated
        },
    },
    actions: {
    
        async sendToServer({ dispatch, state }) {
            await dispatch('initialize')
            const key = state.subscription.getKey('p256dh')
            const token = state.subscription.getKey('auth')
            const data = {
                endpoint: state.subscription.endpoint,
                public_key: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
                auth_token: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null
            }
            await dispatch('push-subscriptions/create', data, { root: true }).catch(() => {
                state.subscription.unsubscribe()
            })
        },
    
        async deactivate({ dispatch, state }) {
            await state.subscription.unsubscribe()
            dispatch('initialize')
        },
    
        async activate({ dispatch, state, getters }) {
            if(state.subscription === null && state.available) {
                await state.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: getters.vapidPublicKey
                })
                await dispatch('sendToServer')
                await dispatch('initialize')
            }
            
        },
    
        async initialize({ commit }) {
            if( ! ('serviceWorker' in navigator) ) {
                commit('setAvailable', false)
                return false
            }
            const serviceworker = await navigator.serviceWorker.getRegistration()

            if(! 'pushManager' in serviceworker) {
                commit('setAvailable', false)
                return false
            }
            commit('setPushManager', serviceworker.pushManager)
            const subscription = await serviceworker.pushManager.getSubscription()
            commit('setAvailable', true)

            if(subscription) {
                commit('setSubscription', subscription)
                commit('setActivated', true)
            } else {
                commit('setActivated', false)
            }
        }
    }
}