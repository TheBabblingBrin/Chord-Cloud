import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong } from '../../store/songs';

const SongIndexItem = ({ song }) => {
  const dispatch = useDispatch()
  const currentSong = useSelector(state => state.songs.currentSong)

  return (
    <div className='splash-badge'>
      <input
      type='image'
      src={song.imageUrl}
      onClick={()=>
        dispatch(setCurrentSong(song))}
      ></input>
      <Link to={`/songs/${song.id}`}>{song.title}</Link>
      <p>{song.User.username}</p>

    </div>
  );
};

export default SongIndexItem;
