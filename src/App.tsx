import React from "react";
import Routes from "./routes";
import MomentUtils from "@date-io/moment";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";

function App() {
  return <MuiPickersUtilsProvider utils={MomentUtils}>
    <Routes/>
  </MuiPickersUtilsProvider>;
}

export default App;
