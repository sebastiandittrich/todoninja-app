import VuexPersistence from 'vuex-persist'

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
    }
  })
})