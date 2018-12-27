import merge from 'deepmerge';

export const state = {
  currentFilter: {},
}

export const getters = {
  filteredFind(state, getters) {
    return function(filter = {}) {
      let fullFilter = merge(state.currentFilter, filter)
      const $functions = fullFilter.query.$functions || []
      delete fullFilter.query.$functions
      delete fullFilter.$meta
      const data = getters['find'](fullFilter)

      for(let $function of $functions) {
        if(typeof $function == 'function') {
          data.data = data.data.filter($function)
        }
      }
      data.total = data.data.length
      return data
    }
  }
}

export const mutations = {
  mergeCurrentFilter(state, payload) {
    state.currentFilter = merge(state.currentFilter, payload, { arrayMerge: (destination, source) => source })
  },
  removeCurrentFilter(state, { path } = {}) {
    if(path != undefined) {
      path = path.split('.')
      const last = path.pop()
      let current = state.currentFilter

      for(const breadcrumb of path) {
        if(typeof current[breadcrumb] != 'object') {
          Vue.set(current, breadcrumb, {})
        }

        current = current[breadcrumb]
      }

      Vue.delete(current, last)
    } else {
      state.currentFilter = {}
    }
  },
  setCurrentFilter(state, { path, value }) {
    if(path != undefined) {
      path = path.split('.')
      const last = path.pop()
      let current = state.currentFilter

      for(const breadcrumb of path) {
        if(typeof current[breadcrumb] != 'object') {
          Vue.set(current, breadcrumb, {})
        }

        current = current[breadcrumb]
      }

      Vue.set(current, last, value)
    } else {
      state.currentFilter = value
    }
  },
  addCurrentFilterFunction(state, $function) {
    if(!state.currentFilter.query) {
      Vue.set(state.currentFilter, 'query', {})
    }
    if(!Array.isArray(state.currentFilter.query.$functions)) {
      Vue.set(state.currentFilter.query, '$functions', [])
    }
    state.currentFilter.query.$functions.push($function)
  },
  removeCurrentFilterFunction(state, $function) {
    state.$functions.splice(state.$functions.indexOf($function), 1)
  }
}

export const actions = {
  async findAll({ dispatch }, options = {}) {
    options = Object.assign({
      $limit: 10,
      $skip: 0,
    }, options)

    const countquery = await dispatch('find', { query: { ...options, $limit: 0 } })
    const total = countquery.total

    for(options.$skip; options.$skip < total; options.$skip = options.$skip + options.$limit) {
      await dispatch('find', { query: { ...options } })
    }
  }
}