export default {
    color: 'blue',

    getColor() {
        if(!this.color) {
            return 'blue'
        }
        return this.color
    }
}