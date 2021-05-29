import moment from "moment";
import {Moment} from "moment";

export const mergeDateAndTime = function (date: Moment, time: Moment) {
    return moment(date).hours(time.hours()).minutes(time.minutes()).seconds(0).toDate();
};
