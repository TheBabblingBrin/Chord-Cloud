import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react'
import './index.css'
import { isPlaying, setCurrentSong } from '../../store/songs';



const Player = () => {
  const song = useSelector(state => state.songs.currentSong)
  const playState = useSelector(state => state.songs.playing)
  const [source, changeSrc] = useState(null)
  const player = useRef();
  const dispatch = useDispatch()
  useEffect(() => {

    changeSrc(song.url)
      if(playState === true){
        player.current.audio.current.play();
        player.current.audio.current.volume = 0.2
      } else{
        player.current.audio.current.pause();


      }

  }, [song, source])

  const playIt = (status) => {
    dispatch(isPlaying(status))
    // dispatch(setCurrentSong(song))
    }


  if(!song || !song.id){
    return (
      <h2>LOADING</h2>
    )
  }


  return (
  <footer className='audio-footer'>
    <AudioPlayer ref={player}
      onPlay={()=> playIt(true)}
      onPause={()=> playIt(false)}
      className='audio-player'
      showJumpControls={true}
      crossOrigin="anonymous"
      timeFormat={"mm:ss"}
      autoPlayAfterSrcChange={true}
      layout="horizontal-reverse"
      src={source}
    />
    <div className='song-preview'>


    <img className='song-img-preview'
      src={song.imageUrl}

    ></img>
    <div className='song-preview-details'>

      <span className='song-artist-preview'>
        {song.User.username}
      </span>
      <span className='song-title-preview'>
        {song.title}
      </span>
    </div>
    </div>
  </footer>
  )
  };

export default Player
