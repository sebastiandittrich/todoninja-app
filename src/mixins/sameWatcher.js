export default function(keys, value) {
    return {
        watch: {
            ...keys.reduce((watchers, key) => ({ 
                ...watchers, 
                [key]: value
            }))
        }
    }
}