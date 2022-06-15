// constants

const { default: axios } = require("axios");
const { createStore, applyMiddleware } = require("redux");
const thunk = require("redux-thunk").default;

const API_URL = "https://jsonplaceholder.typicode.com/todos";
const GET_TODOS_REQUEST = "GET_TODOS_REQUEST";
const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
const GET_TODOS_FAILURE = "GET_TODOS_FAILURE";

//states

const initialTodoState = {
  todos: [],
  isLoading: false,
  error: null,
};

//actions

const gettodorequest = () => {
  return {
    type: GET_TODOS_REQUEST,
  };
};
const gettodosuccess = (todos) => {
  return {
    type: GET_TODOS_SUCCESS,
    payload: todos,
  };
};

const gettodofailure = (error) => {
  return {
    type: GET_TODOS_FAILURE,
    payload: error,
  };
};

//reducers

const todosReducer = (state = initialTodoState, action) => {
  switch (action.type) {
    case GET_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      };
    case GET_TODOS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

//
const fetchData = () => {
  return (dispatch) => {
    dispatch(gettodorequest());
    axios
      .get(API_URL)
      .then((res) => {
        const todos = res.data;

        const titles = todos.map((todo) => todo.title);

        dispatch(gettodosuccess(titles));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(gettodofailure(errorMessage));
      });
  };
};

//store

const store = createStore(todosReducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchData());
