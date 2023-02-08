import { Link, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { useHistory, Redirect } from 'react-router-dom';

import { getOneUser, getURL } from '../../store/session';
import './index.css'
import ProfileDetails from './ProfileDetails';

const UserPage =  () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const params = useParams()
  const {userId} = params
  const user = useSelector((state) => state.session.selectedUser);


  useEffect(() => {
    dispatch(getURL())
    dispatch(getOneUser(userId))
}, [dispatch])






  return (
  <div className='splash-page splash-page-other'>

    <div
    className='user-details-banner'>
    <input
          className="user-container-img"
          type="image"
          src={user?.User.profileImg? user.User.profileImg: 'https://i.postimg.cc/mksDn07B/chord-Cloud-Full-removebg-preview.png'}></input>
    <div className='user-title-container'>
    <div className="user-title">
      <span>
      {user?.User?.username}
      </span>
      </div>

    </div>

    </div>

    <div className='user-banner-bg'
    // style={{backgroundImage: `url()`}}
    >
    </div>
    <ProfileDetails/>
  </div>)


}

export default UserPage;
