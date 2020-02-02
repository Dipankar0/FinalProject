import {GET_CERTIFICATE, SAVE_CERTIFICATE, SET_BLOCKCHAIN_PRODUCT, GET_BLOCKCHAIN_PRODUCT} from "../actions/types";

const initialState = {
certificate: {},
blockProduct: {},
blockProducts: []
};

export default function(state = initialState, action) {
switch (action.type) {
 case SAVE_CERTIFICATE:
  return {
    ...state,
    certificate: action.payload
  }
 case GET_CERTIFICATE:
 return {
   ...state,
   certificate: action.payload
 }
 case SET_BLOCKCHAIN_PRODUCT:
 return {
   ...state,
   blockProduct: action.payload
 }
 case GET_BLOCKCHAIN_PRODUCT:
 return {
   ...state,
   blockProducts: action.payload
 }
default:
 return state;
}
}
