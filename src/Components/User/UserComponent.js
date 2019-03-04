import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route, BrowserRouter, Switch, withRouter } from 'react-router-dom';

import Header from "./HeaderComponent";
import Playlists from "./Page/PlayListsComponent";
import TracksComponent from "./Page/TracksComponent";
//import ProfileComponent from "./Page/ProfileComponent";

class User extends Component{
    componentWillMount ( ) {
        this.props.history.push("/playlists");
    };

    render(){
        return(
            <div className="user">
                <Header/>
                User component
                <Switch>
                    <Route  exact path = '/playlists' component = {Playlists} />
                    <Route  path = '/tracks' component = {TracksComponent} />
                </Switch>
            </div>

        );
    }
};

export default withRouter(connect(
    (state) => ({

    }),
    dispatch => ({

    })
)(User));