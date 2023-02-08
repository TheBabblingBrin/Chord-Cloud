import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {  } from '../../store/songs';
import { useState, useEffect } from "react";
import './index.css'
import ProfileMediaCard from './ProfileMediaCard';
const ProfileDetails = ({songId, song}) => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1);
  const media = useSelector(state => state.session.selectedUser?.User.Songs)
  const user = useSelector(state => state.session.selectedUser?.User)
  useEffect(()=>{
    console.log(media)
  },[dispatch, page])

  const selected = {
    borderBottomColor: '#333333',
    color: '#3c4047'
  }

  return (
    <div className='listening-wrapper-main'>
      <div id='profile-selection-bar'>
        <button
              className='profile-bar-button'
              style={
                page === 1?
                selected:null
              }
              onClick={e => setPage(1)}
              >Tracks</button>
        <button
              className='profile-bar-button'
              style={
                page === 2?
                selected:null
              }
              onClick={(e) => setPage(2)}
              >Albums</button>
      </div>
      <div className='listening-wrapper-left'>
        <ul className='profile-media-list'>
          {media?.map(item => <ProfileMediaCard key={`${item.id}-song-card`} song={item} user={user}/>)}
        </ul>
      </div>
      <div className='right-listening-wrapper'>
      </div>
    </div>
  );
}

export default ProfileDetails;
