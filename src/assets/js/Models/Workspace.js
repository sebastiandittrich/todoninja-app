const readable = {
    yellow: 'dark'
}

export default {
    color: 'blue',

    getColor() {
        if(!this.color) {
            return 'blue'
        }
        return this.color
    },

    readableColor() {
        if(typeof readable[this.getColor()] == 'string') {
            return this.getColor() + '-' + readable[this.getColor()]
        }
        return this.getColor()
    }
}