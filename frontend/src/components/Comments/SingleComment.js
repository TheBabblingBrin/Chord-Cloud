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
  const song = useSelector((state) => state.songs.allSongs[songId])

  if (!comment.User) {
    return null;
  }

const handleDelete = async () =>{
  const deleted = await dispatch(removeComment(comment.id))
  if(deleted){
    return history.push(`/songs/${comment.songId}`)
  }
}

const date= comment.createdAt.split('T')[0]
let buttons = null
if(user){

  comment.userId === user.id?
  buttons =(
    <div>
      <button
        className='comment-button'
        onClick={()=> handleDelete()}
      >Delete</button>
    </div>)
  : buttons = null;
  }

let content = null
 comment? content =(

  <div className='comment-song'>
    <div className='comment-portrait'></div>
    <span className='comment-username'>
      {comment.User.username}
    </span>
    <p>
      {comment.body}
    </p>
  <div className='comment-item-meta'>
    {date}
    {buttons}
  </div>
  </div>
):
  content = null
;

  return (
    content)
}

export default SingleComment;
