import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentSong } from '../../store/songs';


const PlayButton = ({ song }) => {
  const dispatch = useDispatch()


  return (
    <li>
      <button onClick={()=> dispatch(setCurrentSong(song))}>Play</button>

    </li>
  );
};

export default PlayButton;
