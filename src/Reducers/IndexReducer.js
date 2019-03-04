import {combineReducers} from 'redux';

import userData from "./UserDataReducer";
import enteredPage from "./EnteredPageReducer";
import tracks from "./TracksReducer";
import objTrack from "./ObjTrackReduser";
import desireToAddPlaylist from "./DesireToAddPlaylistReducer";

export default combineReducers ({
    userData,
    enteredPage,
    tracks,
    objTrack,
    desireToAddPlaylist
})


