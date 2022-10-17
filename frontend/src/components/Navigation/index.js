import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal'
import './Navigation.css';

function Navigation({ isLoaded }){
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className='nav-bar'>
      <div className='logo'>
        <input
        type='image'
        src='https://i.postimg.cc/1tcyt4wx/chord-Cloud-Full-removebg-preview.png'
        alt='chordCloud logo'
        onClick={()=> history.push('/')}
        ></input>
      </div>
    <div>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
    </div>
    </div>
  );
}

export default Navigation;
