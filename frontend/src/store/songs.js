import { csrfFetch } from "./csrf";

const LOAD = 'songs/LOAD';
const ADD_ONE = 'songs/ADD_ONE'
const REMOVE = 'songs/REMOVE'
const SET_CURRENT = 'songs/SET_CURRENT'

/****************///HELPER FUNCTIONS//*****************/
export const getAllSongs = (state) => Object.values(state.songs.allSongs);
export const getSongById = (state) => (id) => state.songs.allSongs

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

export const setCurrentSong = (song) => ({
  type: SET_CURRENT,
  song
})
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

//DELETE SONG
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



const initialState = {
  allSongs: {},
  currentSong: {}
};

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
     const allSongs = normalizeArray(action.list.Songs);
     return {...state, allSongs:{...allSongs}}
    case ADD_ONE:
      if (!state.allSongs[action.song.id]) {
        console.log('imade it')
       const newState = {
        ...state,
        allSongs:{[action.song.id]: action.song}
        };
        console.log('newstate_______________',newState)
        return newState;
        }
        return {
          ...state,
              allSongs:{[action.song.id]: {
                ...state[action.song.id],
                ...action.song,}
          },
        };
    case REMOVE:
      const deleteState = { ...state };
      delete deleteState.allSongs[action.songId];
      return deleteState;
    case SET_CURRENT:
      const playState = {...state, currentSong: action.song}
      return playState
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
