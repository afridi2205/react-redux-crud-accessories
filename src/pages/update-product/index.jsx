import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { patchProductToApi, updateProduct } from "../../redux/product/productSlice";
import { getSelectedProduct } from "../../redux/selectors/productSelector";

export const UpdateProductComponent = ({ show, onHide, getLastEditedProductName }) => {
    const [updateProductList, setUpdateProductList] = useState({});
    const { selectedProduct } = useSelector(getSelectedProduct);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedProduct && Object.keys(selectedProduct).length > 0) {
            setUpdateProductList(selectedProduct);
        }
    }, [selectedProduct]);
    
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateProductList((prev) => ({
            ...prev, 
            [name]: value 
        }));
    };

    const editProduct = () => {
        getLastEditedProductName(updateProductList.productName); // sending the updated product name to the parent comp
        // dispatch(updateProduct(updateProductList));
        dispatch(patchProductToApi(updateProductList))
        .then(dispatch(updateProduct(updateProductList)));
        onHide(false);
    }

    return (
        <Modal show={show} onHide={() => onHide(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Update Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="productName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Task Title"
                            name="productName"
                            value={updateProductList?.productName || ''}
                            onChange={onInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productDescription">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Task Description"
                            name="productDescription"
                            value={updateProductList?.productDescription || ''}
                            onChange={onInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Task Description"
                            value={updateProductList?.price || ''}
                            name="price"
                            onChange={onInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productRating">
                        <Form.Label>Product Rating</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Task Description"
                            name="productRating"
                            value={updateProductList?.productRating || ''}
                            onChange={onInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onHide(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={editProduct}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}