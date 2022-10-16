import { Link, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { useHistory, Redirect } from 'react-router-dom';

import { removeComment } from '../../store/comments';




const SingleComment =  ({comment}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const {songId} = params
  const user = useSelector((state) => state.session.user)
  const song = useSelector((state) => state.songs[songId])

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
if(user){

  comment.userId === user.id || song.userId === user.id ?
  buttons =(
    <div>
      <button
        onClick={()=> handleDelete()}
      >Delete</button>
    </div>)
  : buttons = null;
  }

let content = null
 comment? content =(

  <section>
    User: {comment.User.username}
    <br/>
    {comment.body}
    <br/>
    {comment.createdAt}
    {buttons}
      <br/>
  </section>
):
  content = null
;

  return (
    content)
}

export default SingleComment;
