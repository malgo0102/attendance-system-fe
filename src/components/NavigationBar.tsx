import {AppBar, Toolbar, Typography} from "@material-ui/core";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
        fontWeight: 500,
        fontSize: "1.5rem",
        color: theme.palette.primary.contrastText,
        textDecoration: "none",
    },
  })
);

const NavigationBar = ({children}: Props) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed">
      <Toolbar>
          <Typography className={classes.title} variant="h5" component={NavLink} to="/">
              Attendance system
          </Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
};

type Props = {
  children: React.ReactNode;
};

export default NavigationBar;
