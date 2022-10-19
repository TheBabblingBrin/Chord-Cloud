import { Link, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { useHistory, Redirect } from 'react-router-dom';



import { getOneSong, getSongById, loadSongs, removeSong} from '../../store/songs';
import SongForm from '../SongFormModal/SongForm';
import CommentsIndex from '../Comments/CommentIndex';
import { loadCommentsBySongId } from '../../store/comments';
import PlayButton from './PlayButton';
import { getURL } from '../../store/session';
import ListeningDetails from './ListeningDetails';


const SongShow =  () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const { songId } = useParams();
  const song = useSelector((state) => state.songs.allSongs[songId]);
  const songs = useSelector((state) => state.songs.allSongs);
  const [showUpdateSongForm, setShowUpdateSongForm] = useState(false);

  useEffect(() => {
    dispatch(loadCommentsBySongId(songId))
    dispatch(getURL())
  }, [dispatch, songs, song])


  if(!song || !song.User){
    setTimeout(()=>{
      dispatch(loadSongs())
    },500)
    return (
      <h2>LOADING</h2>
    )
  }





let date = song.updatedAt.split('T')[0]




  return (

  <div className='splash-page splash-page-other'>

    <div
    className='song-details-banner'>
    <div className='song-title-container'>
    <PlayButton song={song}/>
    <div id="sound-title">
      <span>
      {song.title}
      </span>
      </div>
    <div id="sound-artist">
      <span>{song?.User?.username}</span>
      </div>
    </div>
    <span id='song-updated-at'>Updated at {date}</span>
    <input
    className="sound-container-img"
    type="image"
    src={song.imageUrl}>
    </input>
    {/* {showUpdateSongForm?
        <SongForm
        song={song}
        hideForm={() => setShowUpdateSongForm(!showUpdateSongForm)}
        formType={'editSong'}
        />:null} */}

      <br/>
    </div>
    <div className='song-banner-bg'
    style={{backgroundImage: `url(${song.imageUrl})`}}>
    </div>
    <ListeningDetails song={song} songId={song.id}/>
  </div>)


}

export default SongShow;
