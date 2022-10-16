import { Link, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { useHistory, Redirect } from 'react-router-dom';

import { removeComment } from '../../store/comments';






const SingleComment =  ({comment}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.session.user)


  if (!comment || !comment.id) {
    return null;
  }
const handleDelete = async () =>{
  const deleted = await dispatch(removeComment(comment.id))
  if(deleted){
    return history.push(`/songs/${comment.songId}`)
  }
}

let buttons = null
  comment.User.username === user.username?
  buttons =(
    <div>
      <button
        onClick={()=> handleDelete()}
      >Delete</button>
      <button
        // onClick={()=> setShowUpdateSongForm(!showUpdateSongForm)}
        >Update</button>
    </div>)
  : buttons = null;


let content = null
 comment? content =(

  <section>
    User: {comment.User.username}
    <br/>
    {comment.body}
    <br/>
    {comment.createdAt}
    {buttons}
    {/* {showUpdateSongForm?
        <SongForm
        song={song}
        hideForm={() => setShowUpdateSongForm(!showUpdateSongForm)}
        formType={'editSong'}
        />:null} */}

      <br/>
  </section>
):
  content = null
;

  return (
    content)
}

export default SingleComment;
