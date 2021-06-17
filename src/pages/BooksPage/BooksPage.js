import React, { useEffect, useState } from 'react';
import ModalWindow from "../../components/Modal/ModalWindow";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setEditItem, setModal, setModalPage, setModalType } from "../../redux/modalSlice";
import { deleteBook, getAllBooks, getAllGenres, getAveragePrice } from "../../redux/bookSlice";

const BooksPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllBooks())
        dispatch(getAllGenres()) // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch(getAveragePrice())
    }, []);


    const openModal = (modal, modalPage, modalType, editItem) => {
        dispatch(setModal(modal))
        dispatch(setModalPage(modalPage))
        dispatch(setModalType(modalType))
        if (editItem) dispatch(setEditItem(editItem))
    }

    const {modal} = useSelector(state => state.modal)
    const {books, genres, avgPrice} = useSelector(state => state.book)

    const changeHandler = event => {
        console.log(event.target.value)
        const genreName = event.target.value
        dispatch(getAveragePrice(genreName))
    }

    return (
        <>
            {modal && <ModalWindow show={modal}
                                   onHide={() => openModal(false, 1, 0, 0)}/>}
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
                        {genres.map((elem, index) => <option key={index}>{elem.genre}</option>)}
                    </Form.Control>
                </InputGroup>
            </div>
            <Table striped bordered hover style={{textAlign: 'center'}}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Vendor code</th>
                    <th>Name</th>
                    <th>genre</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Year</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {books.map((elem, index) =>
                    <tr key={index}>
                        <td>{elem.id}
                            <Button size="sm"
                                    style={{marginLeft: 7}} variant="danger"
                                    onClick={() => dispatch(deleteBook(elem.id))}>Delete</Button>
                            <Button style={{marginLeft: 7}} size="sm" onClick={() => openModal(true, 1, 1, elem.id)}
                                    variant="success">Edit</Button>
                        </td>
                        <td>{elem.vendorCode}</td>
                        <td>{elem.name}</td>
                        <td>{elem.genre}</td>
                        <td>{elem.author}</td>
                        <td>{elem.publisher}</td>
                        <td>{elem.writingYear}</td>
                        <td>{elem.price} ₽</td>
                    </tr>
                )}
                </tbody>
            </Table>
            <>
                <Button onClick={() => openModal(true, 1, 0)} variant="success">Добавить</Button>
            </>
        </>
    );
};

export default BooksPage;
