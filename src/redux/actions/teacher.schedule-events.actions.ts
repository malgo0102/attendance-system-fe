import {AnyAction} from "redux";
import {ScheduleEvent, ScheduleEventCreate} from "../../type";

export const GET_SCHEDULE_EVENTS = "[Teacher] GET_SCHEDULE_EVENTS"
export const GET_SCHEDULE_EVENTS_SUCCESS = "[Teacher] GET_SCHEDULE_EVENTS_SUCCESS"
export const GET_SCHEDULE_EVENTS_ERROR = "[Teacher] GET_SCHEDULE_EVENTS_ERROR"

export const CREATE_SCHEDULE_EVENT = "[Teacher] CREATE_SCHEDULE_EVENT"
export const CREATE_SCHEDULE_EVENT_SUCCESS = "[Teacher] CREATE_SCHEDULE_EVENT_SUCCESS"
export const CREATE_SCHEDULE_EVENT_ERROR = "[Teacher] CREATE_SCHEDULE_EVENT_ERROR"

export const UPDATE_SCHEDULE_EVENT = "[Teacher] UPDATE_SCHEDULE_EVENT"
export const UPDATE_SCHEDULE_EVENT_SUCCESS = "[Teacher] UPDATE_SCHEDULE_EVENT_SUCCESS"
export const UPDATE_SCHEDULE_EVENT_ERROR = "[Teacher] UPDATE_SCHEDULE_EVENT_ERROR"

export const DELETE_SCHEDULE_EVENT = "[Teacher] DELETE_SCHEDULE_EVENT"
export const DELETE_SCHEDULE_EVENT_SUCCESS = "[Teacher] DELETE_SCHEDULE_EVENT_SUCCESS"
export const DELETE_SCHEDULE_EVENT_ERROR = "[Teacher] DELETE_SCHEDULE_EVENT_ERROR"


export function getOwnScheduleEvents(token: string, teacherId: string) {
    const action: AnyAction = {
        type: GET_SCHEDULE_EVENTS,
        token,
        teacherId
    }
    return action
}

export function setOwnScheduleEvents(scheduleEvents: ScheduleEvent[]) {
    const action: AnyAction = {
        type: GET_SCHEDULE_EVENTS_SUCCESS,
        scheduleEvents
    }
    return action
}

export function createScheduleEvents(token: string, teacherId: string, scheduleEvent: ScheduleEventCreate) {
    const action: AnyAction = {
        type: CREATE_SCHEDULE_EVENT,
        token,
        teacherId,
        scheduleEvent
    }
    return action
}

export function updateScheduleEvent(token: string, teacherId: string, eventId: number, scheduleEvent: ScheduleEventCreate) {
    const action: AnyAction = {
        type: UPDATE_SCHEDULE_EVENT,
        token,
        teacherId,
        eventId,
        scheduleEvent
    }
    return action
}

export function deleteScheduleEvent(token: string, teacherId: string, eventId: number) {
    const action: AnyAction = {
        type: DELETE_SCHEDULE_EVENT,
        token,
        teacherId,
        eventId,
    }
    return action
}
