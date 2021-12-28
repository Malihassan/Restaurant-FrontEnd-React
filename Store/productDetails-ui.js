import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    togglePage :false,
    item:{
        productId:'',
        name:'',
        description:'',
        image:'',
        price:''
    }
}
const productDetailsSlice = createSlice({
    name:'product Details',
    initialState,
    reducers:{
        toggleDetailsPage(state){
            state.togglePage =!state.togglePage
        },
        productDetails (state,action){
            const payloadItem =action.payload
            state.item.productId   =payloadItem.productId
            state.item.name =payloadItem.name
            state.item.description =payloadItem.description
            state.item.price =payloadItem.price
            state.item.image =payloadItem.image
        }
    }
})
export const productDetails_ui = productDetailsSlice.actions
export default productDetailsSlice.reducer
