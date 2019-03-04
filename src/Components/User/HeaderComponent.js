import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";

import "./HeaderComponent.css";

const buttonName = ["Playlists", "Tracks"];

const Header = ({userData, enteredPage, onSaveNamePage}) => {
    const click = (data) => {
        console.log(data);
        onSaveNamePage(data);
    };

    const topath = (data) => {
        console.log("/"+data.toLowerCase());
        return("/"+data.toLowerCase())

    };
    
    const hoverefect = (data) =>{
        if(data === enteredPage) return " hover_efect";
    };

    return(
        <div className = {"header"}>
            {
                buttonName.map((item, index) => {
                    //console.log({...{["item"+index]:item}})
                    return (
                        <Link   to = {topath(item)}
                                className = {"header_button "+hoverefect(item)}
                                onClick = {() => click(item)}
                                key = {index}
                        >
                            {item}
                        </Link>
                    )
                })
            }
            <Link   to = "/profile"
                    onClick = {() => console.log("profile")}
            >
                <img    className = "avatar"
                        src={userData.avatar}
                        onClick = {() => console.log("avatar")}
                        alt="https://img.icons8.com/ios/50/000000/gender-neutral-user.png"
                />
            </Link>
        </div>
    );
};


export default connect(
    (state) => ({
        userData: state.userData,
        enteredPage: state.enteredPage
    }),
    dispatch => ({
        onSaveNamePage: (data) => {
            const payload = data;
            dispatch ({type: 'SAVE_NAME_PAGE', payload})

        }
    })
)(Header);