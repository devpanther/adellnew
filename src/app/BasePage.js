import React, {Suspense, lazy} from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import {LayoutSplashScreen, ContentRoute} from "../_metronic/layout";
import {BuilderPage} from "./pages/BuilderPage";
import DashboardComponent from "./pages/Dashboard/dashboard";
import Settings from "./pages/Settings";
import {DashboardPage} from "./pages/DashboardPage";

const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);

export default function BasePage() {
    // useEffect(() => {
    //   console.log('Base page');
    // }, []) // [] - is required if you need only one call
    // https://reactjs.org/docs/hooks-reference.html#useeffect

    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <Switch>
                {
                    /* Redirect from root URL to /dashboard. */
                    <Redirect exact from="/" to="/dashboard"/>
                }
                <ContentRoute path="/dashboard" component={DashboardPage}/>
                <ContentRoute path="/builder" component={BuilderPage}/>
                <ContentRoute path="/chat" component={DashboardComponent}/>
                <Route path="/google-material" component={GoogleMaterialPage}/>
                <Route path="/react-bootstrap" component={ReactBootstrapPage}/>
                <ContentRoute path="/settings" component={Settings} />
                <Route path="/e-commerce" component={ECommercePage}/>
                <Redirect to="/error"/>
            </Switch>
        </Suspense>
    );
}
