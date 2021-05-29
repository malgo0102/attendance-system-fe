import {AnyAction} from "redux";
import { ScheduleEvent, ScheduleEventCreate} from "../../type";

export const CREATE_SCHEDULE_EVENT = "Teacher/CREATE_SCHEDULE_EVENT"
export const CREATE_SCHEDULE_EVENT_SUCCESS = "Teacher/CREATE_SCHEDULE_EVENT_SUCCESS"
export const CREATE_SCHEDULE_EVENT_ERROR = "Teacher/CREATE_SCHEDULE_EVENT_ERROR"

export const GET_SCHEDULE_EVENTS = "Teacher/GET_SCHEDULE_EVENTS"
export const GET_SCHEDULE_EVENTS_SUCCESS = "Teacher/GET_SCHEDULE_EVENTS_SUCCESS"
export const GET_SCHEDULE_EVENTS_ERROR = "Teacher/GET_SCHEDULE_EVENTS_ERROR"

export function createScheduleEvents(token: string, teacherId: string, scheduleEvent: ScheduleEventCreate) {
    const action: AnyAction = {
        type: CREATE_SCHEDULE_EVENT,
        token,
        teacherId,
        scheduleEvent
    }
    return action
}


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
