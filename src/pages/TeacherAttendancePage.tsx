import React, {useEffect, useState} from "react";
import moment from "moment";
import QRCode from "qrcode.react";
import {useParams} from "react-router"
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useAppDispatch, useAppSelector} from "../hooks";
import {getAttendanceEvent} from "../redux/actions/teacher.attendance.actions";
import {useAuth0} from "@auth0/auth0-react";
import {Attendance} from "../type";
import Spinner from "../components/Spinner";

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            height: "calc(100vh - 64px)",
            width: "100%",
            overflow: 'hidden',
        },
        fullHeight: {
            height: "100%",
            maxHeight: "100%",
            marginTop: '30px'
        },
        fullWidth: {
            width: "100%",
            maxWidth: "100%"
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        },
        body: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        footer: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        codeText: {
            fontSize: '8rem',
            fontWeight: 500,
            marginRight: '100px'
        }
    })
);

const TeacherAttendancePage = () => {
    const {id} = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const {user, getAccessTokenSilently} = useAuth0()
    const [countdown, setCountdown] = useState("0:00")

    const attendanceEvent = useAppSelector<Attendance>(state => state.teacherAttendance.currentAttendanceEvent)
    useEffect(() => {
        getAccessTokenSilently().then(t => {
            dispatch(getAttendanceEvent(t, id))
        })
    }, [dispatch, getAccessTokenSilently, user, id])

    const classes = useStyles();


    useEffect(() => {
        const timer = setTimeout(() => {
            const secondsLeft = moment(attendanceEvent.endTime).diff(moment(), 'seconds')
            const minutes = Math.floor((secondsLeft / 60) % 60)
            const seconds = secondsLeft - minutes * 60
            setCountdown(`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`)
        }, 1000);
        return () => clearTimeout(timer);
    });

    if (!attendanceEvent) {
        return <Spinner/>
    }
    if (moment(attendanceEvent.endTime).isBefore(moment())) {
        return <div className={classes.container}>
            <Typography variant="h1">Expired</Typography>
        </div>
    }


    return (
        <div className={classes.container}>
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="stretch"
                className={classes.fullHeight}
            >
                <Grid item xs={3} className={classes.fullWidth}>
                    <div className={classes.header}>
                        <Typography variant="h1">{attendanceEvent.scheduleEvent?.course?.name}</Typography>
                        <Typography
                            variant="h3">{moment(attendanceEvent.scheduleEvent?.start).format("HH:mm")} - {moment(attendanceEvent.scheduleEvent?.end).format("HH:mm")}</Typography>
                    </div>
                </Grid>
                <Grid item xs={7} className={classes.fullWidth}>
                    <div className={classes.body}>
                        <Typography className={classes.codeText}>{attendanceEvent.code}</Typography>
                        {attendanceEvent.code && <QRCode size={300} value={attendanceEvent.code}/>}
                    </div>
                </Grid>
                <Grid item xs={2} className={classes.fullWidth}>
                    <div className={classes.footer}>
                        <Typography variant="h3">10/41</Typography>
                        <Typography variant="h3">{countdown}</Typography>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default TeacherAttendancePage;
