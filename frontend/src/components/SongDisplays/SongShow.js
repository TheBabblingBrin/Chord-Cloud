import { Link, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { getOneSong, getSongById, loadSongs} from '../../store/songs';
import SongForm from './SongForm';


const SongShow =  () => {
  const dispatch = useDispatch()
  const { songId } = useParams();
  const song = useSelector((state) => state.songs[songId]);
  const user = useSelector((state) => state.session.user)
  const [showUpdateSongForm, setShowUpdateSongForm] = useState(false);
  const [editSongId, setEditSongId] = useState(null);
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    dispatch(getOneSong(songId));
    dispatch(loadSongs())
  }, [dispatch, songId])



  if (!song || !song.id) {
    return null;
  }


let buttons = null
  song.User.username === user.username?
  buttons =(
    <div>
      <button>Delete</button>
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
        songId={song.id}
        hideForm={() => setShowUpdateSongForm(!showUpdateSongForm)}
        formType={'editSong'}
        />:null}

      <br/>
    <Link to="/">Back to Songs Index</Link>
  </section>
):
  content = null
;

  return (
    content)
}

export default SongShow;
