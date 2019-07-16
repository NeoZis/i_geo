export default {
    SAVE_PLACE(state, place){
        place.id = state.id;
        state.place.push(place)
        state.id++;
    },
    CLEAR(state){
        state.place = [];
        state.id = 1;
    }
}
