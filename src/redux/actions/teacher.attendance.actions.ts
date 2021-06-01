import {AnyAction} from "redux";
import {Attendance, AttendanceProgress} from "../../type";
import {History} from "history";

export const START_ATTENDANCE = "[Teacher] START_ATTENDANCE"
export const START_ATTENDANCE_SUCCESS = "[Teacher] START_ATTENDANCE_SUCCESS"
export const START_ATTENDANCE_ERROR = "[Teacher] START_ATTENDANCE_ERROR"

export const REQUEST_ATTENDANCE_EVENT = "[Teacher] REQUEST_ATTENDANCE_EVENT"
export const REQUEST_ATTENDANCE_EVENT_ERROR = "[Teacher] REQUEST_ATTENDANCE_EVENT_ERROR"
export const SET_CURRENT_ATTENDANCE_EVENT = "[Teacher] SET_CURRENT_ATTENDANCE_EVENT"

export const UPDATE_ATTENDANCE_EVENT_CLOSED = "[Teacher] UPDATE_ATTENDANCE_EVENT_CLOSED"
export const UPDATE_ATTENDANCE_EVENT_CLOSED_SUCCESS = "[Teacher] UPDATE_ATTENDANCE_EVENT_CLOSED_SUCCESS"
export const UPDATE_ATTENDANCE_EVENT_CLOSED_ERROR = "[Teacher] UPDATE_ATTENDANCE_EVENT_CLOSED_ERROR"

export const REQUEST_ATTENDANCE_PROGRESS = "[Teacher] REQUEST_ATTENDANCE_PROGRESS"
export const REQUEST_ATTENDANCE_PROGRESS_ERROR = "[Teacher] REQUEST_ATTENDANCE_PROGRESS_ERROR"
export const REQUEST_ATTENDANCE_PROGRESS_SUCCESS = "[Teacher] REQUEST_ATTENDANCE_PROGRESS_SUCCESS"

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

export function updateAttendanceEventClosed(token: string, attendanceId: string, isClosed: boolean) {
    const action: AnyAction = {
        type: UPDATE_ATTENDANCE_EVENT_CLOSED,
        token, attendanceId, isClosed
    }
    return action
}

export function getAttendanceProgress(token: string, attendanceId: string) {
    const action: AnyAction = {
        type: REQUEST_ATTENDANCE_PROGRESS,
        token,
        attendanceId
    }
    return action
}
export function setAttendanceProgress(progress: AttendanceProgress) {
    const action: AnyAction = {
        type: REQUEST_ATTENDANCE_PROGRESS_SUCCESS,
        progress
    }
    return action
}
