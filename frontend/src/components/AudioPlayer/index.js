import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useSelector, useDispatch } from 'react-redux';



const Player = () => {
  const song = useSelector(state => state.songs)

  return (
  <footer>
    <AudioPlayer
      autoPlay
      src={song[1].url}
      onPlay={e => console.log("onPlay")}
      // other props here
    />
  </footer>
  )
  };

export default Player
