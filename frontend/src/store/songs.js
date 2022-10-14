import { csrfFetch } from "./csrf";

const LOAD = 'songs/LOAD';

///HELPER FUNCTIONS///
export const getAllSongs = (state) => Object.values(state.songs);
export const getSongById = (id) => (state) => state.songs[id];


///ACTION CREATORS///
const load = list => ({
  type: LOAD,
  list
});


///thunks///
export const loadSongs = () => async dispatch => {
  const response = await csrfFetch(`/api/songs`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};
const initialState = {};

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
     const allSongs = normalizeArray(action.list.Songs);
     return {
      ...state,...allSongs}
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
