import {AnyAction} from "redux";
import { ScheduleEventsState} from "../../type";
import {STUDENT_GET_SCHEDULE_EVENTS_SUCCESS} from "../actions/student.schedule-events.actions";

const initialState: ScheduleEventsState = {
    scheduleEvents: [],
}

export default function studentScheduleEventsReducer(
    state = initialState,
    action: AnyAction
) {
    switch (action.type) {
        case STUDENT_GET_SCHEDULE_EVENTS_SUCCESS:
            return {
                scheduleEvents: action.scheduleEvents,
            }
    }
    return state;
}
