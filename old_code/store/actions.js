export default {
    savePlace({commit}, place){
        commit("SAVE_PLACE", place)
    },
    clearLocStor({commit}){
        commit("CLEAR");
    }
}
