import { GET_ERRORS,
         APPLICATION_SUBMIT_FEEDBACK, 
         GET_APPLICATION, 
         GET_APPLICATIONS,
         GET_ATAPPLICATION,
         GET_ATAPPLICATIONS,
         GET_APP_ID } from "./types";
import axios from "axios";

export const applyForCert = (applicationData, history) => dispatch => {
  axios
    .post("api/applications/halalapplication", applicationData, {headers: {
      'content-type': 'multipart/form-data'
  }})
    .then(res => {
      dispatch({
        type: APPLICATION_SUBMIT_FEEDBACK,
        payload: res.data
      });
      history.push("/applications");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};




export const getApplications = () => dispatch => {
  axios
  .get("/api/applications")
  .then(res => 
    dispatch({
      type: GET_APPLICATIONS,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const getCurrentApp = id => dispatch => {
  axios
  .get(`/api/applications/${id}`)
  .then(res => 
    dispatch({
      type: GET_APPLICATION,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const getAppsForAt = () => dispatch => {
  axios
  .get("/api/atApplications")
  .then(res => 
  dispatch({
    type: GET_ATAPPLICATIONS,
    payload: res.data
  })
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const getCurrentAtApp = (id) => dispatch => {
  axios
  .get(`/api/atApplications/${id}`)
  .then(res => 
  dispatch({
    type: GET_ATAPPLICATION,
    payload: res.data
  })
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const certAccept = (id, history) => dispatch => {
  axios
  .get(`/api/atApplications/getAppId/${id}`)
  .then(res =>{
    dispatch({
      type: GET_APP_ID,
      payload: res.data
    });
    history.push("/certificate");
    }
    )
  
};