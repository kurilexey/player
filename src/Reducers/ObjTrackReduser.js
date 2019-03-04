const initialState = {};

export default function objTrack (state = initialState, action){
    switch (action.type) {
        case "SAVE_OBJ_TRACK":
            return  {...action.payload};

        default:
            return {...state};
    }
}