import { csrfFetch } from "./csrf";

const LOAD = 'comments/LOAD';
const ADD_ONE = 'comments/ADD_ONE'
const REMOVE = 'comments/REMOVE'

/****************///HELPER FUNCTIONS//*****************/
export const getAllComments = (state) => Object.values(state.comments);

/*************///ACTION CREATORS//******************/
const load = list => ({
  type: LOAD,
  list
});

const addOne = comment => ({
  type: ADD_ONE,
  comment
})

const remove = (commentId) => ({
  type: REMOVE,
  commentId
});
/*******///THUNKS//***************/
//GET comments
export const loadCommentsBySongId = (songId) => async dispatch => {
  const response = await csrfFetch(`/api/songs/${songId}/comments`);

  if (response.ok) {
    const list = await response.json();
    if(list === null){
      return
    }
    dispatch(load(list));
    return list
  }
};



//CREATE comment
export const createComment = (comment, songId) => async dispatch => {
  const response = await csrfFetch(`/api/songs/${songId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (response.ok) {
    const comment = await response.json();
    dispatch(addOne(comment));
    return comment
  }
};

export const removeComment = (commentId) => async dispatch => {
  const response = await csrfFetch(`/api/comments/${commentId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(remove(commentId));
    return response
  }
};

///UPDATE comment
export const updateComment = (comment) => async dispatch => {
  const response = await csrfFetch(`/api/comments/${comment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (response.ok) {
    const comment = await response.json();
    dispatch(addOne(comment));
    return comment
  }
}


const initialState = {};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
     const allComments = normalizeArray(action.list.Comments);
     return {...allComments}
    case ADD_ONE:
        return {
          ...state,
          [action.comment.id]: {
            ...state[action.comment.id],
            ...action.comment,
          },
        };
    case REMOVE:
      const deleteState = { ...state };
      delete deleteState[action.commentId];
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

export default commentsReducer;
