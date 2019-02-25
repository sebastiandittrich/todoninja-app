import Pipeline from "../Pipeline";

export default class EventManager {
    constructor() {
        this.events = {}
        this.history = []
    }

    on(name, callback, options = {}) {
        if(!this.events[name]) {
            this.events[name] = []
        }
        var id = 0
        while(this.events[name].filter(function(element) {
            return element.id === id
        }).length > 0) {
            id++
        }
        this.events[name].push({
            id: id,
            callback: callback,
            once: options.once === true ? true : false
        })

        if(options.now == true) {
            callback()
        }

        return id
    }

    trigger(name) {
        this.history.push(name)
        if(this.events[name]) {
            Pipeline.iterate(this.events[name], func => {
                func.callback()
                if(func.once === true) {
                    this.deregister(name, func.id)
                }
            })
        }
    }

    deregister(name, id) {
        if(!this.events.hasOwnProperty(name)) {
            return false
        }

        for(var element of this.events[name].filter(function(element) {
            return element.id === id
        })) {
            this.events[name].splice(this.events[name].indexOf(element), 1)
        }
    }

    onIf(name, callback, options = {}) {
        if(this.history.includes(name)) {
            callback()
        } else {
            Object.assign(options, {once: true})
            this.on(name, callback, options)
        }
    }
}