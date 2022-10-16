import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllSongs, loadSongs } from '../../store/songs';
import { useState, useEffect } from "react";


import SongIndexItem from './SongIndexItem';

const SongsIndex = () => {
  const dispatch = useDispatch()


  const songs = useSelector(getAllSongs);
  return (
    <section>
      <ul>
        {
          songs.map(song => (
            <SongIndexItem
              song={song}
              key={song.id}
            />
          ))
        }
      </ul>
      <Link to="/songs/upload">Upload Your Own</Link>
    </section>
  );
}

export default SongsIndex;
