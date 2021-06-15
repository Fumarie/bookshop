import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modal: false,
    modalPage: 0,
    modalType: 0,
    editItem: 0
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state, action) => {
            state.modal = action.payload
        },
        setModalType: (state, action) => {
            state.modalType = action.payload
        },
        setModalPage: (state, action) => {
            state.modalPage = action.payload
        },
        setEditItem: (state, action) => {
            state.editItem = action.payload
        }
    }
})

export const { setModal, setModalType, setModalPage, setEditItem } = modalSlice.actions;

export default modalSlice.reducer;