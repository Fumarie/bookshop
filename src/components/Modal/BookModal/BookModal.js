import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllPublishers } from "../../../redux/magazineSlice";
import { createBook, getAllAuthors, getAllGenres, updateBook } from "../../../redux/bookSlice";

const BookModal = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllGenres())
        dispatch(getAllAuthors())
        dispatch(getAllPublishers()) // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {modalType, editItem} = useSelector(state => state.modal)
    const {genres, authors} = useSelector(state => state.book)
    const {publishers} = useSelector(state => state.magazine)

    const [createData, setCreateData] = useState({
        name: "",
        price: "",
        publisher: "",
        author: "",
        genre: "",
        vendorCode: "",
        year: ""
    })

    const validate = () => {
        const year = Number(createData.year)
        if(year < 0) return false
        const yearNow = new Date().getFullYear()
        return year <= yearNow && year > 0 && createData.year.length && createData.name.length && createData.price.length && createData.publisher.length && createData.author.length && createData.genre.length && createData.vendorCode.length
    }

    const changeHandler = event => {
        setCreateData({...createData, [event.target.name]: event.target.value})
        console.log(createData)
    }

    const onClose = () => {
        props.onHide()
        setCreateData({
            name: "",
            price: "",
            publisher: "",
            author: "",
            genre: "",
            vendorCode: "",
            year: ""
        })
    }

    const submitHandler = event => {
        event.preventDefault()
        console.log(createData)
        const publisherId = publishers.find(publisher => publisher.publisher === createData.publisher).id
        const genreId = genres.find(genre => genre.genre === createData.genre).id
        const authorId = authors.find(author => author.author === createData.author).id
        const finalData = {
            name: createData.name,
            price: createData.price,
            publisherId,
            authorId,
            genreId,
            vendorCode: createData.vendorCode,
            year: createData.year
        }
        console.log(finalData)
        if (modalType === 0) {
            dispatch(createBook(finalData))
        } else if (modalType === 1) {
            const updateData = {finalData, editItem}
            console.log(updateData)
            dispatch(updateBook(updateData))
        }
        onClose()
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {modalType === 0 ? 'Creating a new book' : 'Editing the book'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler} style={{
                    margin: '0 auto',
                    maxWidth: '400px'
                }}>
                    <Form.Group size="lg" controlId="vendorCode">
                        <Form.Label>Vendor code</Form.Label>
                        <Form.Control name="vendorCode" type="text" onChange={changeHandler}
                                      value={createData.vendorCode}/>
                    </Form.Group>
                    <Form.Group size="lg" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" type="text" onChange={changeHandler} value={createData.name}/>
                    </Form.Group>
                    <Form.Group size="lg" controlId="genre">
                        <Form.Label>Genre</Form.Label>
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
                    </Form.Group>
                    <Form.Group size="lg" controlId="publisher">
                        <Form.Label>Publisher</Form.Label>
                        <Form.Control
                            as="select"
                            name="publisher"
                            type="text"
                            onChange={changeHandler}
                        >
                            <option></option>
                            {publishers.map((elem, index) => <option key={index}>{elem.publisher}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group size="lg" controlId="author">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            as="select"
                            name="author"
                            type="text"
                            onChange={changeHandler}
                        >
                            <option></option>
                            {authors.map((elem, index) => <option key={index}>{elem.author}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group size="lg" controlId="Year">
                        <Form.Label>Year</Form.Label>
                        <Form.Control name="year" type="number" onChange={changeHandler}/>
                    </Form.Group>
                    <Form.Group size="lg" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control name="price" type="number" onChange={changeHandler}/>
                    </Form.Group>
                    {modalType === 0 ? <Button variant="info" block size="lg" type="submit" disabled={!validate()}>
                            Create
                        </Button>
                        : <Button variant="info" block size="lg" type="submit" disabled={!validate()}>
                            Apply
                        </Button>
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BookModal;
