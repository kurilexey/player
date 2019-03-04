import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import {connect} from "react-redux";

import './SignInChromeComponent.css';

import firebase from 'firebase';

class SignIn extends Component {

    usersArr = [];

    onclickfunc = (event) => {
        let MyThis = this;
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithPopup(provider).then(function(result) {
            let user = result.user;
            console.log(user);
            let thereIs = false;
            let ref = firebase.database().ref('/userArr');
            let data = {
                email: user.email,
                name: user.displayName,
                avatar: user.photoURL,
                id: user.providerData[0].uid
                /*playlists: user.playlists*/
            };
            let userRef = firebase.database().ref('/userArr/'+user.providerData[0].uid);
            userRef.once('value', function(snapshot) {
                MyThis.props.onSaveUserData({...snapshot.val(), id: user.providerData[0].uid});
                MyThis.props.history.push("/user");
            });
            ref.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    let childKey = childSnapshot.key;
                    if (childKey === user.providerData[0].uid) thereIs = true;
                });
                if (!thereIs){
                    firebase.database().ref("/userArr/"+user.providerData[0].uid).set({... data});
                }
            });
            MyThis.props.onSaveNamePage("Playlists");

        }).catch(function(error) {
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    };

    render() {
        return (
            <div className="app">
                <div className="button_wrapper">
                    <div className="button"
                         onClick = {this.onclickfunc}
                    >
                        Google SignIn please...

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(
    (state) => ({
        userData: state.userData,
        enteredPage: state.enteredPage
    }),

    dispatch => ({
        onSaveUserData: (data) => {
            const payload = data;
            dispatch ({type: 'SAVE_USER_DATA', payload})
        },
        onSaveNamePage: (data) => {
            const payload = data;
            dispatch ({type: 'SAVE_NAME_PAGE', payload})

        }
    })
)(SignIn));


