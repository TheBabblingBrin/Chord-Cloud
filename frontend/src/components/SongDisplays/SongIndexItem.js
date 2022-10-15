import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const SongIndexItem = ({ song }) => {
  const dispatch = useDispatch()
  // const deleteBook = (e) => {
  //   e.preventDefault();
  //   dispatch(removeBook(book.id))
  // };

  return (
    <li>
      <Link to={`/songs/${song.id}`}>{song.title}</Link>
      {/* <Link to={`/songs/${song.id}/edit`}>Edit</Link> */}
      {/* <button onClick={deleteBook}>Delete</button> */}
    </li>
  );
};

export default SongIndexItem;
