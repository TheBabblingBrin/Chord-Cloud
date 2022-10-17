import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';


import { updateSong, uploadSong } from '../../store/songs';

const SongForm = ({song, hideForm = null, formType = 'createSong'}) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [title, setTitle] = useState(song? song.title:null );
  const [description, setDescription] = useState(song? song.description:null );
  const [url, setUrl] = useState(song? song.url: null);
  const [imageUrl, setImage] = useState(song? song.imageUrl:null );
  const [albumId, setAlbumId] = useState(song? song.albumId: null);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setSubmitted] = useState(false)


  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateUrl = (e) => setUrl(e.target.value);
  const updateImage = (e) => setImage(e.target.value);
  const updateAlbumId = (e) => setAlbumId(e.target.value);

  const user = useSelector(state => state.session.user)

  useEffect(() => {
    if(hasSubmitted === true){

      const errors = validate();

      errors.length > 0? setErrors(errors): setErrors([])
    }

  },[title, url, imageUrl, setSubmitted])


  let demoSong = null
  if(user.id ===1){
    demoSong = (<button type="button"
    onClick={()=>{
      setTitle('test song 1');
      setDescription('dev test');
      setImage('https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800701/imageUrl/maxresdefault_hjogtz.jpg');
      setUrl('https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799036/audioUrl/BRAD_MEHLDAU_When_It_Rains_odfnzx.mp4');
      setAlbumId(1)
    }
    }>Demo Song</button>)
  }

  const validate = () => {
    const validationerrors = [];
    if(title.length <= 0) validationerrors.push('Please input a song title')
    if(url.length <= 0) validationerrors.push('Please input an audio source url')
    if(imageUrl.length <= 0) validationerrors.push('Please input an audio source url')

    ///TODO Album ID ownership validations once Albums are implemented

    return  validationerrors;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true)
    const errors = validate();

    if (errors.length > 0) {return setErrors(errors);}


    const payload = {
      ...song,
      title,
      description,
      url,
      imageUrl,
      albumId
    };
    let createdSong;
   formType === 'createSong'? createdSong = await dispatch(uploadSong(payload)): createdSong = await dispatch(updateSong(payload));
    if (createdSong) {
      setSubmitted(false)
      if(formType === 'editSong'){
        hideForm()
      }
       history.push(`/songs/${createdSong.id}`);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    if(formType === 'editSong'){
      hideForm()
    }else{
      return history.push(`/`);
    }
  };

  return (
    <section className=''>
      <form className='' onSubmit={handleSubmit}>
      {hasSubmitted && errors.length > 0 && (
                    <ul>
                        {errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
            )}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={updateTitle}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={updateDescription}
        />
        <input
          type="url"
          placeholder="Audio URL"
          value={url}
          onChange={updateUrl}
        />
         <input
          type="url"
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateImage}
        />
         <input
          type="number"
          placeholder="Album ID"
          value={albumId}
          onChange={updateAlbumId}
        />
        <button
          type="submit"
          disabled={errors.length > 0}
        >{formType === 'createSong'? 'Upload Song':'Update Song'}</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
        {demoSong}
      </form>
    </section>
  );
};

export default SongForm;
