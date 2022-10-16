import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams} from 'react-router-dom';

import { createComment } from '../../store/comments';


const CommentForm = () => {
  const dispatch = useDispatch()

  const [body, setBody] = useState('');


  const updateComment = (e) => setBody(e.target.value);
  const { songId } = useParams();


  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload ={
      body
    }

    let createdComment;
      createdComment = await dispatch(createComment(payload, songId))
      if(createdComment){
        setBody('')
      }
    }


  return (
    <section className=''>
      <form className='' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write a comment"
          required
          value={body}
          onChange={updateComment}
        />
      </form>
    </section>
  );
};

export default CommentForm;
