import React, { useState, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useDispatch } from 'react-redux';

import { cardsOperations } from '../../redux/cards';

import s from './TodoCard.module.scss';
import sprite from '../../sprite.svg';
import DifficultLevelModal from '../DifficultLevelModal/DifficultLevelModal';
import DataTimeChelengeModal from '../DataTimeChelengeModal/DataTimeChelengeModal';
import DataTimeModal from '../DataTimeModal/DataTimeModal';

import Modal from '../Modal/modal';

const categories = [
  { name: 'Stuff', color: '#B9C3C8' },
  { name: 'Family', color: '#FFE6D3' },
  { name: 'Health', color: '#CDF7FF' },
  { name: 'Learning', color: '#FFF6C0' },
  { name: 'Leisure', color: '#F8D2FF' },
  { name: 'Work', color: '#D3F6CE' },
];

export default function CustomSelect(props) {
  const dispatch = useDispatch();

  //modal
  const [modalActive, setModal] = useState(false);

  // Состояние выпадающего окна для выбора level
  // eslint-disable-next-line
  // const [isActive, setIsActive] = useState(false);

  // Типы level: Easy, Normal, Hard
  // eslint-disable-next-line
  const [difficulty, setDifficulty] = useState('Normal');

  // Основное состояние карточки: create, edit, incomplete, done
  const [status, setStatus] = useState('incomplete');

  // Начат chelenge или нет, для изменения фона карточки, звездочка или кубок, и надписи CHALLENGE
  const [isChallengeStarted, setIsChallengeStarted] =
    useState(props.type === 'Challenge');

  const [type, setType] = useState(
    props.type === 'Challenge' ? 'Challenge' : 'Task',
  );

  // Для внесения (изменения) и отрисовки наименования тудушки
  const [title, setTitle] = useState(
    props.title || 'Do some thing',
  );

  // Дата начала
  // eslint-disable-next-line
  // const [startDate, setStartDate] = useState('');

  // Дата окончания
  // eslint-disable-next-line
  const [finishDate, setFinishDate] = useState(new Date());
  const [timer, setTime] = useState(props.time || '00:00');

  //Группы: STUFF, FAMILY, HEALTH, LEARNING, LEISURE, WORK

  const filteredСategories = categories.find(
    category => category.name === props.category,
  );

  const [category, setCategory] = useState(
    filteredСategories || {
      name: 'Stuff',
      color: '#B9C3C8',
    },
  );

  // Состояние выпадающего окна для выбора category
  const [isCategoryActive, setIsCategoryActive] =
    useState(false);

  // Отображается ли картинка по выполнению задачи
  const [isDoneImgShown, setIsDoneImgShown] =
    useState(false);

  // Внесение значений инпута в стэйт
  const handleChangeInpute = e => {
    setTitle(e.target.value);
  };
  const onSetTypeOfTastOrChallenge = function () {
    setIsChallengeStarted(!isChallengeStarted);

    setType(
      (isChallengeStarted && 'Task') ||
        (!isChallengeStarted && 'Challenge'),
    );
  };

  // Начать редактировать карточку при клике на нее
  const handleEdit = e => {
    if (status !== 'incomplete') {
      return;
    }
    if (e.target.getAttribute('class') === s.starCupIcon) {
      return;
    }
    setStatus('edit');
  };

  const onDifficltChange = function (value) {
    setDifficulty(value);
  };
  const onTimeChange = function (value) {
    setTime(value);
  };
  const onDataChange = function (value) {
    setFinishDate(value);
  };

  // Сделать элемент доступным к редактированию,
  // если карточка находится в сост. 'edit' или 'create'
  const changeState = (func, arg) => {
    if (status === 'edit' || status === 'create') {
      func(arg);
    }
  };
  const onSubmit = useCallback(
    ({ title, difficulty, category, date, time, type }) =>
      dispatch(
        cardsOperations.addCards({
          title,
          difficulty,
          category,
          date,
          time,
          type,
        }),
      ),
    [dispatch],
  );
  const onEdit = useCallback(
    (
      cardId,
      { title, difficulty, category, date, time, type },
    ) =>
      dispatch(
        cardsOperations.editCard(cardId, {
          title,
          difficulty,
          category,
          date,
          time,
          type,
        }),
      ),
    [dispatch],
  );

  const onToggleComplete = useCallback(
    (
      cardId,
      { title, difficulty, category, date, time, type },
    ) =>
      dispatch(
        cardsOperations.toggleCompleted(cardId, {
          title,
          difficulty,
          category,
          date,
          time,
          type,
          status,
        }),
      ),
    [dispatch],
  );

  const card = {
    title,
    difficulty,
    category: category.name,
    date: finishDate,
    time: timer,
    type,
    status,
  };

  console.log(card.status);
  const onReadyClick = function (id) {
    // setStatus('done');
    setStatus('incomplete');

    if (props.isOnCreate) {
      onSubmit(card);
      return;
    }
    onEdit(id, card);
  };
  const onCompleteClick = function (id) {
    console.log(id);
    setStatus('Complete');
    onToggleComplete(id, card);
  };

  // ----------------------------------------------------
  return (
    <div
      className={
        !isChallengeStarted
          ? s.todoCard
          : `${s.todoCard} ${s.dark}`
      }
      onClick={handleEdit}
    >
      {/* Отображение картинки по окончанию выполнения */}

      {isDoneImgShown ? (
        <CSSTransition
          in={isDoneImgShown}
          timeout={250}
          classNames={{
            enter: s['animeCompleted-enter'],
            enterActive: s['animeCompleted-enter-active'],
          }}
        >
          <div className={s.completedContainer}>
            <p
              className={`${s.phraseCompleted} ${
                type === 'Challenge' && s.white
              }`}
            >
              COMPLETED:
              <span className={s.cutTitle}>{` ${title
                .split(' ')
                .slice(0, 3)
                .join(' ')}...`}</span>
            </p>
            <svg className={s.completedIcon}>
              <use
                href={`${sprite}#${
                  type === 'Task'
                    ? 'completed-todo'
                    : 'completed-challenge'
                }`}
              ></use>
            </svg>
            <p
              className={s.continue}
              onClick={() =>
                setIsDoneImgShown(!isDoneImgShown)
              }
            >
              Continue
            </p>
          </div>
        </CSSTransition>
      ) : (
        <CSSTransition
          in={isDoneImgShown}
          timeout={250}
          classNames={{
            exit: s['animeCard-exit'],
            exitActive: s['animeCard-exit-active'],
          }}
        >
          <div className={s.mainCardContainer}>
            <div className={s.topContainer}>
              {' '}
              {/* Иконки кубка и звезды */}
              <div className={s.levelStarCupContainer}>
                <DifficultLevelModal
                  onDifficltChange={onDifficltChange}
                  difficultlevelCameFromProps={
                    props.difficulty
                  }
                  changeState={changeState}
                />
                {isChallengeStarted ? (
                  <svg className={s.starCupIcon}>
                    <use
                      href={`${sprite}#cup-blue`}
                      onClick={onSetTypeOfTastOrChallenge}
                    ></use>
                  </svg>
                ) : (
                  <svg className={s.starCupIcon}>
                    <use
                      href={`${sprite}#star-blue`}
                      onClick={onSetTypeOfTastOrChallenge}
                    ></use>
                  </svg>
                )}
              </div>
              {/* Надпись CHALLENGE, EDIT CHALLENGE, CREATE NEW QUEST или EDIT QUEST */}
              <div className={s.operationContainer}>
                {status === 'create' ? (
                  <p className={s.operation}>
                    CREATE NEW QUEST
                  </p>
                ) : null}
                {status === 'edit' &&
                !isChallengeStarted ? (
                  <p className={s.operation}>EDIT QUEST</p>
                ) : null}
                {isChallengeStarted && status !== 'edit' ? (
                  <p className={s.operation}>CHALLENGE</p>
                ) : null}
                {isChallengeStarted && status === 'edit' ? (
                  <p className={s.operation}>
                    EDIT CHALLENGE
                  </p>
                ) : null}
                {status === 'Complete' ||
                status === 'incomplete' ? (
                  <br
                    className={`${s.operation} ${s.hidden}`}
                  ></br>
                ) : null}
              </div>
              {/* Инпут или наименование карточки */}
              {status === 'create' || status === 'edit' ? (
                <input
                  className={`${s.title} ${s.inline}`}
                  name="todo"
                  type="text"
                  value={title}
                  onChange={handleChangeInpute}
                />
              ) : (
                <p
                  className={`${s.title} ${
                    isChallengeStarted && s.white
                  }`}
                >
                  {title}
                </p>
              )}
              {/* Дата и время */}
              {isChallengeStarted ? (
                <DataTimeChelengeModal
                  timeCameFromProps={props.time}
                  dataCameFromProps={props.date}
                  onTimeChange={onTimeChange}
                  onDataChange={onDataChange}
                  changeState={changeState}
                />
              ) : (
                <DataTimeModal
                  timeCameFromProps={props.time}
                  dataCameFromProps={props.date}
                  onTimeChange={onTimeChange}
                  onDataChange={onDataChange}
                  changeState={changeState}
                />
              )}
            </div>

            <div className={s.bottomContainer}>
              {/* Группы карточек */}
              {isCategoryActive ? (
                <div
                  className={s.categoryContainer}
                  onClick={() =>
                    setIsCategoryActive(!isCategoryActive)
                  }
                >
                  <ul className={s.categoryList}>
                    {categories.map(item => (
                      <li
                        key={item.name}
                        onClick={() => setCategory(item)}
                      >
                        {item.name.toUpperCase()}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div
                className={`${
                  s.selectedCategoryContainer
                } ${isCategoryActive && s.hidden}`}
                onClick={() =>
                  changeState(
                    setIsCategoryActive,
                    !isCategoryActive,
                  )
                }
                style={{ backgroundColor: category.color }}
              >
                <p className={s.selectedCategory}>
                  {category.name.toUpperCase()}
                </p>
              </div>
              {/* Иконки save, clear, done и кнопка START*/}
              <div
                className={s.saveClearDoneStartContainer}
              >
                {status === 'edit' && (
                  <>
                    <svg
                      className={`${s.saveClearDoneIcon} ${s.saveIcon}`}
                      // onClick={() => setStatus('incomplete')}
                      onClick={() => onReadyClick(props.id)}
                    >
                      <use
                        href={`${sprite}#diskette-save`}
                      ></use>
                    </svg>

                    <div onClick={() => setModal(true)}>
                      <svg
                        className={`${s.saveClearDoneIcon} ${s.clearIcon}`}
                        alt="cross red"
                      >
                        <use
                          href={`${sprite}#cross-red-clear`}
                        ></use>
                      </svg>
                    </div>

                    <svg
                      className={`${s.saveClearDoneIcon} ${s.doneIcon}`}
                      alt="check mark"
                      onClick={() => {
                        onCompleteClick(props.id);
                        setIsDoneImgShown(true);
                      }}
                    >
                      <use
                        href={`${sprite}#check-mark`}
                      ></use>
                    </svg>
                  </>
                )}
                {status === 'create' && (
                  <>
                    <svg
                      className={`${s.saveClearDoneIcon} ${s.clearIcon}`}
                      alt="cross red"
                    >
                      <use
                        href={`${sprite}#cross-red-clear`}
                      ></use>
                    </svg>
                    <div
                      className={s.startButton}
                      onClick={() =>
                        setStatus('incomplete')
                      }
                    >
                      START
                    </div>
                  </>
                )}
              </div>
            </div>
            {/*Модалка/**/}

            <Modal
              id={props.id}
              isOpened={modalActive}
              onModalClose={setModal}
              title={`Delete this ${type}?`}
              onRemove={props.onRemove}
            ></Modal>
          </div>
        </CSSTransition>
      )}
    </div>
  );
}
