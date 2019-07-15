export default {
    SAVE_PLACE(state, place){
        state.place.push(place)
    },
    CLEAR(state){
        state.place = [];
    }
}
