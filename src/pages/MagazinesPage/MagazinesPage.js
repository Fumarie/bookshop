import React, { useEffect } from 'react';
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setEditItem, setModal, setModalPage, setModalType } from "../../redux/modalSlice";
import ModalWindow from "../../components/Modal/ModalWindow";
import { deleteMagazine, getAllMagazines, getAllThemes, getAveragePrice } from "../../redux/magazineSlice";

const MagazinesPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllMagazines())
        dispatch(getAllThemes())// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const openModal = (modal, modalPage, modalType, editItem) => {
        dispatch(setModal(modal))
        dispatch(setModalPage(modalPage))
        dispatch(setModalType(modalType))
        if (editItem) dispatch(setEditItem(editItem))
    }
    const {modal} = useSelector(state => state.modal)
    const {magazines, themes, avgPrice} = useSelector(state => state.magazine)
    console.log(modal)

    const changeHandler = event => {
        console.log(event.target.value)
        const themeName = event.target.value
        dispatch(getAveragePrice(themeName))
    }

    return (
        <>
            {modal && <ModalWindow show={modal}
                                   onHide={() => openModal(false, 0, 0, 0)}/>}
            {/*<h1 style={{fontSize: 25}}>Журналы</h1>*/}
            <div style={{width: '100%', display: 'flex', justifyContent: "flex-end"}}>
                <InputGroup className="mt-3" style={{maxWidth: '25%'}}>
                    <InputGroup.Prepend>
                        <InputGroup.Text>{avgPrice ? Number(avgPrice) : 0} ₽</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        as="select"
                        name="genre"
                        autoFocus
                        type="text"
                        onChange={changeHandler}
                    >
                        <option></option>
                        {themes.map((elem, index) => <option key={index}>{elem.theme}</option>)}
                    </Form.Control>
                </InputGroup>
            </div>
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
