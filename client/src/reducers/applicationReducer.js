import { APPLICATION_SUBMIT_FEEDBACK,
         GET_APPLICATION, 
         GET_APPLICATIONS,
         GET_ATAPPLICATION,
         GET_ATAPPLICATIONS } from "../actions/types";

const initialState = {
  applications: [],
  application: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case APPLICATION_SUBMIT_FEEDBACK:
      return {
        ...state,
        application: action.payload
      };
    case GET_APPLICATION:
      return {
         ...state,
         application: action.payload 
      };
      case GET_APPLICATIONS:
      return {
         ...state,
         applications: action.payload 
      };
      case GET_ATAPPLICATIONS:
      return {
         ...state,
         applications: action.payload 
      };
      case GET_ATAPPLICATION:
      return {
         ...state,
         application: action.payload 
      };
    default:
      return state;
  }
}
