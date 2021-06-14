import { useState } from 'react';
import './DataTimeChelengeModal.scss';
import sprite from '../../sprite.svg';

const time = [
  '00:00',
  '00:30',
  '01:00',
  '01:30',
  '02:00',
  '02:30',
  '03:00',
  '03:30',
  '04:00',
  '04:30',
  '05:00',
  '05:30',
  '06:00',
  '06:30',
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
];

export default function DataTimeChelengeModal({
  timeCameFromProps,
  dataCameFromProps,
  onTimeChange,
  onDataChange,
  changeState,
}) {
  const [isActive, setIsActive] = useState(false);
  const [calendarValue, setCalendarValue] = useState(
    dataCameFromProps,
  );
  const [timer, setTimer] = useState(
    timeCameFromProps || '00:00',
  );
  let calendarFedaultValue;
  const onCalendarInputChange = function (event) {
    setCalendarValue(event.target.value);
    calendarFedaultValue = event.target.value;

    setIsActive(!isActive);
    onDataChange(event.target.value);
  };

  const onTimeclick = function (item) {
    setTimer(item);
    setIsActive(!isActive);
    onTimeChange(item);
  };
  function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek)
      ? null
      : [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ][dayOfWeek];
  }
  const DayOfWeek = getDayOfWeek(
    calendarValue || calendarFedaultValue || new Date(),
  );

  return (
    <>
      <div className="chelenge-timer-container">
        <div
          className="chelenge-timer-input"
          onClick={() =>
            changeState(setIsActive, !isActive)
          }
        >
          <div className="chelenge-timer-placeholder">
            <div>{DayOfWeek}, &nbsp;</div>
            <div>{timer}</div>
            <div>
              <svg className="chelenge-calendar-icon">
                <use href={sprite + '#calendar'}></use>
              </svg>
            </div>
          </div>
        </div>

        <div
          className={
            isActive
              ? 'chelenge-timer-options chelenge-timer-active'
              : 'chelenge-timer-options'
          }
        >
          <input
            className="chelenge-calendar-item-container"
            type="date"
            id="start"
            name="trip-start"
            draggable
            onChange={e => onCalendarInputChange(e)}
            value={calendarValue}
          />
          <div className="chelenge-timer-item-container">
            {time.map(item => (
              <div
                className="chelenge-timer-item"
                key={item}
                onClick={() => onTimeclick(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
