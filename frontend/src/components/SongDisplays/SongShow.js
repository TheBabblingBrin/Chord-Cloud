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


const SongShow =  () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const { songId } = useParams();
  const song = useSelector((state) => state.songs.allSongs[songId]);
  const user = useSelector((state) => state.session.user)
  const [showUpdateSongForm, setShowUpdateSongForm] = useState(false);
  const songs = useSelector((state) => state.songs.allSongs);

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



const handleDelete = async () =>{
  history.push('/')
  const deleted = await dispatch(removeSong(song.id))

}

let buttons = null
if(user){

  song.userId === user.id?
  buttons =(
    <div >
      <button
        onClick={(e)=> handleDelete()}
      >Delete</button>
      <button
        onClick={()=>{
          dispatch(loadSongs())
          setShowUpdateSongForm(!showUpdateSongForm)}
        }
        >Update</button>
    </div>)
  : buttons = null;
}




  return (

  <div className='splash-page splash-page-other'>
    <div className='song-details-banner'>

    ID: {song.id}
    <br/>
    Title: {song.title}
    <br/>
    Artist: {song?.User?.username}
    <PlayButton song={song}/>
    {buttons}
    {showUpdateSongForm?
        <SongForm
        song={song}
        hideForm={() => setShowUpdateSongForm(!showUpdateSongForm)}
        formType={'editSong'}
        />:null}

      <br/>
    </div>
    <CommentsIndex songId={song.id} />
    <Link to="/">Back to Songs Index</Link>
  </div>)


}

export default SongShow;
