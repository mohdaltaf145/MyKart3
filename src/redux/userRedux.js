import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    //initial state of the cart has 0 products, 0 quantity and total price is also 0
    initialState:{
        currentUser: null,
        isFetching: false,
        error: false
    },
    //reducer is a pure function thst takes an action and the previous state and returns the new state
    reducers:{
        loginStart:(state) =>{
            state.isFetching = true
        },
        loginSuccess:(state, action) =>{
            //if user is logged in succesfully then update the current user 
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure:(state) =>{
            state.isFetching = false;
            state.error = true;
        },
        logoutUser:(state) => {
            state.currentUser = null;
            
        }
    },
});

//export actions and reducers
export const { loginStart, loginSuccess, loginFailure, logoutUser } = userSlice.actions
export default userSlice.reducer;