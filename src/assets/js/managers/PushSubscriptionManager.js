import EventManager from "./EventManager";
import Pipeline from "../Pipeline";
import Axios from "axios";
import store from '@/store'

export default class PushSubscriptionManager {
    static initialize(vapidPublicKey = 'BEVgPD-nE5y91D9BVik6b4l6ENl49ElA2qamVCi-bMFVkepvUnBdKqNkkYqmlg-pHLHkGVRyjx0W0eZbBsZlxLw') {
        this._vapidPublicKey = vapidPublicKey
        return this.updateState()
    }

    static get state() {
        if(!this._state) {
            this._state = {
                activated: false,
                available: false,
            }
        }
        return this._state
    }
    static set state(state) {
        this._state = state
    }

    static get events() {
        if(!this._events) {
            this._events = new EventManager()
        }
        return this._events
    }

    static urlBase64ToUint8Array(base64String) {
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

    static get vapidPublicKey() {
        return this.urlBase64ToUint8Array(this._vapidPublicKey)
    }

    static activate() {
        if(this.subscription === null && this.state.available) {
            return Pipeline.runThrough([
                () => this.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: this.vapidPublicKey
                }),
                () => this.update(),
            ])
        } else {
            return new Promise((resolve, reject) => {
                if(this.state.available) {
                    reject('already activated')
                } else {
                    reject('not available')
                }
            })
        }
    }

    static deactivate() {
        return Pipeline.runThrough([
            () => this.subscription.unsubscribe(),
            () => this.updateState()
        ])
    }

    static setServiceWorker() {
        if('serviceWorker' in navigator) {
            return Pipeline.runThrough([
                () => navigator.serviceWorker.getRegistration(),
                reg => this.serviceworker = reg ? reg : null,
            ])
        } else {
            this.serviceworker = null
        }
    }

    static setPushManager() {
        if(this.serviceworker && ('pushManager' in this.serviceworker)) {
            this.pushManager = this.serviceworker.pushManager
        } else {
            this.pushManager = null
        }
    }

    static setSubscription() {
        if(this.pushManager) {
            return Pipeline.runThrough([
                () => this.pushManager.getSubscription(),
                sub => this.subscription = sub
            ])
        } else {
            this.subscription = null
        }
    }

    static setState() {
        this.state.available = this.pushManager === null ? false : true
        this.state.activated = this.subscription === null ? false : true
    }

    static updateState() {
        return Pipeline.runThrough([
            () => this.setServiceWorker(),
            () => this.setPushManager(),
            () => this.setSubscription(),
            () => this.setState()
        ]).catch(() => console.log('push not supported'))
    }

    static update() {
        return Pipeline.runThrough([
            () => this.updateState(),
            () => {
                const key = this.subscription.getKey('p256dh')
                const token = this.subscription.getKey('auth')
                const data = {
                    endpoint: this.subscription.endpoint,
                    public_key: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
                    auth_token: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null
                }
                return store.dispatch('push-subscriptions/create', data).catch(() => {
                    this.subscription.unsubscribe()
                })
            },
            () => this.updateState()
        ])
    }
}