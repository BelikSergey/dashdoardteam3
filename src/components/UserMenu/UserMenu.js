import React from 'react';
//import s from './UserMenu.module.scss'
// import Logout from '../Logout/Logout';
import { connect } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';

// const isAuthanticated


const UserMenu = ({ avatar, name, onLogout }) => (
//   <div /*className={s.container}*/>
//     <span /*className={s.wrapper}*/>
//       <p /*className={s.letter}*/>J</p> {name}
//     </span>
//      <p /*className={s.hidden}*/>Your email</p>

// const UserMenu = ({ email }) => {
//   console.log('email', email);
  // const mail = 'Jacob@gm.com';
  // if (email) {
  //   
  //   const letter = email.slice(0, 1);
  //   const mail = email.split("@")[0];
  // }
  
  
  //.substring(0, str.indexOf(','));
  return (
  <div className={s.container}>
    <span className={s.wrapper}>
      <p className={s.letter}>{email}</p>
    </span>
     <p className={s.hidden}>{email}</p>

  </div>
  )
};
const mapStateToProps = state => ({
  email: authSelectors.getUserEmail(state),
 
});

// const mapDispatchToProps = {
//   onLogout: authOperations.logOut,
// };

export default connect(mapStateToProps)(UserMenu);

// export default UserMenu;