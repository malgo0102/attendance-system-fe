import React, {useState} from "react";
import keabird from "../assets/keabird.png";
import {Button, Grid, Paper, TextField, Typography} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";

const useStyles = makeStyles(() =>
    createStyles({
        form: {
            justifyContent: "center",
            minHeight: "90vh",
            maxWidth: "448px",
            minWidth: "448px"
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

        },
    })
);


const StudentCodePage = () => {
    const {getAccessTokenSilently} = useAuth0();
    const [code, setCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState("");
    const classes = useStyles();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        getAccessTokenSilently().then( token => {
            const config = {
                headers: {Authorization: `Bearer ${token}`},
            };
            axios
                .post(process.env.REACT_APP_SERVER_URL + "/api/attendance/submit", {code: code}, config)
                .then(() => {
                    setResult("Attendance marked successfully")
                    setIsSubmitting(false);

                })
                .catch((error) => {
                    setResult(error.response.data.message);
                    setIsSubmitting(false);
                });
        })
    }

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
                                    <form onSubmit={handleSubmit}>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item>
                                                <TextField type="code" placeholder="Code" fullWidth name="code"
                                                           variant="outlined"
                                                           value={code}
                                                           onChange={(event) => setCode(event.target.value)}
                                                           required/>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" color="default" type="submit"
                                                        disabled={isSubmitting}
                                                        className={classes.buttonBlock}>Submit</Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                                <Grid item>
                                    <Typography variant="caption">
                                        {result}
                                    </Typography>
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

export default StudentCodePage;
