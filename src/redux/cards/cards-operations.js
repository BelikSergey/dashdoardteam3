import axios from 'axios';
import {
  fetchAllCardsRequest,
  fetchAllCardsSuccess,
  fetchAllCardsError,
  addCardRequest,
  addCardSuccess,
  addCardError,
  editCardRequest,
  editCardSuccess,
  editCardError,
  deleteCardRequest,
  deleteCardSuccess,
  deleteCardError,
} from './cards-actions';

const fetchCards = () => dispatch => {
  dispatch(fetchAllCardsRequest());
  axios.defaults.baseURL =
    'https://questify-backend.goit.global/';

  axios
    .get('/card')
    .then(({ data }) =>
      dispatch(fetchAllCardsSuccess(data)),
    )
    .catch(error =>
      dispatch(fetchAllCardsError(error.message)),
    );
};

const addCards = card => dispatch => {
  // const card = { name, number };

  dispatch(addCardRequest());

  axios.defaults.baseURL =
    'https://questify-backend.goit.global/';

  axios
    .post('/card', { ...card })
    .then(({ data }) => dispatch(addCardSuccess(data)))
    .catch(error => dispatch(addCardError(error.message)));
};
const deleteCard = cardId => dispatch => {
  dispatch(deleteCardRequest());
  axios.defaults.baseURL =
    'https://questify-backend.goit.global/';

  axios
    .delete(`/card/${cardId}`)
    .then(() => dispatch(deleteCardSuccess(cardId)))
    .catch(error =>
      dispatch(deleteCardError(error.message)),
    );
};

const editCard = (cardId, card) => dispatch => {
  dispatch(editCardRequest());
  axios.defaults.baseURL =
    'https://questify-backend.goit.global/';

  axios
    .patch(`/card/${cardId}`, { ...card })
    .then(() => dispatch(editCardSuccess(cardId)))
    .catch(error => dispatch(editCardError(error.message)));
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  fetchCards,
  editCard,
  addCards,
  deleteCard,
};
