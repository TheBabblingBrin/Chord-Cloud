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
  const songs = useSelector((state) => state.songs.allSongs);
  const singlesong = useSelector((state) => state.songs.singleSong)
  const song = useSelector((state) => state.songs.allSongs[songId]);
  const [showUpdateSongForm, setShowUpdateSongForm] = useState(false);
  useEffect(() => {
    dispatch(getURL())
    dispatch(loadCommentsBySongId(songId))
    dispatch(getOneSong(songId))

  }, [dispatch, songId])

  if(!song|| !song.User){
    setTimeout(()=>{
      dispatch(getOneSong(songId))
    }, 0)
    return (
      <h1>LOADING</h1>
    )
  }





const date = new Date(song?.updatedAt).toLocaleDateString()



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
    <span id='song-updated-at'>{song.updatedAt === song.createdAt? 'Uploaded on': 'Updated on'} {date}</span>
    <input
    className="sound-container-img"
    type="image"
    src={song.imageUrl}>
    </input>
    </div>
    <div className='song-banner-bg'
    style={{backgroundImage: `url(${song.imageUrl})`}}>
    </div>
    <ListeningDetails song={song} songId={song.id}/>
  </div>)


}

export default SongShow;
