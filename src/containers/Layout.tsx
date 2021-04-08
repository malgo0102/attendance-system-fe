import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "../components/NavigationBar";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import Spinner from "../components/Spinner";
import { Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: "100vw",
    overflowX: "hidden",
  },
}));

const Layout = ({ children }: Props) => {
  const classes = useStyles();
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className={classes.root}>
        <NavigationBar>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</NavigationBar>
        <main>
          <Toolbar />
          {children}
        </main>
      </div>
    </>
  );
};

type Props = {
  children: React.ReactNode;
};

export default Layout;
