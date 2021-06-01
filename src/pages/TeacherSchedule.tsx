import {MouseEvent, useEffect, useState} from 'react';
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
import {deleteScheduleEvent, getOwnScheduleEvents} from "../redux/actions/teacher.schedule-events.actions";
import {Menu, MenuItem} from "@material-ui/core";
import UpdateScheduleEventDialog from "../components/UpdateScheduleEventDialog";
import StartAttendanceDialog from "../components/StartAttendanceDialog";

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

const initialCalendarEventMenuState = {
    mouseX: null,
    mouseY: null,
};

const TeacherSchedule = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {user, getAccessTokenSilently} = useAuth0()
    const [calendarEventMenuState, setCalendarEventMenuState] = useState<{
        mouseX: null | number;
        mouseY: null | number;
    }>(initialCalendarEventMenuState);
    const [currentEventInMenu, setCurrentEventInMenu] = useState<(ScheduleEvent & { course: string } | null)>(null);
    const [editEventDialogOpen, setEditEventDialogOpen] = useState<boolean>(false);
    const [startAttendanceDialogOpen, setStartAttendanceDialogOpen] = useState<boolean>(false);
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
            if (user && user.sub) {
                dispatch(getOwnCourses(t, user.sub))
                dispatch(getOwnScheduleEvents(t, user.sub))
            }
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


    const handleClickEvent = (e: MouseEvent<HTMLDivElement>, event_: ScheduleEvent & { course: string }) => {
        e.preventDefault();
        setCalendarEventMenuState({
            mouseX: e.clientX - 2,
            mouseY: e.clientY - 4,
        });
        setCurrentEventInMenu(event_)
    };

    const handleCloseEventContextMenu = () => {
        setCalendarEventMenuState(initialCalendarEventMenuState);
        setCurrentEventInMenu(null)

    };
    const handleCloseEditEventDialog = () => {
        setEditEventDialogOpen(false);
        setCurrentEventInMenu(null)
    };
    const handleClickEditEventDialog = () => {
        setEditEventDialogOpen(true);
        setCalendarEventMenuState(initialCalendarEventMenuState);
    };

    const handleClickDeleteEvent = () => {
        const confirmAction = window.confirm(
            `Are you sure you want to delete the schedule event ? This action can not be reversed.`
        );
        if (confirmAction) getAccessTokenSilently().then(t => {
            if (user && user.sub) {
                dispatch(deleteScheduleEvent(t, user.sub, currentEventInMenu?.id as number))
            }
        })
        setCalendarEventMenuState(initialCalendarEventMenuState);
    };

    const handleStartAttendance = () => {
        setStartAttendanceDialogOpen(true);
        setCalendarEventMenuState(initialCalendarEventMenuState);
    }

    const handleCloseStartAttendanceDialog = () => {
        setStartAttendanceDialogOpen(false);
        setCurrentEventInMenu(null)
    };
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
                    components={
                        {
                            eventWrapper: ({event, children}) => (
                                <div onClick={(e) => handleClickEvent(e, event)}>
                                    {children}
                                </div>
                            )
                        }
                    }
                    allDayAccessor={() => false}
                    titleAccessor="course"
                    startAccessor="start"
                    endAccessor="end"
                />
            </div>

            <UpdateScheduleEventDialog initialValues={currentEventInMenu} open={editEventDialogOpen}
                                       handleClose={handleCloseEditEventDialog}/>
            {currentEventInMenu &&
            <StartAttendanceDialog handleClose={handleCloseStartAttendanceDialog} open={startAttendanceDialogOpen}
                                   scheduleEvent={currentEventInMenu}/>}
            <Menu
                keepMounted
                open={calendarEventMenuState.mouseY !== null}
                onClose={handleCloseEventContextMenu}
                anchorReference="anchorPosition"
                anchorPosition={
                    calendarEventMenuState.mouseY !== null && calendarEventMenuState.mouseX !== null
                        ? {top: calendarEventMenuState.mouseY, left: calendarEventMenuState.mouseX}
                        : undefined
                }
            >
                <MenuItem onClick={handleStartAttendance}>Start Attendance</MenuItem>
                <MenuItem onClick={handleClickEditEventDialog}>Edit</MenuItem>
                <MenuItem onClick={handleClickDeleteEvent}>Delete</MenuItem>
            </Menu>
        </div>
    )
}

export default TeacherSchedule
