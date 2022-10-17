import { Link, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { useHistory, Redirect } from 'react-router-dom';



import { getOneSong, getSongById, loadSongs, removeSong} from '../../store/songs';
import SongForm from './SongForm';
import CommentsIndex from '../Comments/CommentIndex';
import { loadCommentsBySongId } from '../../store/comments';


const SongShow =  () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const { songId } = useParams();
  const song = useSelector((state) => state.songs[songId]);
  const user = useSelector((state) => state.session.user)
  const [showUpdateSongForm, setShowUpdateSongForm] = useState(false);
  const songs = useSelector((state) => state.songs);
  // useEffect(() => {
  //   dispatch(loadSongs());
  //   dispatch(loadCommentsBySongId(songId))

  // }, [dispatch, songs.length])



  // if (!song.User) {
  //   return null;
  // }

const handleDelete = async () =>{
  history.push('/')
  const deleted = await dispatch(removeSong(song.id))
  // if(deleted){
  //   return
  // }
}

let buttons = null
if(user){

  song.userId === user.id?
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
}


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
    <CommentsIndex songId={song.id} />
    <Link to="/">Back to Songs Index</Link>
  </section>
):
  content = null
;

  return (
    content)
}

export default SongShow;
