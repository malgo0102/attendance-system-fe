import {useEffect, useState} from 'react';
import {Calendar, momentLocalizer, View} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {makeStyles} from "@material-ui/core/styles";
import CreateScheduleEventDialog from "../components/CreateScheduleEventDialog";
import {Course, ScheduleEvent, ScheduleEventForm} from "../type";
import {useDispatch} from "react-redux";
import {useAuth0} from "@auth0/auth0-react";
import {getOwnCourses} from "../redux/actions/teacher.courses.actions";
import {useAppSelector} from "../hooks";
import {getOwnScheduleEvents} from "../redux/actions/teacher.schedule-events.actions";

const localize = momentLocalizer(moment);
moment.locale("en-GB", {
    week: {
        dow: 1,
        doy: 1,
    },
});

const colorList = ["#b71c1c", "#880e4f", "#4a148c", "#311b92", "#1a237e", "#01579b", "#006064", "#004d40", "#1b5e20", "#e65100"]

export type CalendarEvent = {
    id?: number;
    start: Date;
    end: Date;
    title: string;
};

const useStyles = makeStyles((theme) => ({
    calendar: {
        height: 'calc(100vh - 200px)',
        padding: 16
    },
    addButton: {
        margin: theme.spacing(1)
    }
}));

const TeacherSchedule = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {user, getAccessTokenSilently} = useAuth0()
    const courses: Course[] = useAppSelector(state => state.teacherCourses.courses)
    const VIEWS: View[] = ["month", "week", "work_week", "day"];
    const DEFAULT_VIEW = VIEWS[2]
    const events: (ScheduleEvent & { course: string })[] = useAppSelector(state => state.teacherScheduleEvents.scheduleEvents).map((e: ScheduleEvent) => {
        const course = courses.find(c => c.id === e.courseId)
        return {
            ...e,
            start: moment(e.start).toDate(),
            end: moment(e.end).toDate(),
            course: course ? course.name : "UNKNOWN"
        }
    })
    const [initialValue, setInitialValue] = useState<undefined | ScheduleEventForm>(undefined);
    useEffect(() => {
        getAccessTokenSilently().then(t => {
            dispatch(getOwnCourses(t, user.sub))
            dispatch(getOwnScheduleEvents(t, user.sub))
        })
    }, [dispatch, getAccessTokenSilently, user])

    useEffect(() => {
        if (!courses[0]) {
            return
        }
        const initialValues: ScheduleEventForm = {
            courseId: courses[0].id,
            date: moment(),
            end: new Date(),
            endTime: moment(),
            repeatWeekly: false,
            start: new Date(),
            startTime: moment(),
            until: new Date()
        }
        setInitialValue(initialValues)
    }, [courses])

    return (
        <div>
            <CreateScheduleEventDialog initialValues={initialValue}/>
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
                        const backgroundColor = colorList[courses.indexOf(courses.find(c => c.id === event.courseId) as Course)] || colorList[0];
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

export default TeacherSchedule
