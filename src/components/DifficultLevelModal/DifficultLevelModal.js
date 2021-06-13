import React, { useState } from 'react';
import './DifficultLevelModal.scss';
const levels = [
  {
    id: 0,
    level: 'Easy',
    color: 'teal',
  },
  {
    id: 1,
    level: 'Normal',
    color: 'green',
  },
  {
    id: 2,
    level: 'Hard',
    color: 'red',
  },
];

export default function DifficultLevelModal({
  difficultlevelCameFromProps,
  onDifficltChange,
}) {
  const filteredLevel = levels.find(
    level => level.level === difficultlevelCameFromProps,
  );

  const [isActive, setIsActive] = useState(false);

  const [level, setLevel] = useState(
    filteredLevel || {
      id: 1,
      level: 'Normal',
      color: 'green',
    },
  );

  const onChoiseLevel = function (value) {
    console.log(value.level);

    setLevel(value);
    setIsActive(!isActive);
    onDifficltChange(value.level);
  };

  return (
    <div className="dropdown-container">
      <div
        className="dropdown-input"
        onClick={() => setIsActive(!isActive)}
      >
        <div className="dropdown-placeholder">
          <div
            className={`dropdown-round ${level.color}`}
          ></div>
          {level.level}
        </div>
        <span className="arrow-down"></span>
      </div>
      <div
        className={
          isActive
            ? 'dropdown-options dropdown-active '
            : 'dropdown-options'
        }
      >
        {levels.map(item => (
          <div
            className="dropdown-item"
            key={item.id}
            onClick={() => onChoiseLevel(item)}
          >
            <div
              className={`dropdown-round ${item.color}`}
            ></div>
            {item.level}
          </div>
        ))}
      </div>
    </div>
  );
}
