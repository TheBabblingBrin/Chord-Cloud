import { Link, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { useHistory, Redirect } from 'react-router-dom';



import { getOneSong, getSongById, loadSongs, removeSong} from '../../store/songs';
import SongForm from './SongForm';
import CommentsIndex from '../Comments/CommentIndex';


const SongShow =  () => {
  const dispatch = useDispatch()
  const history = useHistory();

  const { songId } = useParams();
  const song = useSelector((state) => state.songs[songId]);
  const user = useSelector((state) => state.session.user)
  const [showUpdateSongForm, setShowUpdateSongForm] = useState(false);

  useEffect(() => {
    dispatch(getOneSong(songId));
    dispatch(loadSongs)
  }, [dispatch, songId])



  if (!song || !song.id) {
    return null;
  }
const handleDelete = async () =>{
  const deleted = await dispatch(removeSong(song.id))
  if(deleted){
    return history.push('/')
  }
}

let buttons = null
  song.User.username === user.username?
  buttons =(
    <div>
      <button
        onClick={()=> handleDelete()}
      >Delete</button>
      <button
        onClick={()=> setShowUpdateSongForm(!showUpdateSongForm)}
        >Update</button>
    </div>)
  : buttons = null;


let content = null
 song? content =(

  <section>
    ID: {song.id}
    <br/>
    Title: {song.title}
    <br/>
    Artist: {song.User.username}
    {buttons}
    {showUpdateSongForm?
        <SongForm
        song={song}
        hideForm={() => setShowUpdateSongForm(!showUpdateSongForm)}
        formType={'editSong'}
        />:null}

      <br/>
    <CommentsIndex />
    <Link to="/">Back to Songs Index</Link>
  </section>
):
  content = null
;

  return (
    content)
}

export default SongShow;
