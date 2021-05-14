import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {
    Container,
    Button,
    Grid,
    Paper,
    Typography
} from "@material-ui/core";
import axios from "axios";



const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        title: {
            flexGrow: 1,
        },
        buttonBlock: {
            width: "100%",
        },
        paper: {
            marginTop: "20px",
            justifyContent: "center",
            minHeight: "15vh",
            padding: "50px",
        },
    })
);

const start = () => {
    console.log("Start attendance was called");
    axios.get ('/start-attendance')
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
}

const TeacherStartAttendance = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="sm" >
            <Grid container direction="row" justify="center">
                <Paper variant="elevation" elevation={2} className={classes.paper}>
                    <Grid item className={classes.title}>
                        <Typography component="h1" variant="h5">Attendance</Typography>
                    </Grid>
                        <Grid item>
                            <Button variant="contained" color="default" type="submit" className={classes.buttonBlock} onClick={ start }>Start</Button>
                        </Grid>
                </Paper>
            </Grid>
        </Container>
    );
}

export default TeacherStartAttendance;