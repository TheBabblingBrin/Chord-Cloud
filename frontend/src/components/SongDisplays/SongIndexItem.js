import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const SongIndexItem = ({ song }) => {
  const dispatch = useDispatch()


  return (
    <li>
      <Link to={`/songs/${song.id}`}>{song.title}</Link>

    </li>
  );
};

export default SongIndexItem;
