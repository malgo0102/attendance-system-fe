import React from "react";

import {makeStyles} from "@material-ui/core/styles";
import NavigationBar from "../components/NavigationBar";
import {useAuth0} from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import ScheduleButton from "../components/ScheduleButton";
import Spinner from "../components/Spinner";
import {Toolbar} from "@material-ui/core";
import CodePageButton from "../components/CodePageButton";


const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "80vw",
    overflowX: "hidden",
    marginLeft: 'auto',
    marginRight: 'auto'
  },
}));

const Layout = ({children, role}: Props) => {
  const classes = useStyles();
  const {isAuthenticated, isLoading} = useAuth0();

  if (isLoading) {
    return <Spinner/>;
  }
  return (
      <>
        <div className={classes.root}>
          <NavigationBar>
            {role === "Student" && <CodePageButton/>}
            {(role === "Student" || role === "Teacher") && <ScheduleButton/>}
            {isAuthenticated ? <LogoutButton/> : <LoginButton/>}
          </NavigationBar>
          <main>
            <Toolbar/>
            {children}
          </main>
        </div>
      </>
  );
};

type Props = {
  children: React.ReactNode;
  role: string
};

export default Layout;
