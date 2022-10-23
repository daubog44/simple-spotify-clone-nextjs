import { createStore, action } from "easy-peasy";

export const store = createStore({
  activeSongs: [],
  activeSong: null,
  chengeActiveSongs: action((state: any, payload) => {
    state.activeSongs = payload;
  }),
  chengeActiveSong: action((state: any, payload) => {
    state.activeSong = payload;
  }),
});
