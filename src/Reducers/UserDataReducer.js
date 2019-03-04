const initialState = {};

export default function userData (state = initialState, action){
    switch (action.type) {
        case "CLEAR_USER_DATA":
            return  initialState;

        case "SAVE_USER_DATA":
            return  {...action.payload};
        
        case "ADD_PLAYLIST" :
            state.playlists ? state.playlists = [...state.playlists,{name:action.payload}] : state.playlists = [{name:action.payload}];
            return {...state};

        case "SAVE_PLAY_LIST_NAME" :
            console.log(action.payload);
            //state.playlists.push(action.payload);
            return {...state};

        default:
            return {...state};
    }
}