import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllSongs, loadSongs } from '../../store/songs';
import { useState, useEffect } from "react";
import './SongDisplays.css'

import SongIndexItem from './SongIndexItem';

const SongsIndex = () => {
  const dispatch = useDispatch()


  let songs = useSelector(getAllSongs);
  if(!songs){
    return (<h2>LOADING</h2>)
  }
  let idx = songs.length-1
  songs = songs.slice(idx-12,idx)
  return (
    <div className='trending-tracks'>
      <div className='trending-tracks-title'>
        <text>Hear what's trending for free in the chordCloud community</text>
      </div>
      <div className='splash-box'>

        {
          songs.map(song => (
            <SongIndexItem
              song={song}
              key={song.id}
            />
          ))
        }
      </div>
    </div>
  );
}

export default SongsIndex;
