import {Moment} from "moment";

import * as H from "history";

export interface RouteComponentProps<P> {
    match: match<P>;
    location: H.Location;
    history: H.History;
    staticContext?: any;
}

export interface match<P> {
    params: P;
    isExact: boolean;
    path: string;
    url: string;
}

interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    classId? :number
}

type UserState = User


interface ScheduleEvent {
    id? : number;
    courseId: number;
    start: Date;
    end: Date;
    course?: Course
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
    class?: Class
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
    isClosed?: boolean
    scheduleEvent?: ScheduleEvent;
}

interface AttendanceForm extends Attendance{
    endDate: Date;
}

type AttendanceProgress = (User & {isPresent: boolean}) []


interface AttendanceState  {
    currentAttendanceEvent: Attendance | undefined;
    currentAttendanceProgress: AttendanceProgress
}

