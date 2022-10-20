import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

import { getOneSong, getSongById, loadSongs, removeSong} from '../../store/songs';
import { updateSong, uploadSong } from '../../store/songs';
import ErrorList from '../ErrorList';
import FormLogo from '../FormLogo';

const SongForm = ({song, formType = 'createSong', setShowModal}) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [title, setTitle] = useState(song? song.title:'');
  const [description, setDescription] = useState(song? song.description:'' );
  const [url, setUrl] = useState(song? song.url: '');
  const [imageUrl, setImage] = useState(song? song.imageUrl:'' );
  const [albumId, setAlbumId] = useState(song? song.albumId: '');
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
  if(user?.id ===1){
    demoSong = (<button type="button"
    onClick={()=>{
      setTitle('test song 1');
      setDescription('dev test');
      setImage('https://cdn.pixabay.com/audio/2022/08/05/13-29-08-266_200x200.png');
      setUrl('https://cdn.pixabay.com/audio/2022/08/04/audio_2dde668d05.mp3');
      setAlbumId(1)
    }
    }>Demo Song</button>)
  }

  const validate = () => {
    const validationerrors = [];
    if(title.length <= 0) validationerrors.push('Please input a song title')
    if(url.length <= 0) validationerrors.push('Please input an audio source url')
    if(imageUrl.length <= 0) validationerrors.push('Please input an image source url')

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
      setShowModal(false)
       history.push(`/songs/${createdSong.id}`);
    }
  };



  return (
    <section className=''>
      <form className='' onSubmit={handleSubmit}>

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
        {demoSong}
        {hasSubmitted && errors?.length > 0 && (

                    <ErrorList errors={errors}/>
            )}
        <FormLogo />
      </form>
    </section>
  );
};

export default SongForm;
