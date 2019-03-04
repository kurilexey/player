import React from 'react';
import {connect} from 'react-redux';

import HeaderComponent from "../HeaderComponent";
import "./TracksComponent.css";
import firebase from 'firebase';


const TracksComponent = ({tracks, objTrack, onSaveTrackList , onSaveUrl}) => {

    const AudioPlayer = (objTrack) => {
        let audio = document.getElementById("player");
        const play = () => {
            audio.play();
        };

        const pause = () => {

        };

        const stop = () => {

        };

        const speedUp = () => {

        };

        const slowDown = () => {

        };

        const normalSpeed = () => {

        };

        return (
            <div>
                <audio className = "player"
                     controls
                     src={objTrack.url}
                     id={"downloadedmp3"}
                     type="audio/mp3"
                     /*autoPlay*/
                 />
                <div  id = "control_panel">
                    <button onClick={() => play()}> Play </button>
                    <button onClick={() => pause()}> Pause </button>
                    <button onClick={() => stop()}>Stop</button>
                    <button onClick={() => speedUp()}>Speed Up</button>
                    <button onClick={() => slowDown()}>Slow Down</button>
                    <button onClick={() => normalSpeed()}>Normal Speed</button>
                </div>
            </div>
        )
    };

    const GetRefStorage = (name) => {
        let storageRef = firebase.storage().ref();
        let ref = firebase.database().ref('/tracks');
        storageRef.child('tracks/'+name).getDownloadURL()
            .then(function(url) {
                let obj = {url:url, name:name};
                onSaveTrackList(obj);
                ref.once('value', function(snapshot) {
                    if (snapshot.val() === null){
                        ref.child("0").set(obj);
                    }else{
                        ref.child(snapshot.val().length).set(obj);
                    }
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    const click = (item) => {
        onSaveUrl(item);
    };

    const upload = (event) => {
        let existence = true;
        let selectedFile = (document.getElementById('input') !== null) ? document.getElementById('input').files[0] : "undefied";
        let storageRef = firebase.storage().ref();
        let trackRef = storageRef.child('tracks/'+selectedFile.name);
        tracks.forEach((item) => {
            if (item === selectedFile.name) existence = false
        });
        if (existence){
            trackRef.put(selectedFile)
                .then(() => {
                    console.log('Uploaded a blob or file!');
                    GetRefStorage(trackRef.name)
                })
        }

    };

    return(
        <div className="app"
             onChange={(event) => upload(event)}
        >

            <div className="tracksComponent">
                <div>TracksComponent</div>
                <input type="file" id="input" multiple/>
                <div>
                    {
                        tracks.map((item, index) => {
                            return (
                                <div    className = "item"
                                        key = {index}
                                        onClick = {() => click(item)}
                                >
                                    {item.name}

                                </div>
                            )
                        })
                    }
                    {AudioPlayer(objTrack)}
                </div>
            </div>

        </div>
    );
};

export default connect(
    (state) => ({
        tracks: state.tracks,
        objTrack : state.objTrack
    }),
    dispatch => ({
        onSaveTrackList: (data) => {
            const payload = data;
            dispatch ({type: 'SAVE_TRACK_LIST_NAME', payload})

        },
        onSaveUrl: (data) => {
            const payload = data;
            dispatch ({type: 'SAVE_OBJ_TRACK', payload})

        }
    })
)(TracksComponent);
