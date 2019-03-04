const initialState = false;

export default function desireToAddPlaylist (state = initialState, action){
    switch (action.type) {
        case "TO_ADD_PLAYLIST" :
            return action.payload;

        case "DO_NOT_ADD_PLAYLIST" :
            return action.payload;

        default:
            return state;
    }
}

