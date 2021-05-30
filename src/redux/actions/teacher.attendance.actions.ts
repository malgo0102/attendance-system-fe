import {AnyAction} from "redux";
import {Attendance} from "../../type";
import {History} from "history";

export const START_ATTENDANCE = "[Teacher] START_ATTENDANCE"
export const START_ATTENDANCE_SUCCESS = "[Teacher] START_ATTENDANCE_SUCCESS"
export const START_ATTENDANCE_ERROR = "[Teacher] START_ATTENDANCE_ERROR"

export const REQUEST_ATTENDANCE_EVENT = "[Teacher] REQUEST_ATTENDANCE_EVENT"
export const REQUEST_ATTENDANCE_EVENT_ERROR = "[Teacher] REQUEST_ATTENDANCE_EVENT_ERROR"
export const SET_CURRENT_ATTENDANCE_EVENT = "[Teacher] SET_CURRENT_ATTENDANCE_EVENT"

export function startAttendance(token: string, attendance: Attendance, history: History) {
    const action: AnyAction = {
        type: START_ATTENDANCE,
        token,
        attendance,
        history
    }
    return action
}

export function getAttendanceEvent(token: string, attendanceId: string){
    const action: AnyAction = {
        type: REQUEST_ATTENDANCE_EVENT,
        token,
        attendanceId
    }
    return action
}

export function setCurrentAttendanceEvent(attendance: Attendance) {
    const action: AnyAction = {
        type: SET_CURRENT_ATTENDANCE_EVENT,
        attendance
    }
    return action
}
