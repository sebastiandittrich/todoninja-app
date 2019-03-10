import tags from './tags'
import tasks from './tasks'
import workspaces from './workspaces'
import users from './users'
import auth from './auth'
import pushsubscriptions from './push-subscriptions'
import vuexPersist from './vuex-persist'

export default [
    tasks,
    tags,
    workspaces,
    users,
    pushsubscriptions,
    auth,
    vuexPersist.plugin
]