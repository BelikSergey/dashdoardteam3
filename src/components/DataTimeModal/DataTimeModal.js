import { useState } from 'react';
import './DataTimeModa.scss';
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

// const data = new Date();
// const dayNumber = data.getDay();

const getToday = function () {
  const currentDate = new Date(
    new Date().getTime(),
    // + 24 * 60 * 60 * 1000,
  );
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  return year + '-' + '0' + month + '-' + day;
};
const today = getToday();

const getTommorow = function () {
  const currentDate = new Date(
    new Date().getTime(),
    // + 24 * 60 * 60 * 1000,
  );
  const day = currentDate.getDate() + 1;
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  return year + '-' + '0' + month + '-' + day;
};

export default function DataTimeModal({
  timeCameFromProps,
  dataCameFromProps,
  onTimeChange,

  onDataChange,
  changeState,
}) {
  let tommorow;

  if (dataCameFromProps > today) {
    tommorow = getTommorow();
  }

  const [isActive, setIsActive] = useState(false);
  const [startDate, setStartDate] = useState(
    tommorow || today,
  );
  const [timer, setTimer] = useState(
    timeCameFromProps || '00:00',
  );
  // setTime(timer);
  // setFinishDate(startDate);

  const setTodayData = function () {
    const currentDate = new Date(
      new Date().getTime(),
      // + 24 * 60 * 60 * 1000,
    );
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    setStartDate(year + '-' + '0' + month + '-' + day);
    onDataChange(year + '-' + '0' + month + '-' + day);
  };

  const setTomorrowData = function () {
    const currentDate = new Date(
      new Date().getTime(),
      // + 24 * 60 * 60 * 1000,
    );
    const day = currentDate.getDate() + 1;
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    setStartDate(year + '-' + '0' + month + '-' + day);
    onDataChange(year + '-' + '0' + month + '-' + day);
  };

  const onDataTodayClick = function () {
    setTodayData();
    setIsActive(!isActive);
  };

  const onDataTomorrowClick = function () {
    setTomorrowData();
    setIsActive(!isActive);
  };

  const onTimeclick = function (item) {
    setTimer(item);
    setIsActive(!isActive);
    onTimeChange(item);
  };

  return (
    <>
      <div className="data-timer-container">
        <div
          className="data-timer-input"
          onClick={() =>
            changeState(setIsActive, !isActive)
          }
        >
          <div className="data-timer-placeholder">
            {startDate === today ? (
              <div>Today, </div>
            ) : (
              <div>Tomorrow, </div>
            )}
            <div>&nbsp;{timer}</div>
            <div>
              <svg className="calendar-icon">
                <use href={sprite + '#calendar'}></use>
              </svg>
            </div>
          </div>
        </div>

        <div
          className={
            isActive
              ? 'data-timer-options data-timer-active '
              : 'data-timer-options'
          }
        >
          <div>
            <div
              className="data-timer-item"
              onClick={onDataTodayClick}
            >
              today
            </div>
            <div
              className="data-timer-item"
              onClick={onDataTomorrowClick}
            >
              tomorow
            </div>
          </div>
          <div className="data-timer-item-container">
            {time.map(item => (
              <div
                className="data-timer-item"
                key={item}
                onClick={() => onTimeclick(item)}
              >
                &nbsp;{item}
              </div>
            ))}
          </div>

          <br />

          <br />
        </div>
      </div>
    </>
  );
}
