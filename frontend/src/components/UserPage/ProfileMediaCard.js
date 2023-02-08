import React, {useEffect, useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { setCurrentSong } from '../../store/songs';
import PlayButton from '../SongDisplays/PlayButton';
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const ProfileMediaCard = ({ song, album, user }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentSong = useSelector(state => state.songs)
  const [button, setButton] = useState('')
  useEffect(()=>{
    currentSong.playing === true && currentSong.id === song.id?

    setButton(<i className="fa-solid fa-pause"></i>):
    setButton(<i className="fa-solid fa-play"></i>)
    song.User = user
  },[currentSong, dispatch])
  const date = dayjs(song?.updatedAt).fromNow(false)



  return (
    <div className='profile-track-body'>
      <input
        className='profile-track-image'
      type='image'
      src={song.imageUrl}
      onClick={()=>
        history.push(`/songs/${song.id}`)}
      />
      <div
        className='profile-track-content'
      >

      <div className='profile-track-header'>
        <PlayButton song={song} location={'profile-track-button'} />
      <div className='profile-track-details'>
        <span className='profile-track-artist'>{song.User?.username}</span>
        <Link to={`/songs/${song.id}`}>
          <span className='profile-track-title'>
            {song.title}
          </span>
        </Link>
      </div>
      <div className='profile-track-add-container'>

      <span id='track-updated-at'>{date === 'in a few seconds'? 'a few seconds ago': date}</span>
      </div>

      </div>
      <div
      className='profile-track-bg'
      style={{backgroundImage: `url(${song.imageUrl})`}}
      ></div>
      </div>
      </div>
  );
};

export default ProfileMediaCard;
