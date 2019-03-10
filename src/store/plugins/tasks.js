import { service } from '@/store/feathers-vuex'
import Task from '@/assets/js/Models/Task'
import extend from '@/store/extend'
import * as findAll from '@/store/extensions/find-all'
import * as filteredFind from '@/store/extensions/filtered-find'

export default service('tasks', extend(
    findAll, 
    filteredFind, 
    { 
        instanceDefaults: Task,
    }
))