import VuexPersistence from 'vuex-persist'

export default new VuexPersistence({
  reducer: state => ({ workspaces: { currentId: state.workspaces.currentId } })
})