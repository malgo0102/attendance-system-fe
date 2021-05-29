import {AnyAction} from "redux";
import {takeLatest, put, call} from "redux-saga/effects";
import {createScheduleEvents, getScheduleEvents} from "../../services/schedule-event.service";
import {
    CREATE_SCHEDULE_EVENT,
    CREATE_SCHEDULE_EVENT_ERROR,
    GET_SCHEDULE_EVENTS, getOwnScheduleEvents, setOwnScheduleEvents
} from "../actions/teacher.schedule-events.actions";
import {ScheduleEvent} from "../../type";

export function* doCreateScheduleEvents(action: AnyAction) {
    try {
        const {token, teacherId, scheduleEvent} = action
        yield call(createScheduleEvents, token, scheduleEvent);
        yield put(getOwnScheduleEvents(token, teacherId));
    } catch (error) {
        yield put({
            type: CREATE_SCHEDULE_EVENT_ERROR,
            payload: {
                message: error.data.message,
                statusCode: error.status,
            },
        });
    }
}

export function* watchCreateScheduleEvents() {
    yield takeLatest(CREATE_SCHEDULE_EVENT, doCreateScheduleEvents);
}

export function* doGetOwnScheduleEvents(action: AnyAction) {
    try {
        const {token, teacherId} = action
        const payload: ScheduleEvent[] = yield call(getScheduleEvents, token, teacherId);
        yield put(setOwnScheduleEvents(payload));
    } catch (error) {
        yield put({
            type: CREATE_SCHEDULE_EVENT_ERROR,
            payload: {
                message: error.data.message,
                statusCode: error.status,
            },
        });
    }
}

export function* watchGetOwnScheduleEvents() {
    yield takeLatest(GET_SCHEDULE_EVENTS, doGetOwnScheduleEvents);
}
