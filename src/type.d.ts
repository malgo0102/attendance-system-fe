import {Moment} from "moment";

interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
}

type UserState = User


interface ScheduleEvent {
    id? : number;
    courseId: number;
    start: Date;
    end: Date;
}
interface ScheduleEventCreate extends  ScheduleEvent{
    repeatWeekly?: boolean;
    until?: Date;
}
interface ScheduleEventForm extends ScheduleEventCreate {
    date: Moment;
    startTime: Moment;
    endTime: Moment;
}

interface ScheduleEventsState  {
    scheduleEvents: ScheduleEvent[];
}

interface Course {
    id: number;
    name: string;
    teacherId: number;
    classId: number;
}

interface CoursesState  {
    courses: Course[];
}

interface Attendance {
    id?: number;
    code?: string;
    scheduleEventId: number;
    endTime: Date;
    restrictIp: boolean;
    ip?: string
}

interface AttendanceForm extends Attendance{
    endDate: Date;
}

interface AttendanceState  {
    currentAttendanceEvent: Attendance | undefined;
}
