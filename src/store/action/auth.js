import * as actionType from "./actionTypes";
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionType.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionType.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    return {
        type: actionType.AUTH_LOGOUT
    }
}

export const checkAuth = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000 );
    }
}

export const auth = (email, password, isSignup) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4OvT2SUELwtsXHxAXICUnUPcV-pXz63w";
        if (!isSignup) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4OvT2SUELwtsXHxAXICUnUPcV-pXz63w";
        }
        axios.post(url, authData)
            .then(response => {
                // console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuth(response.data.expiresIn))
            })
            .catch(err => {
                // console.log(err);
                dispatch(authFail(err.response.data.error))
            })
    }
}