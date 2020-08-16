/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, { Component } from "react";
import { Redirect, Switch, Route, BrowserRouter } from "react-router-dom";
// import { shallowEqual, useSelector } from "react-redux";
import {Layout} from "../_metronic/layout";
import BasePage from "./BasePage";
import { Logout, AuthPage } from "./modules/Auth";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";
import { connect } from 'react-redux'
import { compose } from 'redux'

class Routes extends Component {
render(){
    const { auth } = this.props;
    return (
        <BrowserRouter>
        <Switch>
            {!auth.uid ? (
                /*Render auth page when user at `/auth` and not authorized.*/
                <Route>
                    <AuthPage />
                </Route>
            ) : (
                /*Otherwise redirect to root page (`/`)*/
                <Redirect from="/auth" to="/"/>
            )}

            <Route path="/error" component={ErrorsPage}/>
            <Route path="/logout" component={Logout}/>


            {!auth.uid ? (
                /*Redirect to `/auth` when user is not authorized*/
                <Redirect to="/auth/login"/>
            ) : (
                <Layout>
                    <BasePage/>
                </Layout>
            )}
        </Switch>
        </BrowserRouter>
    )};
}

const mapStateToProps = (state) => {
    return {
      projects: state.firestore.ordered.projects,
      auth: state.firebase.auth,
      notifications: state.firestore.ordered.notifications
    }
  }
  
export default compose(connect(mapStateToProps))(Routes)