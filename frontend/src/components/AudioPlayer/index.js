import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import './index.css'



const Player = () => {
  const song = useSelector(state => state.songs.currentSong)
  return (
  <footer className='audio-footer'>
    <AudioPlayer
      className='audio-player'
      showJumpControls={true}
      crossOrigin="anonymous"
      timeFormat={"mm:ss"}
      autoPlayAfterSrcChange={true}
      layout="horizontal-reverse"
      src={song? song.url:null}
      onPlay={e => console.log("onPlay")}
      // other props here
    />
    <div className='song-preview'>


    <img className='song-img-preview'
      src={song.imageUrl}

    ></img>
    
    <div className='song-title-preview'></div>
    <div className='song-artist-preview'></div>
    </div>
  </footer>
  )
  };

export default Player
