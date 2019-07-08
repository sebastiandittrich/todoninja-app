import store from '@/store'

function readable() {
    return {
        yellow: 'dark',
        blue: store.getters['theme/isDark'] ? 'light' : undefined
    }
}

export default {
    color: 'blue',

    getColor() {
        if(this.isInbox()) {
            return store.getters['theme/isDark'] ? 'white' : 'black'
        }

        if(!this.color) {
            return 'blue'
        }

        return this.color
    },

    readableColor() {
        if(typeof readable()[this.getColor()] == 'string') {
            return this.getColor() + '-' + readable()[this.getColor()]
        }

        return this.getColor()
    },

    getIcon() {
        return this.isInbox() ? 'icon-inbox' : (this.icon || 'icon-home')
    },

    isInbox() {
        return this.id === null
    },

    isToday() {
        return this.id == 'today'
    }
}