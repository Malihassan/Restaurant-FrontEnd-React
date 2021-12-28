import { createSlice } from "@reduxjs/toolkit";
let categoriesLocalStorage;
if (typeof window !== "undefined") {
  categoriesLocalStorage = localStorage.getItem("categories")
    ? JSON.parse(localStorage.getItem("categories"))
    : [];
}
const initialState = {
  categories: categoriesLocalStorage,
  selectedCategory:''
};

const categorySlice = createSlice({
  name: "Categories",
  initialState,
  reducers: {
    addCategories(state, action) {
      const categories = action.payload;
      if (state.categories.length == 0) {
        state.categories =categories
      }
      localStorage.setItem("categories", JSON.stringify(categories));

    },
  },
});
export const categoryAction = categorySlice.actions;
export default categorySlice.reducer;
