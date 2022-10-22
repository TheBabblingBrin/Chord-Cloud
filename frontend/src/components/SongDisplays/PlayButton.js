import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { setCurrentSong } from '../../store/songs';


const PlayButton = ({ song }) => {
  const dispatch = useDispatch()
  const currentSong = useSelector(state => state.songs.currentSong)
  const [button, setButton] = useState(<i className="fa-solid fa-play"></i>)
  const playing = useSelector(state => state.songs.playing)

  useEffect(()=>{
    if(playing === true && currentSong.id === song.id){
      setButton(<i className="fa-solid fa-pause"></i>)
    }else{
      setButton(<i className="fa-solid fa-play"></i>)
    }


  },[playing, currentSong, dispatch])



  return (
      <button
      className='play-button'
      onClick={()=>
        dispatch(setCurrentSong(song))}>
        {button}
      </button>

  );
};

export default PlayButton;
