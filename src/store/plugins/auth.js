import { auth } from '@/store/feathers-vuex'

export default auth({ userService: 'users' })