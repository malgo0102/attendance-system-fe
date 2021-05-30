import {AnyAction} from "redux";
import {call, put, takeLatest} from "redux-saga/effects";
import {
    createScheduleEvents,
    deleteScheduleEvent,
    getScheduleEvents,
    updateScheduleEvent
} from "../../services/schedule-event.service";
import {
    CREATE_SCHEDULE_EVENT,
    CREATE_SCHEDULE_EVENT_ERROR, DELETE_SCHEDULE_EVENT,
    GET_SCHEDULE_EVENTS,
    getOwnScheduleEvents,
    setOwnScheduleEvents,
    UPDATE_SCHEDULE_EVENT, UPDATE_SCHEDULE_EVENT_ERROR
} from "../actions/teacher.schedule-events.actions";
import {ScheduleEvent} from "../../type";

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

export function* doUpdateScheduleEvent(action: AnyAction) {
    try {
        const {token, teacherId, eventId, scheduleEvent} = action
        yield call(updateScheduleEvent, token, eventId, scheduleEvent);
        yield put(getOwnScheduleEvents(token, teacherId));
    } catch (error) {
        yield put({
            type: UPDATE_SCHEDULE_EVENT_ERROR,
            payload: {
                message: error.data.message,
                statusCode: error.status,
            },
        });
    }
}

export function* watchUpdateScheduleEvents() {
    yield takeLatest(UPDATE_SCHEDULE_EVENT, doUpdateScheduleEvent);
}

export function* doDeleteScheduleEvent(action: AnyAction) {
    try {
        const {token, teacherId, eventId} = action
        yield call(deleteScheduleEvent, token, eventId);
        yield put(getOwnScheduleEvents(token, teacherId));
    } catch (error) {
        yield put({
            type: UPDATE_SCHEDULE_EVENT_ERROR,
            payload: {
                message: error.data.message,
                statusCode: error.status,
            },
        });
    }
}

export function* watchDeleteScheduleEvent() {
    yield takeLatest(DELETE_SCHEDULE_EVENT, doDeleteScheduleEvent);
}
