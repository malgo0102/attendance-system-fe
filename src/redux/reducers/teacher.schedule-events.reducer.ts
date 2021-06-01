import {GET_SCHEDULE_EVENTS_SUCCESS} from "../actions/teacher.schedule-events.actions";
import {AnyAction} from "redux";
import { ScheduleEventsState} from "../../type";

const initialState: ScheduleEventsState = {
    scheduleEvents: [],
}

export default function teacherScheduleEventsReducer(
    state = initialState,
    action: AnyAction
) {
    switch (action.type) {
        case GET_SCHEDULE_EVENTS_SUCCESS:
            return {
                scheduleEvents: action.scheduleEvents,
            }
    }
    return state;
}
