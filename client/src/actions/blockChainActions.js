import { SET_BLOCKCHAIN_PRODUCT, GET_BLOCKCHAIN_PRODUCT } from "./types";
import axios from "axios";

export const setBlockProduct = (data) => dispatch => {
    axios
      .post("http://localhost:3000/api/Product", data, {headers: {
        'content-type': 'application/json'
    }})
      .then(res => {
        dispatch({
          type: SET_BLOCKCHAIN_PRODUCT,
          payload: res.data
        });
      });
  };

export const getBlockProduct = () => dispatch => {
    axios
    .get("http://localhost:3000/api/Product")
    .then(res => {
      dispatch({
        type: GET_BLOCKCHAIN_PRODUCT,
        payload: res.data
      });
    });
}

export const rejectBlockProduct = (id) => dispatch => {
    axios
    .delete(`http://localhost:3000/api/Product/${id}`);
}