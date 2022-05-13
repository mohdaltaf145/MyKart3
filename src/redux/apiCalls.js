import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import { publicRequest } from '../requestMethods';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        //making api request to our backend api to login with the username and password send from Login.jsx to theis function as user
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data));
    }catch(err) {
        dispatch(loginFailure())
    }
}

export const register = async (dispatch, user) => {
    try{
        //making api request to our backend api to login with the username and password send from Login.jsx to theis function as user
        await publicRequest.post("/auth/register", user)
    }catch(err) {
        
    }
}
