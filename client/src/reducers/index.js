import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import applicationReducer from "./applicationReducer";
import certificateReducer from "./certificateReducer";

export default combineReducers({
  auth: authReducer,
  application: applicationReducer,
  certificate: certificateReducer,
  errors: errorReducer
});
