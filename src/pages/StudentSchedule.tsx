import {useEffect} from 'react';
import {Calendar, momentLocalizer, View} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {makeStyles} from "@material-ui/core/styles";
import {ScheduleEvent} from "../type";
import {useDispatch} from "react-redux";
import {useAuth0} from "@auth0/auth0-react";
import {useAppSelector} from "../hooks";
import {getOwnScheduleEvents} from "../redux/actions/student.schedule-events.actions";

const localize = momentLocalizer(moment);
moment.locale("en-GB", {
    week: {
        dow: 1,
        doy: 1,
    },
});

const colorList = ["#b71c1c", "#880e4f", "#4a148c", "#311b92", "#1a237e", "#01579b", "#006064", "#004d40", "#1b5e20", "#e65100"]

const useStyles = makeStyles((theme) => ({
    calendar: {
        height: 'calc(100vh - 200px)',
        padding: 16
    },
    addButton: {
        margin: theme.spacing(1)
    }
}));


const StudentSchedule = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const classId = useAppSelector(state => state.user.classId)
    const events = useAppSelector(state => state.studentScheduleEvents.scheduleEvents).map((e: ScheduleEvent) => {
        return {
            ...e,
            start: moment(e.start).toDate(),
            end: moment(e.end).toDate(),
            course: e.course?.name
        }
    })
    const {user, getAccessTokenSilently} = useAuth0()
    const VIEWS: View[] = ["month", "week", "work_week", "day"];
    const DEFAULT_VIEW = VIEWS[2]
    useEffect(() => {
        getAccessTokenSilently().then(t => {
            if (user && user.sub) {
                dispatch(getOwnScheduleEvents(t,  classId))
            }
        })
    }, [dispatch, getAccessTokenSilently, user, classId])

    return (
        <div>
            <div className={classes.calendar}>
                <Calendar
                    scrollToTime={new Date(2016, 1, 1, 8)}
                    localizer={localize}
                    events={events}
                    defaultDate={new Date()}
                    views={VIEWS}
                    defaultView={DEFAULT_VIEW}
                    style={{height: "100%", width: "100%"}}
                    eventPropGetter={(event: ScheduleEvent & { course: string }) => {
                        const backgroundColor = colorList[Math.abs(event.courseId)] || colorList[0];
                        return {style: {backgroundColor}};
                    }}
                    allDayAccessor={() => false}
                    titleAccessor="course"
                    startAccessor="start"
                    endAccessor="end"
                />
            </div>
        </div>
    )
}

export default StudentSchedule
