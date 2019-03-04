import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, withRouter } from 'react-router-dom';
import {connect} from "react-redux";

import User from "./Components/User/UserComponent";
import SignIn from "./Components/SignIn/SignInChromeComponent";


import './App.css';

import firebase from 'firebase';
import {config} from './FireBase/data';
firebase.initializeApp(config);

class App extends Component {
    componentWillMount ( ) {
        this.props.history.push("/sign_in");
        // let imagesRef = firebase.database().ref('/');
        // imagesRef.once('value', function(snapshot) {
        //     console.log(snapshot.val());
        //     let snapshotImages = snapshot.val().userArr;
        //     if (snapshotImages){
        //         for (let key in snapshotImages){
        //             myThis.props.onSaveTrackList(snapshotImages[key]);
        //             //myThis.props.onSavePlayList(snapshotImages[key]);
        //             //myThis.props.onSaveUserData(data);
        //         }
        //     }
        // });
        console.log(this.props);
        // if (this.props.tracks.length === 0){
        //     let imagesRef = firebase.database().ref('/');
        //     imagesRef.once('value', (snapshot) => {
        //         //console.log(snapshot.val());
        //         let snapshotImages = snapshot.val().tracks;
        //         if (snapshotImages){
        //             for (let key in snapshotImages){
        //                 this.props.onSaveTrackList(snapshotImages[key]);
        //                 //myThis.props.onSavePlayList(snapshotImages[key]);
        //                 //myThis.props.onSaveUserData(data);
        //             }
        //         }
        //     });
        // }
    }
    render() {
        return (
            <div className="app">
                <BrowserRouter>
                    <Switch>
                        <Route exact path = '/sign_in' component = {SignIn} />
                        <Route path = '/' component = {User} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default withRouter(connect(
    (state) => ({
        /*tracks: state.tracks*/
    }),
    dispatch => ({
        /*onSaveUserData: (data) => {
            const payload = data;
            dispatch ({type: 'SAVE_USER_DATA', payload})
        },
        onSaveTrackList: (data) => {
            const payload = data;
            dispatch ({type: 'SAVE_TRACK_LIST_NAME', payload})
        },
        onSavePlayList: (data) => {
            const payload = data;
            dispatch ({type: 'SAVE_PLAY_LIST_NAME', payload})
        }*/
    })
)(App));

// import PlayListsComponent from "Components/User/Page/PlayListsComponent";
// import TracksComponent from "Components/User/Page/TracksComponent";
// import ProfileComponent from "Components/User/Page/ProfileComponent";
//

/*<Route  path = '/playlists' component = {PlayListsComponent} />
 <Route  path = '/tracks' component = {TracksComponent} />
 <Route  path = '/profile' component = {ProfileComponent} />*/