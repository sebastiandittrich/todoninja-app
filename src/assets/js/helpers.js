import { theme } from '@/../tailwind.config.js'
import store from '@/store'
const { colors } = theme

export function dependsOnTheme({ dark, light }) {
    return store.getters['theme/isDark'] ? dark : light
}

export function singleColor(color) {
    if(colors[color] != undefined) {
        return colors[color]
    }
    return color
}

export function color(value) {
    return typeof value == 'string' ? singleColor(value) : singleColor(dependsOnTheme(value))
}

export default {
    color,
}