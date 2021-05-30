import {AnyAction} from "redux";
import {call, put, takeLatest} from "redux-saga/effects";
import {getAttendanceEvent, startAttendance} from "../../services/teacher.attendance.service";
import {Attendance} from "../../type";
import {
    REQUEST_ATTENDANCE_EVENT,
    REQUEST_ATTENDANCE_EVENT_ERROR,
    setCurrentAttendanceEvent,
    START_ATTENDANCE,
    START_ATTENDANCE_ERROR
} from "../actions/teacher.attendance.actions";

export function* doStartAttendance(action: AnyAction) {
    try {
        const {history, token, attendance} = action
        const payload: Attendance = yield call(startAttendance, token, attendance);
        yield put(setCurrentAttendanceEvent(payload));
        history.push('/attendance/' + payload.id)
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

export function* doRequestAttendance(action: AnyAction) {
    try {
        const {token, attendanceId} = action
        const payload: Attendance = yield call(getAttendanceEvent, token, attendanceId);
        yield put(setCurrentAttendanceEvent(payload));
    } catch (error) {
        yield put({
            type: REQUEST_ATTENDANCE_EVENT_ERROR,
            payload: {
                message: error.data.message,
                statusCode: error.status,
            },
        });
    }
}

export function* watchRequestAttendance() {
    yield takeLatest(REQUEST_ATTENDANCE_EVENT, doRequestAttendance);
}
