import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react'
import './index.css'



const Player = () => {
  const song = useSelector(state => state.songs.currentSong)
  const playState = useSelector(state => state.songs.currentSong.playing)


  const player = useRef();

  useEffect(() => {
    if(song){

      if(song.playing === true){
        player.current.audio.current.play();

      } else{
        player.current.audio.current.pause();

      }
    }

  }, [song, playState])



  return (
  <footer className='audio-footer'>
    <AudioPlayer ref={player}
      className='audio-player'
      showJumpControls={true}
      crossOrigin="anonymous"
      timeFormat={"mm:ss"}
      autoPlayAfterSrcChange={true}
      layout="horizontal-reverse"
      src={song? song.url:null}
      onPlay={e => console.log('playing')}
    />
    <div className='song-preview'>


    <img className='song-img-preview'
      src={song.imageUrl}

    ></img>

    <div className='song-artist-preview'>
      {song.User.username}
    <div className='song-title-preview'>{song.title}</div>
      </div>

    </div>
  </footer>
  )
  };

export default Player
