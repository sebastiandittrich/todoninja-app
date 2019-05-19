import { theme } from '@/../tailwind.config.js'
const { colors } = theme

export default function(theme) {
    return {
        metaInfo() {
            let { dark, light } = typeof theme == 'function' ? theme(this) : theme

            if(colors[dark] != undefined) {
                dark = colors[dark]
            }
            if(colors[light] != undefined) {
                light = colors[light]
            }

            return {
                meta: [
                    { vmid: 'themeColor', name: 'theme-color', content: (this.$store.getters['darkmode/isOn'] ? dark : light) }
                ]
            }
        }
    }
}