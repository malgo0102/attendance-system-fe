import {AnyAction} from "redux";
import {takeLatest, put, call} from "redux-saga/effects";
import {startAttendance} from "../../services/attendance.service";
import {Attendance} from "../../type";
import {
    setCurrentAttendanceEvent,
    START_ATTENDANCE,
    START_ATTENDANCE_ERROR
} from "../actions/teacher.attendance.actions";

export function* doStartAttendance(action: AnyAction) {
    try {
        const {token, attendance} = action
        const payload: Attendance= yield call(startAttendance, token, attendance);
        yield put(setCurrentAttendanceEvent(payload));
        //todo: got to specific attendance page
    } catch (error) {
        yield put({
            type: START_ATTENDANCE_ERROR,
            payload: {
                message: error.data.message,
                statusCode: error.status,
            },
        });
    }
}

export function* watchStartAttendance() {
    yield takeLatest(START_ATTENDANCE, doStartAttendance);
}
