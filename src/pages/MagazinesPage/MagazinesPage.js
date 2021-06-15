import React, { useEffect } from 'react';
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setEditItem, setModal, setModalPage, setModalType } from "../../redux/modalSlice";
import ModalWindow from "../../components/Modal/ModalWindow";
import { deleteMagazine, getAllMagazines } from "../../redux/magazineSlice";

const MagazinesPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllMagazines())
    }, []);


    const openModal = (modal, modalPage, modalType, editItem) => {
        dispatch(setModal(modal))
        dispatch(setModalPage(modalPage))
        dispatch(setModalType(modalType))
        if (editItem) dispatch(setEditItem(editItem))
    }
    const {modal} = useSelector(state => state.modal)
    const {magazines} = useSelector(state => state.magazine)
    console.log(modal)

    return (
        <>
            {modal && <ModalWindow show={modal}
                                   onHide={() => openModal(false, 0, 0, 0)}/>}
            {/*<h1 style={{fontSize: 25}}>Журналы</h1>*/}
            <Table striped bordered hover style={{textAlign: 'center'}}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Vendor code</th>
                    <th>Name</th>
                    <th>Theme</th>
                    <th>Publisher</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {magazines.map((elem, index) =>
                    <tr key={index}>
                        <td>{elem.id}
                            <Button size="sm"
                                    style={{marginLeft: 7}} variant="danger" onClick={() => dispatch(deleteMagazine(elem.id))}>Delete</Button>
                            <Button style={{marginLeft: 7}} size="sm" onClick={() => openModal(true, 0, 1, elem.id)}
                                    variant="success">Edit</Button>
                        </td>
                        <td>{elem.vendorCode}</td>
                        <td>{elem.name}</td>
                        <td>{elem.theme}</td>
                        <td>{elem.publisher}</td>
                        <td>{elem.price} ₽</td>
                    </tr>
                )}
                </tbody>
            </Table>
            <>
                <Button onClick={() => openModal(true, 0, 0)} variant="success">Добавить</Button>
            </>
        </>
    );
};

export default MagazinesPage;
