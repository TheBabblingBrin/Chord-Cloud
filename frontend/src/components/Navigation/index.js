import React, {useEffect} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal'
import './Navigation.css';
import { getURL } from '../../store/session';

function Navigation({ isLoaded }){
  const history = useHistory();
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const url = useSelector(state => state.session.url)
  const homeURLs = ['https://chord-cloud.herokuapp.com/', 'http://localhost:3000/']

  useEffect(()=>{
    dispatch(getURL())
  }, [dispatch,url])

let navClasses;
let center = null

 const setClasses= homeURLs.includes(url)?
 (navClasses = 'nav-bar', center = 'center center-splash'): (navClasses = 'nav-bar nav-dark', center = 'center');

 const logoClasses = homeURLs.includes(url)? 'logo logo-home':'logo'

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
    <div className={navClasses}>
      <div className={center}>
        <div className={logoClasses}>
        <input
        type='image'
        src='https://i.postimg.cc/Xq3MFwFN/chord-Cloud-Full-filled.png'
        alt='chordCloud logo'
        onClick={()=> history.push('/')}
        ></input>
        </div>
      </div>
    <div className='banner-buttons'>
        {isLoaded && sessionLinks}
        {/* {navClasses && } */}
    </div>
    </div>
  );
}

export default Navigation;
