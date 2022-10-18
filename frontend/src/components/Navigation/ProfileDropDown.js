import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './Navigation.css'

const ProfileDropDown = ({user, logout}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <div className="profile-dropdown">

          <span>{user.username}</span>
          <span>{user.email}</span>
          <button onClick={logout}>Log Out</button>

    </div>
  );
}

export default ProfileDropDown;
