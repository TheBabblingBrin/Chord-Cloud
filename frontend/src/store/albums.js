import { csrfFetch } from "./csrf";

const LOAD = 'albums/LOAD';
const ADD_ONE = 'albums/ADD_ONE'
const REMOVE = 'albums/REMOVE'

/****************///HELPER FUNCTIONS//*****************/
export const getAllAlbums = (state) => Object.values(state.albums);

/*************///ACTION CREATORS//******************/
const load = list => ({
  type: LOAD,
  list
});

const addOne = album => ({
  type: ADD_ONE,
  album
})

const remove = (albumId) => ({
  type: REMOVE,
  albumId
});
/*******///THUNKS//***************/
//GET albums
export const loadAlbums = () => async dispatch => {
  const response = await csrfFetch(`/api/albums`);
  if (response.ok) {
    const list = await response.json();
    if(list === null){
      return
    }
    dispatch(load(list));
    return list
  }
};



//CREATE album
export const createalbum = (album, songId) => async dispatch => {
  const response = await csrfFetch(`/api/songs/${songId}/albums`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(album),
  });
  if (response.ok) {
    const album = await response.json();
    dispatch(addOne(album));
    return album
  }
};

export const removealbum = (albumId) => async dispatch => {
  const response = await csrfFetch(`/api/albums/${albumId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(remove(albumId));
    return response
  }
};

///UPDATE album
export const updatealbum = (album) => async dispatch => {
  const response = await csrfFetch(`/api/albums/${album.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(album),
  });
  if (response.ok) {
    const album = await response.json();
    dispatch(addOne(album));
    return album
  }
}


const initialState = {};

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
     const allalbums = normalizeArray(action.list.Albums);
     return {...allalbums}
    case ADD_ONE:
        return {
          ...state,
          [action.album.id]: {
            ...state[action.album.id],
            ...action.album,
          },
        };
    case REMOVE:
      const deleteState = { ...state };
      delete deleteState[action.albumId];
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

export default albumsReducer;
