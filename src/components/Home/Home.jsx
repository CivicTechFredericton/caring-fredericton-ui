import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);
const myEventsList = [];

export class Home extends React.Component {
  render() {
    return (
      <div style={{ display: 'inline-block' }}>
        <div style={{ width: 230, display: 'inline-block' }}>filter</div>
        <div style={{ display: 'inline-block' }}>
          <BigCalendar
            style={{ height: 500, width: 850 }}
            localizer={localizer}
            events={myEventsList}
            startAccessor='start'
            endAccessor='end'
          />
        </div>
      </div>
    );
  }
}
