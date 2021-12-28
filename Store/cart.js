import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalMoney:0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const payload = action.payload;
      state.totalAmount ++;
      state.totalMoney += payload.price
      const itemIsExistindex = state.items.findIndex((item) => {
        return item.id === payload.id;
      });
      if (itemIsExistindex === -1) {
        state.items.push({
          id:payload.id,
          mainCategory:payload.mainCategory,
          subCategory:payload.subCategory,
          name: payload.name,
          amount:1,
          price: payload.price,
          total: payload.price,
        });
      } else {
        state.items[itemIsExistindex].amount ++;
        state.items[itemIsExistindex].total +=
        state.items[itemIsExistindex].price;
      }
    },
    removeItem(state ,action){
        const id  = action.payload.id        
        const removedItemIndex =state.items.findIndex((item)=>{return item.id === id})

        if (removedItemIndex === -1 || state.totalAmount < 0) {
            return
        }

        state.totalAmount --
        const removedItem =state.items[removedItemIndex]
        state.totalMoney -=removedItem.price
        
        if (removedItem.amount === 1) {
            state.items.splice(removedItemIndex,1)
        }else{
            removedItem.amount --
            removedItem.total -= removedItem.price
        }

    },
    clearCart(state){
      state.items = []
      state.totalAmount =0
      state.totalMoney =0
    }
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
