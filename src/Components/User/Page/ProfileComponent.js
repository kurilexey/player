import React from 'react';
import {connect} from 'react-redux';

import HeaderComponent from "../HeaderComponent";
import "./ProfileComponent.css";

const ProfileComponent = ({userData, }) => {
    return(
        <div className="app">
            <div className = "profile_window">
                User profile:
                <img src={userData.avatar} alt="https://img.icons8.com/ios/50/000000/gender-neutral-user.png"/>
                <div className="data_string">name: <section> {userData.name}</section></div>
                <div className="data_string">email: <section> {userData.email}</section></div>
            </div>
        </div>
    );
};


export default connect(
    (state) => ({
        userData: state.userData
    }),
    dispatch => ({
        // onSaveUserData: (data) => {
        //     const payload = data;
        //     dispatch ({type: 'SAVE_USER_DATA', payload})
        //
        // }
    })
)(ProfileComponent);