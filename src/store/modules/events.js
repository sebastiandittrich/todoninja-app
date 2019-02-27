import uuid from 'uuid/v4'

export default {
    namespaced: true,
    state: {
      all: []
    },
    getters: {
      list(state) {
        return state.all.filter(event => event.show)
      }
    },
    mutations: {
      add(state, event) {
        event = Object.assign({
          message: '',
          icon: '',
          color: 'blue',
          duration: 5
        }, event, { show: true, id: uuid() })

        state.all.push(event)

        if(event.duration > 0) setTimeout(() => event.show = false, event.duration * 1000)
        return event
      },
    },
    actions: {
      success({ commit }, event) {
        return commit('add', Object.assign({
          message: 'Success!',
          icon: 'feather icon-check',
          color: 'green',
          duration: 2
        }, event))
      },
      error({ commit }, event) {
        return commit('add', Object.assign({
          message: 'Something went wrong.',
          icon: 'feather icon-alert-circle',
          color: 'red',
          duration: 5
        }, event))
      },
    }
  }