import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import routes from './routes';

// //import s from './Logout.module.scss';
// import sprite from '../../sprite.svg'

// const Logout = () => {
//   return (
//      <NavLink
//       to="/"
//       exact
//       //className={s.link}
//       // activeClassName={s.activeLink}
//     >
//       <svg /*className={s.svg}*/>
//         <use href={`${sprite}#logout`}></use>
//       </svg>
//     </NavLink>
//   )

import s from './Logout.module.scss';
import sprite from '../../sprite.svg';
import axios from 'axios';

 axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

class Logout extends Component {
  

  render() {
    return (
    <div>
      <button
        className={s.link}
        type="button"
        // onClick={onLogout}
        >
        <svg className={s.svg}>
          <use href={`${sprite}#logout`}></use>
        </svg>
      </button>
    </div>
    );
  }

}

export default Logout;

// const Logout = () => {
//   return (
//      <NavLink
//       to="/"
//       exact
//       className={s.link}
//     >
//       <svg className={s.svg}>
//         <use href={`${sprite}#logout`}></use>
//       </svg>
//     </NavLink>
//   )
// }

// export default Logout;

// onClick={this.handleGoBack}