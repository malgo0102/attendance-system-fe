import {SET_CURRENT_ATTENDANCE_EVENT} from "../actions/teacher.attendance.actions";
import {AnyAction} from "redux";
import {AttendanceState} from "../../type";

const initialState: AttendanceState = {
    currentAttendanceEvent: undefined,
}

export default function teacherAttendanceReducer(
    state = initialState,
    action: AnyAction
) {
    switch (action.type) {
        case SET_CURRENT_ATTENDANCE_EVENT:
            return {
                currentAttendanceEvent: action.attendance,
            }
    }
    return state;
}
