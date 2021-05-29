import React from 'react';
import moment, {Moment} from "moment";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Box, FormControl, InputLabel, MenuItem} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {Formik, Field} from "formik";

import ScheduleIcon from "@material-ui/icons/Schedule";

import {makeStyles} from "@material-ui/core/styles";
import {KeyboardDatePicker, KeyboardTimePicker} from "formik-material-ui-pickers";
import {scheduleEventValidationSchema} from '../services/validation.service';
import {mergeDateAndTime} from '../services/date.service';
import {Course, ScheduleEventCreate, ScheduleEventForm} from "../type";
import {useAppDispatch, useAppSelector} from "../hooks";
import {Select, Switch} from "formik-material-ui";
import {createScheduleEvents} from "../redux/actions/teacher.schedule-events.actions";
import {useAuth0} from "@auth0/auth0-react";


const useStyles = makeStyles((theme) => ({
    addButton: {
        margin: theme.spacing(1)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: "100%",
    },
}));

export default function CreateScheduleEventDialog({initialValues}: { initialValues: ScheduleEventForm | undefined }) {
    const courses: Course[] = useAppSelector(state => state.teacherCourses.courses)
    const dispatch = useAppDispatch()
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const {user, getAccessTokenSilently} = useAuth0()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (sendValues: ScheduleEventCreate) => {
        getAccessTokenSilently().then(t => {
            dispatch(createScheduleEvents(t, user.sub, sendValues))
        })
        handleClose();
    }

    if (!initialValues) {
        return <Box display="flex" justifyContent="flex-end">
            <Fab
                className={classes.addButton}
                aria-label="add"
                color="primary"
                onClick={handleClickOpen}
                disabled={true}
            >
                <AddIcon/>
            </Fab>
        </Box>
    }
    return (
        <div>
            <Box display="flex" justifyContent="flex-end">
                <Fab
                    className={classes.addButton}
                    aria-label="add"
                    color="primary"
                    onClick={handleClickOpen}
                >
                    <AddIcon/>
                </Fab>
            </Box>
            <Dialog open={open} onClose={handleClose} aria-labelledby="rules-dialog-title">
                <DialogTitle id="alert-dialog-title" disableTypography>
                    <Typography variant="subtitle1">Add class to schedule</Typography>
                </DialogTitle>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validateOnChange={true}
                    validateOnMount={true}
                    validationSchema={scheduleEventValidationSchema}
                    onSubmit={(values: ScheduleEventForm) => {
                        const sendValues = {
                            start: mergeDateAndTime(values.date, values.startTime),
                            end: mergeDateAndTime(values.date, values.endTime),
                            courseId: values.courseId,
                            repeatWeekly: values.repeatWeekly,
                            until: values.until
                        };
                        handleSubmit(sendValues);
                    }}
                    validate={(values: ScheduleEventForm) => {
                        const errors: any = {};
                        let scheduleDate = moment(values.date);
                        let scheduleStartTime = moment(values.startTime);
                        let scheduleEndTime = moment(values.endTime);

                        if (scheduleDate < moment().hours(0).minutes(0).seconds(0).milliseconds(0)) {
                            errors.date = "You can not create past bookings";
                        }
                        if (
                            moment(scheduleDate)
                                .hours(scheduleStartTime.hours())
                                .minutes(scheduleStartTime.minutes()) < moment().seconds(0)
                        ) {
                            errors.startTime = "You can not create past schedule events";
                        }
                        if (
                            moment(scheduleDate).hours(scheduleEndTime.hours()).minutes(scheduleEndTime.minutes()) <
                            moment(scheduleDate).hours(scheduleStartTime.hours()).minutes(scheduleStartTime.minutes())
                        ) {
                            errors.endTime = "End time can not be before start time";
                        }
                        if (
                            scheduleStartTime.hours() === scheduleEndTime.hours() &&
                            scheduleStartTime.minutes() === scheduleEndTime.minutes()
                        ) {
                            errors.endTime = "End time should be different than start time";
                        }
                        return errors;
                    }}
                >
                    {({
                          submitForm,
                          values,
                          setFieldValue,
                          setFieldError,
                          errors,
                      }) => {
                        return (
                            <>
                                <DialogContent>
                                    {JSON.stringify(errors)}
                                    <Grid container spacing={2}>
                                        <Grid item md={6} xs={12}>
                                            <FormGroup>
                                                <Field
                                                    disablePast
                                                    component={KeyboardDatePicker}
                                                    format="DD/MM/yyyy"
                                                    label="Date"
                                                    name="date"
                                                    inputVariant="outlined"
                                                    onAccept={() => {
                                                        setFieldError("date", "");
                                                    }}
                                                />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item md={3} xs={12}>
                                            <FormGroup>
                                                <Field
                                                    component={KeyboardTimePicker}
                                                    format="HH:mm"
                                                    disablePast
                                                    label="Start Time"
                                                    name="startTime"
                                                    minutesStep={15}
                                                    ampm={false}
                                                    inputVariant="outlined"
                                                    keyboardIcon={<ScheduleIcon/>}
                                                    onChange={(date: Moment) => {
                                                        setFieldValue("startTime", date, true);
                                                    }}
                                                    onAccept={() => {
                                                        setFieldError("startTime", "");
                                                    }}
                                                />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item md={3} xs={12}>
                                            <FormGroup>
                                                <Field
                                                    component={KeyboardTimePicker}
                                                    format="HH:mm"
                                                    label="End Time"
                                                    name="endTime"
                                                    minutesStep={15}
                                                    ampm={false}
                                                    keyboardIcon={<ScheduleIcon/>}
                                                    inputVariant="outlined"
                                                    onChange={(date: Moment) => {
                                                        setFieldValue("endTime", moment(date), true);
                                                    }}
                                                    onAccept={() => {
                                                        setFieldError("endTime", "");
                                                    }}
                                                />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth variant='outlined'>
                                                <InputLabel id="courseSelectLabel">Course</InputLabel>
                                                <Field
                                                    component={Select}
                                                    name="courseId"
                                                    label="Course"
                                                    labelId='courseSelectLabel'
                                                >{courses.map((course) => (
                                                    <MenuItem key={course.id} value={course.id}>{course.name}</MenuItem>
                                                ))}
                                                </Field>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            Repeat Weekly
                                            <Field component={Switch} type="checkbox" name="repeatWeekly"/>
                                        </Grid>
                                        {values.repeatWeekly && <Grid item xs={12}>
                                            <Grid item xs={12}>
                                                <FormGroup>
                                                    <Field
                                                        disablePast
                                                        component={KeyboardDatePicker}
                                                        format="DD/MM/yyyy"
                                                        label="Date"
                                                        name="until"
                                                        inputVariant="outlined"
                                                        invalidDateMessage="Invalid Date"
                                                        onAccept={() => {
                                                            setFieldError("until", "");
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Grid>
                                        </Grid>}
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary" autoFocus>
                                        Close
                                    </Button>
                                    <Button type="submit" onClick={submitForm} variant="contained" color="primary">
                                        Submit
                                    </Button>
                                </DialogActions>
                            </>
                        );
                    }}
                </Formik>
            </Dialog>
        </div>
    );
}
