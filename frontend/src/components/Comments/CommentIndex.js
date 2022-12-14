import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { loadCommentsBySongId } from '../../store/comments';
import CommentForm from './CommentForm';
import SingleComment from './SingleComment';
import CommentBar from './CommentBar';
const dayjs = require('dayjs')



const CommentsIndex= ({song, songId}) => {
  const dispatch = useDispatch()
  const comments = useSelector((state)=> Object.values(state.comments));

  useEffect(() => {
    dispatch(loadCommentsBySongId(songId));
  }, [dispatch, comments.length])

  const songComments = comments.filter(comment => comment.songId == songId).reverse()

  return (
    <div className='comment-index'>
    <div className='song-description'>{song.description}


    </div>
    <div className='comment-index-counter'>
    <i className="fa-solid fa-comment"></i>
    {songComments.length} comments
        </div>
    <div className='comment-list'>
        {comments?
          songComments.map(comment => (
            <SingleComment
              comment={comment}
              key={comment.id}
            />
          )):null
        }
    </div>
    </div>
  );
}

export default CommentsIndex;
