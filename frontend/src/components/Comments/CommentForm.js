import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams} from 'react-router-dom';

import { createComment } from '../../store/comments';


const CommentForm = () => {
  const dispatch = useDispatch()

  const [body, setBody] = useState('');
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setSubmitted] = useState(false)
  const user = useSelector(state => state.session.User)
  useEffect(() => {
    if(hasSubmitted === true){

      const errors = validate();

      errors.length > 0? setErrors(errors): setErrors([])
    }

  },[body, setSubmitted])

  const validate = () => {
    const validationerrors = [];
    // if(!user) validationerrors.push('Please login to post a comment')
    if(body.length <= 0) validationerrors.push('Please input a comment before submission')
    return  validationerrors;
  }

  const updateComment = (e) => setBody(e.target.value);
  const { songId } = useParams();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true)
    const errors = validate();

    if (errors.length > 0) {return setErrors(errors);}

    let payload ={
      body
    }

    let createdComment;
      createdComment = await dispatch(createComment(payload, songId))
      if(createdComment){
        setSubmitted(false)
        setBody('')
      }
    }


  return (
    <section className=''>
      <form className='' onSubmit={handleSubmit}>
        <input
          type="text"
          className='comment-input'
          placeholder="Write a comment"
          value={body}
          onChange={updateComment}
          />
          {hasSubmitted && errors.length > 0 && (
            <div>

                        <ul>
                            {errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
            </div>
                )}
      </form>
    </section>
  );
};

export default CommentForm;
