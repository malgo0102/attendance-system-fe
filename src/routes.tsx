import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./containers/Layout";
import FrontPage from "./pages/FrontPage";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Layout>
          <FrontPage></FrontPage>
        </Layout>
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
