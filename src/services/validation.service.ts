import * as yup from "yup";

export const scheduleEventValidationSchema = yup.object({
    date: yup.date().required("Date is required"),
    startTime: yup.date().required("Start time is required"),
    endTime: yup.date().required("End time is required"),
    courseId: yup.date().required("Course is required"),
    repeatWeekly: yup.boolean().required(),
    until: yup.date().when('repeatWeekly', {
        is: true,
        then: yup.date().required('Required field'),
        otherwise: yup.date(),
    }),
});

export const editScheduleEventValidationSchema = yup.object({
    date: yup.date().required("Date is required"),
    startTime: yup.date().required("Start time is required"),
    endTime: yup.date().required("End time is required"),
    courseId: yup.date().required("Course is required"),
});

export const startAttendanceValidationSchema = yup.object({
    endDate: yup.date().required("Date is required"),
    endTime: yup.date().required("End time is required"),
    restrictIp: yup.boolean().required(),
    ip: yup.string().when('restrictIp', {
        is: true,
        then: yup.string().required('Required field'),
        otherwise: yup.string(),
    }),
});
