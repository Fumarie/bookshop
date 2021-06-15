import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import modalReducer from '../redux/modalSlice'
import magazineReducer from "../redux/magazineSlice";
import bookReducer from "../redux/bookSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalReducer,
    magazine: magazineReducer,
    book: bookReducer
  },
});
