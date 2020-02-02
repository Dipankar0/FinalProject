import axios from "axios";
import {SAVE_CERTIFICATE, GET_CERTIFICATE, GET_ERRORS } from "./types";
 

export const setCertificate = (id) => dispatch => {
  axios
  .post(`/api/certificate/${id}`)
  .then(res => {
    dispatch({
      type: SAVE_CERTIFICATE,
      payload: res.data
    });
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const getCertificate = (id) => dispatch => {
  axios
  .get(`/api/certificate/${id}`)
  .then(res=>{
    dispatch({
      type: GET_CERTIFICATE,
      payload: res.data
    });
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
  })
  );
}

export const findProduct = (id) => dispatch => {
  axios
  .get(`/api/certificate/userCertificate/${id}`)
  .then(res=>{
    dispatch({
      type: GET_CERTIFICATE,
      payload: res.data
    });
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
  })
  );
}

export const getCertForApp = (id) => dispatch => {
  axios
  .get(`/api/certificate/oneCertificate/${id}`)
  .then(res=>{
    dispatch({
      type: GET_CERTIFICATE,
      payload: res.data
    });
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
  })
  );
}

export const setRejection = (id) => dispatch => {
  axios
  .post(`/api/certificate/rejection/${id}`)
  .then(res => {
    dispatch({
      type: SAVE_CERTIFICATE,
      payload: res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
  })
  );
}
export const setRejectReason = (data, id) => dispatch => {
  axios
  .post(`/api/certificate/rejectionReason/${id}`, data)
  .then(res => {
    dispatch({
      type: SAVE_CERTIFICATE,
      payload: res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
  })
  );
}
