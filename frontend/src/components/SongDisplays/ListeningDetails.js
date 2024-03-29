import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllSongs, loadSongs } from '../../store/songs';
import { useState, useEffect } from "react";
import './SongDisplays.css'
import CommentsIndex from '../Comments/CommentIndex';
import CommentBar from '../Comments/CommentBar';
const ListeningDetails = ({songId, song}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  let songs = useSelector(getAllSongs);
  if(!songs){
    return (<h2>LOADING</h2>)
  }

  return (
    <div className='listening-wrapper-main'>
        <CommentBar song={song} songId={songId}/>
      <div className='listening-wrapper-left'>
        <div className='listen-artist-details'>
          <input
            type='image'
            src={song.User?.profileImg? song.User?.profileImg: 'https://i.postimg.cc/mksDn07B/chord-Cloud-Full-removebg-preview.png'}
            onClick={()=> history.push(`/users/${song.User.id}`)}
          ></input>
          <span
            onClick={()=> history.push(`/users/${song.User.id}`)}

          >{song.User.username}</span>
        </div>
          <CommentsIndex songId={song.id} song={song} />
      </div>
      <div className='right-listening-wrapper'>

      </div>
    </div>
  );
}

export default ListeningDetails;
