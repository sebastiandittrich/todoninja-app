import { service } from '@/store/feathers-vuex'
import * as findAll from '@/store/extensions/find-all'

export default service('tags', { 
    actions: { 
        ...findAll.actions
    }
})