import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_URL = 'session/setURL'
const VIEW_USER = 'user/viewUser'

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
const viewUser = (user) => {
  return {
    type: VIEW_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const setURL = (url) => {
  return{
    type: SET_URL,
    url
  };
}

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const getOneUser = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/users/${userId}`);
  console.log("FINDING HER BOSS+++++++++++++++")
  if (response.ok) {
    const user= await response.json();
    dispatch(viewUser(user));
    return user
  }
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};



export const signup = (user) => async (dispatch) => {
  const {image, username, email, password, firstName, lastName } = user;
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("imageType", image.type)
  formData.append("image", image)
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  const response = await csrfFetch(`/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

export const getURL =() => async (dispatch) => {
    const url = await window.location.href
    dispatch(setURL(url))
    return url
}

const initialState = { user: null, url: null, selectedUser: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case VIEW_USER:
      newState = Object.assign({}, state);
      newState.selectedUser = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case SET_URL:
      newState = Object.assign({}, state);
      newState.url = action.url
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
