import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postProductToApi } from "../../redux/product/productSlice";
import { useNavigate } from "react-router-dom";
import './style.scss';
import { Button, Form, Toast, ToastContainer } from "react-bootstrap";

export const AddProductComponent = () => {
    const [productList, setProductList] = useState({});
    const [successToastr, setSuccessToastr] = useState(false);
    const closeToastr = () => setSuccessToastr(!successToastr);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setProductList((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const createProduct = () => {
        setSuccessToastr(true);
        // dispatch(addProduct({ ...productList }));
        dispatch(postProductToApi({...productList}));
        setProductList({});
    }

    return (
        <>
            <div className="add-product">
                <div className="outline">
                    <div className="heading text-center p-2">
                        <h3 style={{ color: '#56595c' }}>Add Product</h3>
                    </div>
                    <Form className="mt-3">
                        <Form.Group className="mb-3" controlId="productName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product Name"
                                name="productName"
                                value={productList?.productName || ''}
                                onChange={onInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="productDescription">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product Description"
                                name="productDescription"
                                value={productList?.productDescription || ''}
                                onChange={onInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Price"
                                value={productList?.price || ''}
                                name="price"
                                onChange={onInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="productRating">
                            <Form.Label>Product Rating</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product Rating"
                                name="productRating"
                                value={productList?.productRating || ''}
                                onChange={onInputChange}
                            />
                        </Form.Group>
                        <div className="product-btns mt-4">
                            <Button className="btn btn-success" type="button" onClick={() => createProduct()}>
                                Create Product
                            </Button>
                            <Button className="btn btn-secondary" type="button" onClick={() => navigate('/')}>
                                View Product
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
            <ToastContainer
                className="p-3"
                position={'top-end'}
                style={{ zIndex: 1 }}
            >
                <Toast
                    show={successToastr}
                    onClose={closeToastr}
                    bg="success"
                    delay={2000}
                    autohide
                >
                    <Toast.Header closeButton>
                        <strong className="me-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body style={{ color: 'white' }}>
                        Product Created Successfully!!
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}