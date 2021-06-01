import {AnyAction} from "redux";
import {call, put, takeLatest} from "redux-saga/effects";
import {getStudentScheduleEvents,} from "../../services/schedule-event.service";
import {
    setOwnScheduleEvents,
    STUDENT_GET_SCHEDULE_EVENTS,
    STUDENT_GET_SCHEDULE_EVENTS_ERROR
} from "../actions/student.schedule-events.actions";
import {ScheduleEvent} from "../../type";

export function* doGetOwnScheduleEvents(action: AnyAction) {
    try {
        const {token, classId} = action
        const payload: ScheduleEvent[] = yield call(getStudentScheduleEvents, token, classId);
        yield put(setOwnScheduleEvents(payload));
    } catch (error) {
        yield put({
            type: STUDENT_GET_SCHEDULE_EVENTS_ERROR,
            payload: {
                message: error.data.message,
                statusCode: error.status,
            },
        });
    }
}

export function* watchGetOwnScheduleEvents() {
    yield takeLatest(STUDENT_GET_SCHEDULE_EVENTS, doGetOwnScheduleEvents);
}
