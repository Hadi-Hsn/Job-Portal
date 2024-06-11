import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  deleteJobReducer,
  loadJobReducer,
  loadJobSingleReducer,
  registerAjobReducer,
  updateJobReducer,
} from "./reducers/jobReducer";

import {
  allUserReducer,
  deleteUserReducer,
  userApplyJobReducer,
  userReducerLogout,
  userReducerProfile,
  userReducerSignIn,
  userReducerSignUp,
} from "./reducers/userReducer";

// combine reducers
const reducer = combineReducers({
  loadJobs: loadJobReducer,
  signIn: userReducerSignIn,
  logOut: userReducerLogout,
  userProfile: userReducerProfile,
  singleJob: loadJobSingleReducer,
  userJobApplication: userApplyJobReducer,
  allUsers: allUserReducer,
  signUp: userReducerSignUp,
  registerJob: registerAjobReducer,
  deleteJob: deleteJobReducer,
  deleteUser: deleteUserReducer,
  updateJob: updateJobReducer,
});

// initial state
let initialState = {
  signIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  mode: {
    mode: "light",
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
