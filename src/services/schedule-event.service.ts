import axios from "axios";
import {ScheduleEvent, ScheduleEventCreate} from "../type";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const SCHEDULE_EVENTS_URL = serverUrl + '/api/schedule-events'

export const getScheduleEvents = (token: string, teacherId: string): Promise<Array<ScheduleEvent>> => {
    const config = {
        headers: {Authorization: `Bearer ${token}`},
        params: {
            filter: `["teacher_id","${teacherId}"]`
        }
    };
    return axios
        .get(SCHEDULE_EVENTS_URL, config)
        .then((response) => response.data)
        .catch((error) => {
            throw error.response;
        });
}

export const createScheduleEvents = (token: string, scheduleEvent: ScheduleEventCreate): Promise<Array<ScheduleEvent>> => {
    const config = {
        headers: {Authorization: `Bearer ${token}`},
    };
    return axios
        .post(SCHEDULE_EVENTS_URL, scheduleEvent, config)
        .then((response) => response.data)
        .catch((error) => {
            throw error.response;
        });
}

export const updateScheduleEvent = (token: string, scheduleEventId: number, scheduleEvent: ScheduleEventCreate): Promise<ScheduleEvent> => {
    const config = {
        headers: {Authorization: `Bearer ${token}`},
    };
    return axios
        .put(`${SCHEDULE_EVENTS_URL}/${scheduleEventId}`, scheduleEvent, config)
        .then((response) => response.data)
        .catch((error) => {
            throw error.response;
        });
}

export const deleteScheduleEvent = (token: string, scheduleEventId: number): Promise<ScheduleEvent> => {
    const config = {
        headers: {Authorization: `Bearer ${token}`},
    };
    return axios
        .delete(`${SCHEDULE_EVENTS_URL}/${scheduleEventId}`, config)
        .then((response) => response.data)
        .catch((error) => {
            throw error.response;
        });
}
