import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    //initial state of the cart has 0 products, 0 quantity and total price is also 0
    initialState:{
        products:[],
        quantity:0, //how many products inside our cart (in beginning its 0)
        total:0, //total price
    },
    //reducer is a pure function that takes an action and the previous state and returns the new state
    reducers:{
        addProduct:(state, action) => {
            state.quantity += 1;
            state.products.push(action.payload); //payload is basically our new product
            state.total += action.payload.price * action.payload.quantity;
        },
        emptyProduct:(state, action) => {
            state.products = [];
            state.quantity = 0;
        },
        zeroPrice:(state, action) => {
            state.total = 0;
        }
    },
});

//export actions and reducers
export const {addProduct, emptyProduct, zeroPrice} = cartSlice.actions
export default cartSlice.reducer;