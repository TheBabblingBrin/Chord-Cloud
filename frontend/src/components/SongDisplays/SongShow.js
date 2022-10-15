import { Link, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { getOneSong, getSongById, loadSongs} from '../../store/songs';


const SongShow =  () => {
  const dispatch = useDispatch()
  const { songId } = useParams();
  const song = useSelector((state) => state.songs[+songId]);
  useEffect(() => {
    dispatch(getOneSong(songId));
    dispatch(loadSongs())
  }, [dispatch, songId])

let content;
song? content =(
  <section>
    ID: {song.id}
    <br/>
    Title: {song.title}
    <br/>
    Artist: {song.User.username}
    <br/>
    <Link to="/">Back to Songs Index</Link>
  </section>
):
  content =(
      <section>
      </section>
    );

  return (
    content)
}

export default SongShow;
