import {AnyAction} from "redux";
import {ScheduleEvent} from "../../type";

export const STUDENT_GET_SCHEDULE_EVENTS = "[Student] GET_SCHEDULE_EVENTS"
export const STUDENT_GET_SCHEDULE_EVENTS_SUCCESS = "[Student] GET_SCHEDULE_EVENTS_SUCCESS"
export const STUDENT_GET_SCHEDULE_EVENTS_ERROR = "[Student] GET_SCHEDULE_EVENTS_ERROR"



export function getOwnScheduleEvents(token: string, classId: string) {
    const action: AnyAction = {
        type: STUDENT_GET_SCHEDULE_EVENTS,
        token,
        classId
    }
    return action
}

export function setOwnScheduleEvents(scheduleEvents: ScheduleEvent[]) {
    const action: AnyAction = {
        type: STUDENT_GET_SCHEDULE_EVENTS_SUCCESS,
        scheduleEvents
    }
    return action
}
