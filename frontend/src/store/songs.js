import { csrfFetch } from "./csrf";

const LOAD = 'songs/LOAD';
const ADD_ONE = 'songs/ADD_ONE'

///HELPER FUNCTIONS///
export const getAllSongs = (state) => Object.values(state.songs);
export const getSongById = (state) => (id) => state.songs

///ACTION CREATORS///
const load = list => ({
  type: LOAD,
  list
});

const addOne = song => ({
  type: ADD_ONE,
  song
})

///thunks///
export const loadSongs = () => async dispatch => {
  const response = await csrfFetch(`/api/songs`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
    return list
  }
};

export const getOneSong = (songId) => async dispatch => {
  const response = await csrfFetch(`/api/songs/${songId}`);

  if (response.ok) {
    const song = await response.json();
    dispatch(addOne(song));
    return song
  }
};

const initialState = {};

const songsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD:
     const allSongs = normalizeArray(action.list.Songs);
     return {...state, ...allSongs}
    case ADD_ONE:
      if (!state[action.song.id]) {
        newState = { ...state };
        newState[action.song.id] = action.song;
        return newState;
        }
        return {
          ...state,
          [action.song.id]: {
            ...state[action.song.id],
            ...action.song,
          },
        };
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
