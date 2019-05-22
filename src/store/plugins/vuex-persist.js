import VuexPersistence from 'vuex-persist'

export const persisted = [ 'workspaces', 'theme', 'push', 'tutorial' ]

export default new VuexPersistence({
  reducer: state => ({ 
    workspaces: { 
      currentId: state.workspaces.currentId 
    }, 
    push: { 
      dontask: state.push.dontask 
    },
    tutorial: {
      done: state.tutorial.done,
      step: state.tutorial.step
    },
    theme: {
      dark: state.theme.dark
    }
  })
})