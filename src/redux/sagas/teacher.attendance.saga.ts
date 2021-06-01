import {AnyAction} from "redux";
import {call, put, takeLatest} from "redux-saga/effects";
import {
    getAttendanceEvent, getAttendanceProgress,
    startAttendance,
    updateAttendanceEventClosed
} from "../../services/teacher.attendance.service";
import {Attendance, AttendanceProgress} from "../../type";
import {
    getAttendanceEvent as getAttendanceEventAction,
    REQUEST_ATTENDANCE_EVENT,
    REQUEST_ATTENDANCE_EVENT_ERROR,
    REQUEST_ATTENDANCE_PROGRESS,
    REQUEST_ATTENDANCE_PROGRESS_ERROR,
    setAttendanceProgress,
    setCurrentAttendanceEvent,
    START_ATTENDANCE,
    START_ATTENDANCE_ERROR,
    UPDATE_ATTENDANCE_EVENT_CLOSED,
    UPDATE_ATTENDANCE_EVENT_CLOSED_ERROR
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


export function* doUpdateAttendanceClosed(action: AnyAction) {
    try {
        const {token, attendanceId, isClosed} = action
        yield call(updateAttendanceEventClosed, token, attendanceId, isClosed);
        yield put(getAttendanceEventAction(token, attendanceId));
    } catch (error) {
        yield put({
            type: UPDATE_ATTENDANCE_EVENT_CLOSED_ERROR,
            payload: {
                message: error.data.message,
                statusCode: error.status,
            },
        });
    }
}

export function* watchUpdateAttendanceClosed() {
    yield takeLatest(UPDATE_ATTENDANCE_EVENT_CLOSED, doUpdateAttendanceClosed);
}

export function* doRequestAttendanceProgress(action: AnyAction) {
    try {
        const {token, attendanceId} = action
        const progress: AttendanceProgress = yield call(getAttendanceProgress, token, attendanceId);
        yield put(setAttendanceProgress(progress));
    } catch (error) {
        yield put({
            type: REQUEST_ATTENDANCE_PROGRESS_ERROR,
            payload: {
                message: error.data.message,
                statusCode: error.status,
            },
        });
    }
}

export function* watchRequestAttendanceProgress() {
    yield takeLatest(REQUEST_ATTENDANCE_PROGRESS, doRequestAttendanceProgress);
}
