import { AppBar, Divider } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

const NavigationBar = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography className={classes.title} variant="h5">
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
