import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

// Types
export type CalendarEvent = {
  id?: number;
  start: Date;
  end: Date;
  title: string;
};

const StudentSchedule = () => {
  const [events] = useState([] as CalendarEvent[]);

  return (
    <div>
    {/*<Header /> */}
    <Calendar 
    localizer={localizer}
    events={events}
    defaultDate={new Date()}
    defaultView="week"
    min={new Date(0, 0, 0, 8, 0, 0)}
    max={new Date(0, 0, 0, 20, 0, 0)}
    style={{ height: "100vh", width: "100vw"}}
    />
      </div>
  )
}

export default StudentSchedule
