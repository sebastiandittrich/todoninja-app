import { theme } from '@/../tailwind.config.js'
const { colors } = theme

export default function(theme) {
    return {
        metaInfo() {
            let values = typeof theme == 'function' ? theme(this) : theme
            let { dark, light } = typeof values == 'object' ? values : { dark: values, light: values }

            if(colors[dark] != undefined) {
                dark = colors[dark]
            }
            if(colors[light] != undefined) {
                light = colors[light]
            }
            
            if(values != undefined) {
                return {
                    meta: [
                        { vmid: 'themeColor', name: 'theme-color', content: (this.$store.getters['theme/isDark'] ? dark : light) }
                    ]
                }
            } else {
                return {}
            }
        }
    }
}