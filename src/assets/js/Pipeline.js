export default class Pipeline {
    constructor() {
        this.beforeMainAppStart = []
        this.afterMainAppStart = []
        this.withMainApp = []
        this.mainAppModel = null
        this.mainApp = null
        this.managerClasses = []
        this.managers = {}
        this.functions = {}
    }

    manager(manager) {
        if(typeof(manager) == 'object') {
            this.managerClasses = this.managerClasses.concat(manager)
        } else {
            this.managerClasses.push(manager)
        }
    }

    function(functions) {
        Object.assign(this.functions, functions)
    }

    before(action) {
        if(typeof(action) == 'object') {
            this.beforeMainAppStart = this.beforeMainAppStart.concat(action)
        } else {
            this.beforeMainAppStart.push(action)
        }
    }
    
    after(action) {
        if(typeof(action) == 'object') {
            this.afterMainAppStart = this.afterMainAppStart.concat(action)
        } else {
            this.afterMainAppStart.push(action)
        }
    }

    withApp(action) {
        if(typeof(action) == 'object') {
            this.withMainApp = this.withMainApp.concat(action)
        } else {
            this.withMainApp.push(action)
        }
    }

    app(mainApp) {
        this.mainAppModel = mainApp
    }

    start() {
        this.runThrough([
            () => this.registerFunctions(),
            () => this.runThrough(this.beforeMainAppStart),
            () => this.startManagers(),
            () => this.connectManagersToApp(),
            () => this.startMainApp(),
            () => this.runThrough(this.afterMainAppStart)
        ]).then(() => {
            this.mainApp.initialized = true
        })
    }

    registerFunctions() {
        for(var key in this.functions) {
            if(this.functions.hasOwnProperty(key)) {
                window[key] = this.functions[key]
            }
        }
    }

    connectManagersToApp() {
        for(var key in this.managers) {
            this.mainAppModel.data[key] = this.managers[key]
        }
    }

    startManagers() {
        for(var manager of this.managerClasses) {
            var instance = new manager(this)
            this.managers[instance.constructor.name] = instance
        }
    }

    startMainApp() {
        return new Promise((resolve, reject) => {
            var self = this
            this.mainAppModel.data.initialized = false,
            this.mainAppModel.mounted = function() {
                self.runThrough(self.withMainApp, {
                    arguments: [this]
                }).then(resolve)
            }
            console.log('starting Main App')
            this.mainApp = new Vue(this.mainAppModel)
        })
    }

    static runThrough(...args) {
        return new Pipeline().runThrough(...args)
    }

    runThrough(jobs, options = {}) {
        if(options === undefined || options.resolve === undefined) {
            return new Promise((resolve, reject) => {
                this.runThrough(jobs.concat([]), Object.assign(options, {
                    resolve: resolve, 
                    reject: reject,
                    lastargs: options.lastargs || []
                }))
            })
        } else if(jobs.length < 1) {
            options.resolve(...options.lastargs)
        } else {
            var job = jobs.shift()
            var args = options.arguments ? options.arguments.concat(options.lastargs) : options.lastargs
            var ret = job(...args)
            if(ret && typeof(ret.then) == 'function') {
                ret.then((...args) => {
                    options.lastargs = args
                    this.runThrough(jobs, options)
                }).catch(options.reject)
            } else {
                options.lastargs = [ret]
                this.runThrough(jobs, options)
            }
        }
    }

    runParallel(jobs) {
        return new Promise(resolve => {
            var length = jobs.length
            var completed = 0
            for(var job of jobs) {
                var ret = job()
                if(ret && ret.then) {
                    ret.then(() => {
                        completed++
                        if(completed >= length) {
                            resolve()
                        }
                    })
                } else {
                    completed++
                    if(completed >= length) {
                        resolve()
                    }
                }
            }
        })
    }

    static _iterate(resolve, array, action, allreturns = []) {
        if(array.length < 1) {
            return resolve(allreturns)
        }
        var element = array.shift()
        if(typeof action == 'function') {
            action = [action]
        }
        return this.runThrough(action.concat([]), {arguments: [element]}).then(value => this._iterate(resolve, array, action, allreturns.concat([value])))
    }

    iterate(...args) {
        return this.constructor.iterate(...args)
    }

    static iterate(...args) {
        return new Promise(resolve => {
            // Check if is Array or Object
            if(!Array.isArray(args[0])) {
                var newarg = []
                for(var key in args[0]) {
                    if(args[0].hasOwnProperty(key)) {
                        newarg.push(args[0][key])
                    }
                }
                args[0] = newarg
            }
            // Clone Array
            args[0] = args[0].concat([])
            this._iterate(resolve, ...args)
        })
    }

    callApp(name, ...args) {
        if(typeof this.mainApp[name] == 'function') {
            return this.mainApp[name](...args)
        } else {
            console.log('Method "' + name + '" does not exist')
            return null
        }
    }

    callEvents(events, name, ...args) {
        var current = events
        for(var path of name.split('.')) {
            if(typeof current[path] != 'object') {
                return false
            }
            current = current[path]
        }
        if(typeof current != 'object') {
            current = [current]
        }
        console.log(current)
        return this.runThrough(current, {arguments: [this.managers[name.split('.')[0]]].concat(args)})
    }

    trigger(name, ...args) {
        this.callEvents(this.mainApp.on(), name, ...args)
        this.iterate(this.managers, manager => {
            manager.on ? this.callEvents(manager.on(), name, ...args) : null
        })
    }
}

