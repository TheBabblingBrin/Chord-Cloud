import { csrfFetch } from "./csrf";

const LOAD = 'songs/LOAD';
const ADD_ONE = 'songs/ADD_ONE'
const REMOVE = 'songs/REMOVE'

/****************///HELPER FUNCTIONS//*****************/
export const getAllSongs = (state) => Object.values(state.songs);
export const getSongById = (state) => (id) => state.songs

/*************///ACTION CREATORS//******************/
const load = list => ({
  type: LOAD,
  list
});

const addOne = song => ({
  type: ADD_ONE,
  song
})

const remove = (songId) => ({
  type: REMOVE,
  songId
});
/*******///THUNKS//***************/
export const loadSongs = () => async dispatch => {
  const response = await csrfFetch(`/api/songs`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
    return list
  }
};

//GET SONG
export const getOneSong = (songId) => async dispatch => {
  const response = await csrfFetch(`/api/songs/${songId}`);

  if (response.ok) {
    const song = await response.json();
    dispatch(addOne(song));
    return song
  }
};

//CREATE SONG
export const uploadSong = (song) => async dispatch => {
  const response = await csrfFetch('/api/songs', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  });
  if (response.ok) {
    const song = await response.json();
    dispatch(addOne(song));
    return song
  }
};

export const removeSong = (songId) => async dispatch => {
  const response = await csrfFetch(`/api/songs/${songId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(remove(songId));
    return response
  }
};

///UPDATE SONG
export const updateSong = (song) => async dispatch => {
  const response = await csrfFetch(`/api/songs/${song.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  });
  if (response.ok) {
    const song = await response.json();
    dispatch(addOne(song));
    return song
  }
}


const initialState = {};

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
     const allSongs = normalizeArray(action.list.Songs);
     return {...state, ...allSongs}
    case ADD_ONE:
      if (!state[action.song.id]) {
       const newState = {
        ...state,
        [action.song.id]: action.song
        };
        return newState;
        }
        return {
          ...state,
          [action.song.id]: {
            ...state[action.song.id],
            ...action.song,
          },
        };
    case REMOVE:
      const deleteState = { ...state };
      delete deleteState[action.songId];
      return deleteState;
     default:
      return state;
    }
    }

function normalizeArray(dataArray){
  if (!dataArray instanceof Array) throw new Error('Normalize problem: data invalid')
  const obj = {}
  dataArray.forEach(element => {
    obj[element.id] = element
  })
  return obj
}

export default songsReducer;
