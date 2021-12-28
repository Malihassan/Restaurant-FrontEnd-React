import { createSlice } from "@reduxjs/toolkit";

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : null;
}

let tokenID, locationcookie;
if (typeof window !== "undefined") {
  tokenID = getCookie("RTU") ? getCookie("RTU") : null;

  locationcookie = getCookie("LOC")
    ? JSON.parse(getCookie("LOC"))
    : { lat: "", lng: "" };

}

const initialState = {
  token: tokenID,
  LatLng: locationcookie,
};

const accountSlice = createSlice({
  name: "Acconut",
  initialState,
  reducers: {
    login(state, action) {
      const token = action.payload;
      state.token = token;
      document.cookie = `RTU=${token}; path=/; max-age= ${24 * 60 * 60}`;
    },
    logout(state) {
      document.cookie = `RTU=; expires=Thu, 01 Jan 1970 00:00:01 GMT`
      state.token= ''

    },
    setLocation(state, action) {
      let location = action.payload;
      state.LatLng = location
      document.cookie = `LOC=${JSON.stringify(location)}; path=/; max-age= ${
        60 * 60
      }`;
    },
  },
});

export const accountAction = accountSlice.actions;
export default accountSlice.reducer;
