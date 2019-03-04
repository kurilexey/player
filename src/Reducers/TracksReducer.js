const initialState = [];

export default function tracks (state = initialState, action){
    switch (action.type) {
        case "SAVE_TRACK_LIST_NAME":
            return  [...state, action.payload];

        default:
            return state;
    }
}
