
import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        paths: ['place', 'id']
    })(store)
  })
}