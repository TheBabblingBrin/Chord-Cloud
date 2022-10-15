import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSongById } from '../../store/songs';

const SongShow = () => {
  const dispatch = useDispatch()
  const { songId } = useParams();
  const song = useSelector(getSongById(songId))


  return (
    <section>
      ID: {song.id}
      <br/>
      Title: {song.title}
      <br/>
      Artist: {song.userId.username}
      <br/>
      <Link to="/">Back to Songs Index</Link>
    </section>
  );
}

export default SongShow;
