import { service } from '@/store/feathers-vuex'
import Workspace from '@/assets/js/Models/Workspace'
import * as findAll from '@/store/extensions/find-all'
import Vue from 'vue'

export default service('workspaces', {
    instanceDefaults: Workspace,
    getters: {
        getStandard() {
            return new Vue.$FeathersVuex.Workspace({ id: null, name: 'Standard', color: 'blue' })
        },
        withStandard(state, getters) {
            return [ getters['getStandard'], ...getters['list'] ]
        },
        getWithStandard(state, getters) {
            return id => getters['get'](id) || getters['getStandard']
        },
        current(state, getters) {
            return getters['getWithStandard'](state.currentId)
        }
    }, 
    actions: {
        ...findAll.actions
    }
})