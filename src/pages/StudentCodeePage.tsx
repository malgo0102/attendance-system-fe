import React, {useState} from "react";
import keabird from "../assets/keabird.png";
import {Button, Grid, Paper, TextField, Typography} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        form: {
            justifyContent: "center",
            minHeight: "90vh",
        },
        title: {
            flexGrow: 1,
        },
        buttonBlock: {
            width: "100%",
    },
    paper: {
        marginTop: "20px",
        justifyContent: "center",
        minHeight: "30vh",
        padding: "50px",
    },
        img: {
            justifyContent: "center",
            minHeight: "50vh",
            padding: "70px",
        },
        gridDiv: {
            overflow: 'hidden'
        }
    })
);


const StudentCodeePage = () => {
    const [code, setCode] = useState("");
    const classes = useStyles();

    return (
        <div>
            <Grid container direction="row" justify="center" className={classes.gridDiv}>
                <Grid item>
                    <Grid container spacing={0} alignItems="center" direction="row">
                        <Grid container direction="column" spacing={2} className={classes.form}>
                            <Paper variant="elevation" elevation={2} className={classes.paper}>
                <Grid item className={classes.title}>
                  <Typography component="h1" variant="h5">Enter code</Typography>
                </Grid>
                <Grid item>
                  <form>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <TextField type="code" placeholder="Code" fullWidth name="code"
                                   variant="outlined"
                                   value={code} onChange={(event) => setCode(event.target.value)}
                                   required/>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" color="default" type="submit"
                                className={classes.buttonBlock}>Submit</Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Paper>
            </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <img src={keabird} height={300} alt="kea bird" className={classes.img}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default StudentCodeePage;
