import React, {useEffect, useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { setCurrentSong } from '../../store/songs';


const PlayButton = ({ song }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentSong = useSelector(state => state.songs.currentSong)
  const [button, setButton] = useState(<i className="fa-solid fa-play"></i>)
  const playing = useSelector(state => state.songs.playing)

  useEffect(()=>{
    const pressed = document.getElementById(`play-id-${song.id}`)
    if(playing === true && currentSong.id === song.id){
      setButton(<i className="fa-solid fa-pause"></i>)
      // pressed.style.opacity = '1'
    }else{
      setButton(<i className="fa-solid fa-play"></i>)
      // pressed.style.opacity = '0'
    }


  },[playing, currentSong, dispatch])



  return (
      <button
      className='play-button'
      id={`play-id-${song.id}`}
      onClick={()=>
        dispatch(setCurrentSong(song))}>
        {button}
      </button>

  );
};

export default PlayButton;
