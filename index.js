const { createStore, applyMiddleware } = require("redux");
// const { createStore, applyMiddleware , combineReducers } = require("redux");
const { default: logger } = require("redux-logger");

const ADDPRODUCT = "ADDPRODUCT";
const GETPRODUCT = "GETPRODUCT";
// const ADDUSER = "ADDUSER";
// const GETUSER = "GETUSER";

//state
const initialProductState = {
  products: ["biriyani", "vendi"],
  count: 0,
};
// const initialUserState = {
//   users: ["biddut", "fahim"],
//   count: 0,
// };

// console.log(initialState);

////////action/////////
//product
const addProduct = (productValue) => {
  return {
    type: ADDPRODUCT,
    payload: productValue,
  };
};
const getProduct = () => {
  return {
    type: GETPRODUCT,
  };
};

// //user
// const addUser = (value) => {
//   return {
//     type: ADDUSER,
//     payload: value,
//   };
// };
// const getUser = () => {
//   return {
//     type: GETUSER,
//   };
// };

//creating reducers
const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case ADDPRODUCT:
      return {
        products: [...state.products, action.payload],
        count: state.products.length,
      };
    case GETPRODUCT:
      return {
        ...state,
      };
    default:
      return state;
  }
};

// const userReducer = (state = initialUserState, action) => {
//   switch (action.type) {
//     case ADDUSER:
//       return {
//         products: [...state.users, action.payload],
//         count: state.users.length,
//       };
//     case GETUSER:
//       return {
//         ...state,
//       };
//     default:
//       return state;
//   }
// };

//store

// const rootReducer = combineReducers({
//   productR: productReducer,
//   userR: userReducer,
// });

const store = createStore(productReducer, applyMiddleware(logger));

store.subscribe(() => {
  console.log(store.getState());
});

// store.dispatch(increamenrtAction());
store.dispatch(getProduct());
store.dispatch(addProduct("shorif"));
// store.dispatch(getUser());
// store.dispatch(addUser("SAIMUR"));
