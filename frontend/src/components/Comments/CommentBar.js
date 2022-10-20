import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { useHistory} from 'react-router-dom';

import { getOneSong, getSongById, loadSongs, removeSong} from '../../store/songs';
import CommentForm from './CommentForm';
import './index.css'
import SongFormModal from '../SongFormModal';

const CommentBar= ({songId}) => {
  const dispatch = useDispatch()
  const history = useHistory();
  const song = useSelector((state) => state.songs.allSongs[songId]);
  const user = useSelector((state) => state.session.user)
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
  }, [dispatch])

  const handleDelete = async () =>{
    history.push('/')
    const deleted = await dispatch(removeSong(song.id))

  }
let buttons = null
if(user){

  song.userId === user.id?
  buttons =(
    <div >
      <button
        className='cb-button'
        onClick={(e)=> handleDelete()}
      ><i className="fa-solid fa-trash"></i></button>
      <SongFormModal style="cb-button" formType='editSong'song={song}/>
    </div>)
  : buttons = null;
}
  return (
    <div className='comment-bar-wrapper'>
    <div className="comment-bar">
      <div className='comment-user-image'>
        <input
          type='image'
          src='https://i.postimg.cc/mksDn07B/chord-Cloud-Full-removebg-preview.png'
          ></input>
      </div>
        <CommentForm />
    </div>
    <div className='cb-button-wrapper'>
    {buttons}
    </div>
    </div>
  );
}

export default CommentBar;
