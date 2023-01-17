import { csrfFetch } from "./csrf";

const LOAD = 'songs/LOAD';
const ADD_ONE = 'songs/ADD_ONE'
const REMOVE = 'songs/REMOVE'
const SET_CURRENT = 'songs/SET_CURRENT'
const PLAYING = 'songs/PLAYING'

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

export const isPlaying = (status) =>({
  type: PLAYING,
  status
})
/*******///THUNKS//***************/
export const loadSongs = () => async dispatch => {
  const response = await csrfFetch(`/api/songs?page=1&size=20`);

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
  // if(song.imageUrl === ''){
  //   song.imageUrl = 'https://res.cloudinary.com/degkakjou/image/upload/v1666387344/DALL_E_2022-10-21_17.15.36_-_an_album_cover_with_a_record_made_from_bone_in_the_style_of_vaporware_njte74.png'
  // }

  const {title,
    description,
    url,
    imageUrl,
    albumId } = song;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("audioType", url.type);
    formData.append("imageType", imageUrl.type)
    formData.append("songFiles", url)
    formData.append("songFiles", imageUrl)
    formData.append("albumId", albumId);
  const response = await csrfFetch('/api/songs', {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
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
  const {title,
    description,
    url,
    imageUrl,
    albumId } = song;
  const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("audioType", url.type? url.type: 'audio');
    formData.append("imageType", imageUrl.type? imageUrl.type : 'image')
    formData.append("songFiles", url)
    formData.append("songFiles", imageUrl)
    formData.append("albumId", albumId);
    console.log(formData)
  const response = await csrfFetch(`/api/songs/${song.id}`, {
    method: "PUT",
    headers: { "Content-Type": "multipart/form-data"},
    body: formData,
  });
  if (response.ok) {
    const song = await response.json();
    dispatch(addOne(song));
    return song
  }
}



const initialState = {
  playing: false,
  allSongs: {},
  singleSong: {},
  currentSong: {playing:true}
};

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
     const allSongs = normalizeArray(action.list.Songs);
     return {...state, allSongs:{...allSongs}}
    case ADD_ONE:
      if (!state.allSongs[action.song.id]) {
       const newState = {
        ...state,
        allSongs:{...state.allSongs, [action.song.id]: action.song}
        };
        return newState;
        }
        const updatedState = { ...state, allSongs: {...state.allSongs}}
        updatedState.allSongs[action.song.id] = action.song
        updatedState.singleSong = {...action.song}
        return updatedState
    case REMOVE:
      const deleteState = { ...state };
      delete deleteState.allSongs[action.songId];
      return deleteState;
    case SET_CURRENT:
      let playState = {...state, currentSong: action.song}
      if(state.currentSong && state.currentSong.id === action.song.id){
        playState= {...state, playing:!state.playing, currentSong:{ ...action.song, playing:!state.currentSong.playing}}

      }else {
        playState.currentSong.playing = true
        playState.playing = true
      }
      return playState
    case PLAYING:
      return {...state, playing: action.status}
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
