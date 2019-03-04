import React from 'react';
import {connect} from 'react-redux';

import HeaderComponent from "../HeaderComponent";
import "./PlayListsComponent.css";
import firebase from 'firebase';

const Playlists = ({userData, desireToAddPlaylist, onAddPlayList, onToAddPlayList, onDoNotAddPlayList}) => {
    const ButtonOrAreaComponent = () => {
        console.log(desireToAddPlaylist);
        if (desireToAddPlaylist === false){
            return(
                <div className="dialogWindow">
                    <button className="button "
                            onClick = {()=> clickaddedplaylist()}>
                        Added playlist
                    </button>
                </div>
            )
        }else{
            return (
                <div className="dialogWindow">
                    <input  className ="input"
                            onChange = {(event)=>onchange(event)}/>
                    <div>
                        <button className="button "
                                onClick = {()=> clickcreate()}>
                            Create
                        </button>
                        <button className="button "
                                onClick = {()=> clickcancel()}>
                            Cancel
                        </button>
                    </div>
                </div>
            )
        }
    };

    const PlayListsComponent = () => {
        console.log(userData.playlists);
        if ( userData.playlists !== undefined){
            return (
                <div className="playlists_block">
                    {
                        userData.playlists.map((item, index) => {
                            console.log(item);
                            return (
                                <div    className = "item_playlist"
                                        key = {index}
                                >
                                    {item.name}
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    };

    const onchange = (event) => {
        console.log(event.target.value);
        localStorage["name"] = event.target.value;
    };

    const clickcreate = () => {
        let name = localStorage["name"];
        if (name !== ""){
            localStorage["name"] = "";
            let ref = firebase.database().ref('/userArr/');
            ref.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    let childKey = childSnapshot.key;
                    console.log(childKey);
                    console.log(userData.id);
                    if (childKey === userData.id) {
                        console.log(childKey);
                        if (userData.playlists === undefined){
                            firebase.database().ref("/userArr/"+childKey+"/playlists").child(0).set({name: name});
                        }else{
                            firebase.database().ref("/userArr/"+childKey+"/playlists").child(userData.playlists.length).set({name: name});
                        }
                        onAddPlayList(name);
                    }
                });
            });
        }

        onDoNotAddPlayList(false);
    };

    const clickcancel = () => {
        onDoNotAddPlayList(false);
    };

    const clickaddedplaylist = () => {
        onToAddPlayList(true);
        console.log(desireToAddPlaylist);

    };

    return(
        <div className="app">
            Playlists component
            {PlayListsComponent()}
            {ButtonOrAreaComponent()}
        </div>

    );
};


export default connect(
    (state) => ({
        userData: state.userData,
        desireToAddPlaylist: state.desireToAddPlaylist
    }),
    dispatch => ({
        onAddPlayList: (data) => {
            const payload = data;
            dispatch ({type: 'ADD_PLAYLIST', payload})
        
        },
        onToAddPlayList: (data) => {
            const payload = data;
            dispatch ({type: 'TO_ADD_PLAYLIST', payload})

        },
        onDoNotAddPlayList: (data) => {
            const payload = data;
            dispatch ({type: 'DO_NOT_ADD_PLAYLIST', payload})

        }
    })
)(Playlists);
