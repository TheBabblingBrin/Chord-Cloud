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


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadSongs());
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={SongsIndex} />
          <Route path="/songs/upload"  component={SongForm}/>
          <Route path="/songs/:songId"  component={SongShow}/>

        </Switch>
      )}
      <Player />
    </>
  );
}

export default App;
