import {AnyAction} from "redux";
import {Attendance} from "../../type";

export const START_ATTENDANCE = "[Teacher] START_ATTENDANCE"
export const START_ATTENDANCE_SUCCESS = "[Teacher] START_ATTENDANCE_SUCCESS"
export const START_ATTENDANCE_ERROR = "[Teacher] START_ATTENDANCE_ERROR"

export const SET_CURRENT_ATTENDANCE_EVENT = "[Teacher] SET_CURRENT_ATTENDANCE_EVENT"

export function startAttendance(token: string, attendance: Attendance) {
    const action: AnyAction = {
        type: START_ATTENDANCE,
        token,
        attendance
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
