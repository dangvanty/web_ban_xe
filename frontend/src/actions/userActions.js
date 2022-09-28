import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS

} from "../constants/userConstants";

import axios from "axios";


// register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });
    
        const config = { headers: { "Content-Type": "multipart/form-data" } };
    
        const { data } = await axios.post(
          `http://localhost:4000/api/v1/register`,
          userData,
          config
        );
    
        dispatch({ 
            type: REGISTER_SUCCESS, 
            payload: data.user
         });
    }
    catch (error) {
        dispatch({
             type: REGISTER_FAIL,
             payload: error.response.data.message 
        });
    }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  