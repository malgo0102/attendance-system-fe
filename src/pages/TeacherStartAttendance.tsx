import {
    Container,
    Button,
    Grid,
    Paper,
    Typography
} from "@material-ui/core";
import axios from "axios";
import './teacher-start-attendance.css';

const Start = () => {
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

    return (
        <Container maxWidth="sm">
            <Grid container direction="row" justify="center">
                <Paper variant="elevation" elevation={2} className="codepage-background">
                    <Grid item>
                        <Typography component="h1" variant="h5">Attendance</Typography>
                    </Grid>
                        <Grid item>
                            <Button variant="contained" color="default" type="submit" className="button-block" onClick={ Start }>Start</Button>
                        </Grid>
                </Paper>
            </Grid>
        </Container>
    );
}

export default TeacherStartAttendance;