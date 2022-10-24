import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { WaveSurfer, WaveForm, } from "wavesurfer-react";





const AudioWave = ({song}) =>{
  const currentsong = useSelector(state => state.songs.currentSong)
  const playState = useSelector(state => state.songs.playing)
  const dispatch = useDispatch()
  const wavesurferRef = useRef();
  let myAudio = new Audio(song.url);
  let audioContextNode = new (window.AudioContext || window.webkitAudioContext)();
  console.log(audioContextNode)


useEffect(()=>{
  if (wavesurferRef.current && currentsong.id) {

    wavesurferRef.current.load(currentsong.url);
    wavesurferRef.audioContext = audioContextNode;

  }
}, [song, dispatch, currentsong])

useEffect(()=>{
  if(playState === true){
    wavesurferRef.current.play()
  }else{
    wavesurferRef.current.pause()

  }

},[playState])

  const handleWSMount = useCallback(
    (waveSurfer) => {

      wavesurferRef.current = waveSurfer;

      if (wavesurferRef.current) {
        wavesurferRef.audioContext = audioContextNode;
      }
      console.log(wavesurferRef, '+++++++++++++++')

        if (window) {
          window.surferidze = wavesurferRef.current;
        }
      }

  );


  // const play = useCallback(() => {
  //   wavesurferRef.current.playPause();
  // }, []);



  return (
    <div className="App">
      <WaveSurfer  onMount={handleWSMount}>
        <WaveForm
        id="waveform"
        cursorColor="transparent"
        audioContext={audioContextNode}
        waveColor={ '#A8DBA8'}
        progressColor={ '#3B8686'}
        height={ 65}
        mediaControls={ true}
        normalize={ true}
        mediaReadyBeforeWavesurferInstantiated={ true}

        >

        </WaveForm>
        <div id="timeline" />
      </WaveSurfer>


        <button>Play / Pause</button>

    </div>
  );
}

export default AudioWave
