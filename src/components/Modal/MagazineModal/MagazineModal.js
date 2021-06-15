import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    createMagazine,
    getAllPublishers,
    getAllThemes,
    updateMagazine
} from "../../../redux/magazineSlice";

const MagazineModal = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllThemes())
        dispatch(getAllPublishers()) // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {modalType, editItem} = useSelector(state => state.modal)
    const {themes, publishers} = useSelector(state => state.magazine)

    const [createData, setCreateData] = useState({
        name: "",
        price: "",
        publisher: "",
        theme: "",
        vendorCode: ""
    })


    const changeHandler = event => {
        setCreateData({...createData, [event.target.name]: event.target.value})
    }

    const validate = () => {
        return createData.name.length > 0 && createData.price.length && createData.publisher.length && createData.theme.length && createData.vendorCode.length
    }

    const onClose = () => {
        props.onHide()
        setCreateData({
            name: "",
            price: "",
            publisher: "",
            theme: "",
            vendorCode: ""
        })
    }

    const submitHandler = event => {
        event.preventDefault()
        console.log(createData)
        const publisherId = publishers.find(publisher => publisher.publisher === createData.publisher).id
        const themeId = themes.find(theme => theme.theme === createData.theme).id
        const finalData = {name: createData.name, price: createData.price, publisherId, themeId, vendorCode: createData.vendorCode}
        if (modalType === 0) {
            dispatch(createMagazine(finalData))
        }
        else if (modalType === 1) {
            const updateData = {finalData, editItem}
            console.log(updateData)
            dispatch(updateMagazine(updateData))
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
                    {modalType === 0 ? 'Creating a new magazine' : 'Editing magazine'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler} style={{
                    margin: '0 auto',
                    maxWidth: '400px'
                }}>
                    <Form.Group size="lg" controlId="vendorCode">
                        <Form.Label>Vendor code</Form.Label>
                        <Form.Control name="vendorCode" type="text" onChange={changeHandler} value={createData.vendorCode}/>
                    </Form.Group>
                    <Form.Group size="lg" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" type="text" onChange={changeHandler} value={createData.name}/>
                    </Form.Group>
                    <Form.Group size="lg" controlId="theme">
                        <Form.Label>Theme</Form.Label>
                        <Form.Control
                            as="select"
                            name="theme"
                            autoFocus
                            type="text"
                            onChange={changeHandler}
                        >
                            <option></option>
                            {themes.map((elem, index) => <option key={index}>{elem.theme}</option>)}
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

export default MagazineModal;
