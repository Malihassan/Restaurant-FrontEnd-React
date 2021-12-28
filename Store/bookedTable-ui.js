import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    showPage:false
}
const bookedtableSlice = createSlice({
    name:'BookedTablePage',
    initialState,
    reducers:{
        toggleBookedTablePage(state){
            state.showPage =!state.showPage 
        }
    }
})

export const bookedtable_ui_action = bookedtableSlice.actions
export default bookedtableSlice.reducer