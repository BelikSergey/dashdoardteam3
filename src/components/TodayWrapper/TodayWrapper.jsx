import { useSelector, useDispatch } from 'react-redux';
import {
  cardsOperations,
  cardsSelectors,
} from '../../redux/cards';
// import PropTypes from 'prop-types';
import s from './TodayWrapper.module.css';

import TodoCard from '../TodoCard/TodoCard';

export default function TodayWrapper() {
  const dispatch = useDispatch();
  const cards = useSelector(cardsSelectors.getCards);
  console.log(
    '🚀 ~ file: TodayWrapper.jsx ~ line 14 ~ TodayWrapper ~ cards',
    cards.data.cards,
  );

  const today = new Date();
  const dateToCompar = `${today.getFullYear()}-${
    today.getMonth() < 9
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1
  }-${
    today.getDate() < 10
      ? `0${today.getDate()}`
      : today.getDate()
  }`;
  let filteredCards;

  if (cards.data.cards) {
    filteredCards = cards.data.cards.filter(
      ({ status, date }) =>
        status !== 'Complete' && date === dateToCompar,
    );
  }
  const onRemoveCard = cardId => {
    dispatch(cardsOperations.deleteCard(cardId));
  };

  return (
    <div className={s.container}>
      <h2 className={s.dayTitle}>TODAY</h2>

      <ul className={s.list}>
        {filteredCards &&
          filteredCards.map(
            ({
              difficulty,
              title,
              date,
              time,
              category,
              status,
              type,
              _id,
            }) => (
              <TodoCard
                key={_id}
                id={_id}
                category={category}
                date={date}
                difficulty={difficulty}
                status={status}
                time={time}
                title={title}
                type={type}
                onRemove={() => onRemoveCard(_id)}
              />
            ),
          )}
      </ul>
    </div>
  );
}
