import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    toggleCart:false
}
const cartSlice_ui = createSlice({
    name:'Cart Ui',
    initialState,
    reducers :{
        toggleCart(state){
            state.toggleCart =! state.toggleCart
        }
    }
})

export const cartAction_ui = cartSlice_ui.actions
export default cartSlice_ui.reducer 