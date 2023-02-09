import { Link, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { useHistory, Redirect } from 'react-router-dom';

import { removeComment } from '../../store/comments';
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)



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

const date = dayjs(comment?.updatedAt).fromNow(false)
let buttons = null
if(user){

  comment.userId === user.id?
  buttons =(
    <div>
      <button
        className='comment-button'
        onClick={()=> handleDelete()}
      ><i className="fa-solid fa-trash"></i></button>
    </div>)
  : buttons = null;
  }

let content = null
 comment? content =(

  <div className='comment-song'>
    <div className='comment-portrait'>
    <input
      className='comment-portrait-image'
      type='image'
      src={comment?.User.profileImg? comment.User.profileImg: 'https://i.postimg.cc/mksDn07B/chord-Cloud-Full-removebg-preview.png'}
      onClick={()=>
        history.push(`/users/${comment.User.id}`)}
      />
    </div>
  <div className='comment-content'>

  <div className='comment-item-meta'>
    <span
    className='comment-username'
    onClick={()=> history.push(`/users/${comment.User.id}`)}

    >
      {comment.User.username}
    </span>
   <div className='comment-end'>
     {date === 'in a few seconds'? 'a few seconds ago': date}
    {buttons}
    </div>
  </div>
    <p>
      {comment.body}
    </p>
      </div>
  </div>
):
  content = null
;

  return (
    content)
}

export default SingleComment;
