import { service } from '@/store/feathers-vuex'
import Task from '@/assets/js/Models/Task'
import extend from '@/store/extend'
import * as findAll from '@/store/extensions/find-all'
import * as filteredFind from '@/store/extensions/filtered-find'
import merge from 'deepmerge'

const todayQuery = { 
    $or: [
        { today: { $ne: null }, doneAt: null },
        { doneAt: { $gte: moment().startOf('day') }  }
    ]
}

export default service('tasks', extend(
    findAll, 
    { 
        instanceDefaults: Task,
        getters: {
            currentFind(state, getters, rootState, rootGetters) {
                return (query, ...args) => getters['find'](merge(query || {}, { query: { workspaceId: rootGetters['workspaces/current'].id } }), ...args)
            },
            today(state, getters) {
                return getters['find']({ query: todayQuery })
            }
        },
        actions: {
            today({ dispatch }) {
                return dispatch('findAll', todayQuery)
            }
        }
    }
))