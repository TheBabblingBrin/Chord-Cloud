import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const Player = () => (
  <footer>
    <AudioPlayer
      autoPlay
      src="https://cdn.whyp.it/cf3349cc-62ee-4ac2-a2a9-ed91659e18ca.mp3"
      onPlay={e => console.log("onPlay")}
      // other props here
    />
  </footer>
);

export default Player
