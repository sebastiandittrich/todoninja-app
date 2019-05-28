import tags from './tags'
import tasks from './tasks'
import workspaces from './workspaces'
import users from './users'
import auth from './auth'
import pushsubscriptions from './push-subscriptions'
import vuexPersist from './vuex-persist'
import stats from './stats'

export default [
    stats,
    tasks,
    tags,
    workspaces,
    users,
    pushsubscriptions,
    auth,
    vuexPersist.plugin,
]