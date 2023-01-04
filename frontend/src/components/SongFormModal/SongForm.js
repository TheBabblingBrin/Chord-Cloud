import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { loadAlbums } from '../../store/albums';

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
  const [albumId, setAlbumId] = useState(song? song.albumId: null);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setSubmitted] = useState(false)


  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateUrl = (e) => setUrl(e.target.value);
  const updateImage = (e) => setImage(e.target.value);
  const updateAlbumId = (e) => setAlbumId(e.target.value);

  const user = useSelector(state => state.session.user)
  // const albums = useSelector(state => Object.keys(state.albums))

  useEffect(() => {
    dispatch(loadAlbums())
    if(hasSubmitted === true){

    }

  },[title, url, imageUrl, setSubmitted])


  let demoSong = null
  if(user?.id ===1){
    demoSong = (<button type="button"
    onClick={()=>{
      setTitle('test song 1');
      setDescription('dev test');
      // setImage('https://cdn.pixabay.com/audio/2022/08/05/13-29-08-266_200x200.png');
      setUrl('https://cdn.pixabay.com/audio/2022/08/04/audio_2dde668d05.mp3');
      // setAlbumId(1)
    }
    }>Demo Song</button>)
  }
  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true)
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
          type="text"
          placeholder="Audio URL"
          value={url}
          onChange={updateUrl}
        />
         {/* <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateImage}
        /> */}
        <input type="file" value={''} onChange={updateFile} />

         {/* <input
          type="number"
          placeholder="Album ID"
          value={albumId}
          onChange={updateAlbumId}
        /> */}
        <button
          type="submit"
          // disabled={errors.length > 0}
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
