import React from 'react';
import MagazineModal from "./MagazineModal/MagazineModal";
import { useSelector } from "react-redux";
import BookModal from "./BookModal/BookModal";

const ModalWindow = (props) => {
    const {modalPage} = useSelector(state => state.modal)
    return (
        <>
            {modalPage === 0 ?
                <MagazineModal {...props} />
                :
                <BookModal {...props} />}
        </>
    )
        ;
};

export default ModalWindow;
