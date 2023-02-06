import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { loadAlbums } from '../../store/albums';

import { getOneSong, getSongById, loadSongs, removeSong} from '../../store/songs';
import { updateSong, uploadSong } from '../../store/songs';
import ErrorList from '../ErrorList';
import FormLogo from '../FormLogo';
import LoadingSpinner from '../Loading';
const SongForm = ({song, formType = 'createSong', setShowModal}) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [title, setTitle] = useState(song? song.title:'');
  const [description, setDescription] = useState(song? song.description:'' );
  const [url, setUrl] = useState(song? song.url: '');
  const [imageUrl, setImage] = useState(song? song.imageUrl:'' );
  const [albumId, setAlbumId] = useState(song? song.albumId: null);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)



  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateAlbumId = (e) => setAlbumId(e.target.value);

  const user = useSelector(state => state.session.user)
  // const albums = useSelector(state => Object.keys(state.albums))

  useEffect(() => {
    dispatch(loadAlbums())
    if(hasSubmitted === true){

    }

  },[title, url, imageUrl, setSubmitted])



  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const updateSongUrl = (e) => {
    const file = e.target.files[0];
    if (file) setUrl(file);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true)
    setIsLoading(true)

    const validationErrors = []

    const payload = {
      ...song,
      title,
      description,
      url,
      imageUrl,
      albumId
    };
    let createdSong;
   if(formType === 'createSong'){
     createdSong = await dispatch(uploadSong(payload))
     .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors)
      validationErrors.push(...data.errors)
      setIsLoading(false)
      setErrors(validationErrors)

    });
    // setSubmitted(false)

   }else{

     createdSong = await dispatch(updateSong(payload))
     .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors([...errors, ...data.errors]);
    });
  }
  // setSubmitted(false)

   if (createdSong) {
     setIsLoading(false)
      setShowModal(false)

       history.push(`/songs/${createdSong.id}`);

    }
  };

  if(isLoading){
    return  (
    <LoadingSpinner />)
  }


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

            <label for='song-file-upload' className='song-file spot-upload-label'>
            {url.name ? url.name : "Audio"}

                        <input
                            id='song-file-upload'
                            type="file"
                            // value={''}
                            onChange={updateSongUrl} />
                    </label>

        <label for='file-img-upload' className='image-file spot-upload-label'>
        {imageUrl.name ? imageUrl.name : "Image"}

                        <input
                            id='file-img-upload'
                            type="file"
                            // value={''}
                            onChange={updateFile} />
                    </label>

        <button
          type="submit"
          // disabled={errors.length > 0}
        >{formType === 'createSong'? 'Upload Song':'Update Song'}</button>
        {hasSubmitted && errors?.length > 0 && (

                    <ErrorList errors={errors}/>
            )}
        <FormLogo />
      </form>
    </section>
  );
};

export default SongForm;
