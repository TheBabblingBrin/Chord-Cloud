import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Route, Switch } from "react-router-dom";


import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SongsIndex from "./components/SongDisplays/SongIndex";
import { loadSongs, getAllSongs } from "./store/songs";
import SongShow from "./components/SongDisplays/SongShow";
import SongForm from "./components/SongDisplays/SongForm";
import Player from "./components/AudioPlayer";
import Splashpage from "./components/Splashpage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentSong = useSelector(state => state.songs.currentSong)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadSongs());
  }, [dispatch, currentSong])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={Splashpage} />
          <Route path="/songs/upload"  component={SongForm}/>
          <Route path="/songs/:songId"  component={SongShow}/>

        </Switch>
      )}
      {!!currentSong.id && (<Player song={currentSong}/>)}
    </>
  );
}

export default App;
