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
