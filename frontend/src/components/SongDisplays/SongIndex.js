import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllSongs, loadSongs } from '../../store/songs';
import { useState, useEffect } from "react";
import './SongDisplays.css'

import SongIndexItem from './SongIndexItem';

const SongsIndex = () => {
  const dispatch = useDispatch()


  const songs = useSelector(getAllSongs);
  return (
    <div className='trending-tracks'>
      <div className='trending-tracks-title'>
        <h2>Hear what's trending for free in the chordCloud community</h2>
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
      <Link to="/songs/upload">Upload Your Own</Link>
    </div>
  );
}

export default SongsIndex;
