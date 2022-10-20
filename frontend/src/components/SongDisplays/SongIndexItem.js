import React, {useEffect, useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { setCurrentSong } from '../../store/songs';
import PlayButton from './PlayButton';

const SongIndexItem = ({ song }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentSong = useSelector(state => state.songs.currentSong)
  const [button, setButton] = useState('')
  useEffect(()=>{
    currentSong.playing === true && currentSong.id === song.id?

    setButton(<i className="fa-solid fa-pause"></i>):
    setButton(<i className="fa-solid fa-play"></i>)

  },[currentSong, dispatch])



  return (
    <div className='splash-badge'>
      <div className='hover-image'>
     <PlayButton song={song} />
      <input
        className='song-image'
      type='image'
      src={song.imageUrl}
      onClick={()=>
        history.push(`/songs/${song.id}`)}
      ></input>
      </div>
      <div className='badge-details'>
        <Link to={`/songs/${song.id}`}>
          <p>
            {song.title}
          </p>
        </Link>
        <p>{song.User.username}</p>
      </div>
    </div>
  );
};

export default SongIndexItem;
