import React, {useState} from 'react';
import moment, {Moment} from "moment";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Field, Formik} from "formik";

import ScheduleIcon from "@material-ui/icons/Schedule";

import {KeyboardDatePicker, KeyboardTimePicker} from "formik-material-ui-pickers";
import {startAttendanceValidationSchema} from '../services/validation.service';
import {mergeDateAndTime} from '../services/date.service';
import {Attendance, AttendanceForm, ScheduleEvent} from "../type";
import {useAppDispatch} from "../hooks";
import {Switch, TextField} from "formik-material-ui";
import {useAuth0} from "@auth0/auth0-react";
import {startAttendance} from "../redux/actions/teacher.attendance.actions";


export default function StartAttendanceDialog({
                                                  scheduleEvent,
                                                  open,
                                                  handleClose
                                              }: { scheduleEvent: ScheduleEvent; open: boolean; handleClose: any }) {

    const [currentIp, setCurrentIp] = useState({loading: false, ip: ""})
    const dispatch = useAppDispatch()
    const { getAccessTokenSilently} = useAuth0()

    const handleGetCurrentIp = (setFieldValue: any) => () => {
        setCurrentIp({loading: true, ip: ""})
        fetch('https://api.ipify.org/?format=json')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCurrentIp({loading: false, ip: data.ip})
                setFieldValue("ip", data.ip, true);
            });
    }


    const handleSubmit = (sendValues: Attendance) => {
        getAccessTokenSilently().then(t => {
            dispatch(startAttendance(t, sendValues))
        })
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="rules-dialog-title">
            <DialogTitle id="alert-dialog-title" disableTypography>
                <Typography variant="subtitle1">Start roll call</Typography>
            </DialogTitle>
            <Formik
                initialValues={{
                    scheduleEventId: scheduleEvent.id || 0,
                    endDate: moment().add(15, 'minutes').toDate(),
                    endTime: moment().add(15, 'minutes').toDate(),
                    restrictIp: false,
                    ip: "",
                }}
                // enableReinitialize={true}
                validateOnChange={true}
                validateOnMount={true}
                validationSchema={startAttendanceValidationSchema}
                onSubmit={(values: AttendanceForm) => {
                    const sendValues = {
                        endTime: mergeDateAndTime(moment(values.endDate), moment(values.endTime)),
                        scheduleEventId: values.scheduleEventId,
                        restrictIp: values.restrictIp,
                        ip: values.ip,
                    };
                    handleSubmit(sendValues);
                }}
                validate={(values: AttendanceForm) => {
                    const errors: any = {};
                    let attendanceDate = moment(values.endDate);
                    let attendanceDateTime = moment(values.endTime);

                    if (attendanceDate < moment().hours(0).minutes(0).seconds(0).milliseconds(0)) {
                        errors.endDate = "You can not create past attendance";
                    }
                    if (
                        moment(attendanceDate)
                            .hours(attendanceDateTime.hours())
                            .minutes(attendanceDateTime.minutes()) < moment().seconds(0)
                    ) {
                        errors.startTime = "You can not create past attendance";
                    }
                    return errors;
                }}
            >
                {({
                      submitForm,
                      values,
                      setFieldValue,
                      setFieldError,
                  }) => {
                    return (
                        <>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item md={8} xs={12}>
                                        <FormGroup>
                                            <Field
                                                disablePast
                                                component={KeyboardDatePicker}
                                                format="DD/MM/yyyy"
                                                label="Open until"
                                                name="endDate"
                                                inputVariant="outlined"
                                                onAccept={() => {
                                                    setFieldError("endDate", "");
                                                }}
                                            />
                                        </FormGroup>
                                    </Grid>
                                    <Grid item md={4} xs={12}>
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
                                        Restrict ip address
                                        <Field component={Switch} type="checkbox" name="restrictIp"/>
                                    </Grid>
                                    {values.restrictIp && <Grid item xs={12}>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <Field
                                                    variant="outlined"
                                                    component={TextField}
                                                    name="ip"
                                                    label="Ip address"
                                                />
                                                <Button variant='outlined' onClick={handleGetCurrentIp(setFieldValue)}
                                                        disabled={currentIp.loading}>
                                                    CURRENT IP
                                                </Button>
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
    );
}
