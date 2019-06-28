const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
    variants: {
        backgroundColor: [ "responsive", "hover", "focus", "active", "dark" ],
        borderColor: ['responsive', 'hover', 'focus', 'dark'],
        borderStyle: ['responsive', 'dark'],
        textColor: ['responsive', 'hover', 'focus', 'dark'],
        boxShadow: ['responsive', 'hover', 'focus', 'dark'],
        opacity: ['responsive', 'dark'],
        container: [ "responsive" ],
        height: [ "responsive", "group-hover" ],
        margin: [ "responsive", "focus", 'dark' ],
        padding: [ "responsive", "focus", 'dark' ],
        width: [ "responsive", "group-hover" ],
    },
    theme: {
        extend: {
            width: {
                "0": "0px",
                "2/6": "33.33333%",
                "4/6": "66.66667%",
            },
            height: {
                '2/3': '66.6666667%'
            },
            fontSize: {
                "gigantic": "6rem",
            },
            margin: {
                "1/2": "50%",
            },
            maxHeight: {
                "2/3": "66.6%",
                "2xl": "70rem",
                "3xl": "80rem",
                "4xl": "90rem",
                "5xl": "100rem",
                "lg": "50rem",
                "md": "40rem",
                "sm": "30rem",
                "xl": "60rem",
                "xs": "20rem"
            },
            maxWidth: {
                "2/3": "66.6%"
            },
            borderWidth: {
                '3': '3px',
            }
        },
        colors: {
            transparent: 'transparent',

            'black-deep': '#000000',
            black: '#22292f',
            'grey-darkest': '#3d4852',
            'grey-darker': '#606f7b',
            'grey-dark': '#8795a1',
            grey: '#b8c2cc',
            'grey-light': '#dae1e7',
            'grey-lighter': '#f1f5f8',
            'grey-lightest': '#f8fafc',
            white: '#ffffff',
          
            'red-darkest': '#3b0d0c',
            'red-darker': '#621b18',
            'red-dark': '#cc1f1a',
            red: '#e3342f',
            'red-light': '#ef5753',
            'red-lighter': '#f9acaa',
            'red-lightest': '#fcebea',
          
            'orange-darkest': '#462a16',
            'orange-darker': '#613b1f',
            'orange-dark': '#de751f',
            orange: '#f6993f',
            'orange-light': '#faad63',
            'orange-lighter': '#fcd9b6',
            'orange-lightest': '#fff5eb',
          
            'yellow-darkest': '#453411',
            'yellow-darker': '#684f1d',
            'yellow-dark': '#f2d024',
            yellow: '#ffed4a',
            'yellow-light': '#fff382',
            'yellow-lighter': '#fff9c2',
            'yellow-lightest': '#fcfbeb',
          
            'green-darkest': '#0f2f21',
            'green-darker': '#1a4731',
            'green-dark': '#1f9d55',
            green: '#38c172',
            'green-light': '#51d88a',
            'green-lighter': '#a2f5bf',
            'green-lightest': '#e3fcec',
          
            'teal-darkest': '#0d3331',
            'teal-darker': '#20504f',
            'teal-dark': '#38a89d',
            teal: '#4dc0b5',
            'teal-light': '#64d5ca',
            'teal-lighter': '#a0f0ed',
            'teal-lightest': '#e8fffe',
          
            'blue-darkest': '#12283a',
            'blue-darker': '#1c3d5a',
            'blue-dark': '#2779bd',
            // #45547c
            blue: 'hsl(224, 28%, 38%)',
            'blue-light': '#6cb2eb',
            'blue-lighter': '#bcdefa',
            'blue-lightest': 'hsl(224, 15%, 90%)',
          
            'indigo-darkest': '#191e38',
            'indigo-darker': '#2f365f',
            'indigo-dark': '#5661b3',
            indigo: '#6574cd',
            'indigo-light': '#7886d7',
            'indigo-lighter': '#b2b7ff',
            'indigo-lightest': '#e6e8ff',
          
            'purple-darkest': '#21183c',
            'purple-darker': '#382b5f',
            'purple-dark': '#794acf',
            purple: '#9561e2',
            'purple-light': '#a779e9',
            'purple-lighter': '#d6bbfc',
            'purple-lightest': '#f3ebff',
          
            'pink-darkest': '#451225',
            'pink-darker': '#6f213f',
            'pink-dark': '#eb5286',
            pink: '#f66d9b',
            'pink-light': '#fa7ea8',
            'pink-lighter': '#ffbbca',
            'pink-lightest': '#ffebef',
        },
    },
    plugins: [
        function({ addVariant, e }) {
            addVariant('dark', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `#app.dark .${e(`dark${separator}${className}`)}`
                })
            })
        },
        function({ addUtilities }) {
            addUtilities({ 
                '.justify-items-center': { 'justify-items': 'center' }, 
                '.justify-items-stretch': { 'justify-items': 'stretch' }, 
            }, [ 'responsive' ])
        }
    ]
}

//  "experiments": {
//     "shadowLookup": true
// },