import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./containers/Layout";
import FrontPage from "./pages/FrontPage";
import StudentSchedule from "./pages/StudentSchedule";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Layout>
          <FrontPage></FrontPage>
        </Layout>
      </Route>
      {/* <Redirect to="/" /> */}
      <Route path="/student-schedule" exact>
        <Layout>
          <StudentSchedule></StudentSchedule>
        </Layout>
      </Route>
    </Switch>
  );
};

export default Routes;
