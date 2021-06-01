import {REQUEST_ATTENDANCE_PROGRESS_SUCCESS, SET_CURRENT_ATTENDANCE_EVENT} from "../actions/teacher.attendance.actions";
import {AnyAction} from "redux";
import {AttendanceState} from "../../type";

const initialState: AttendanceState = {
    currentAttendanceEvent: undefined,
    currentAttendanceProgress: [],
}

export default function teacherAttendanceReducer(
    state = initialState,
    action: AnyAction
) {
    switch (action.type) {
        case SET_CURRENT_ATTENDANCE_EVENT:
            return {
                ...state,
                currentAttendanceEvent: action.attendance,
            }
        case REQUEST_ATTENDANCE_PROGRESS_SUCCESS:
            return {
                ...state,
                currentAttendanceProgress: action.progress,
            }
    }
    return state;
}
