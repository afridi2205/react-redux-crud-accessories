import React, { useEffect, useState } from "react";
import { LogoIcon } from "../../assests/images";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {getProductFromApi, searchProductToApi, searchProducts} from "../../redux/product/productSlice.js"

export let HeaderComponent = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (searchKeyword.trim()) {
            const timerId = setTimeout(() => {
                dispatch(searchProducts(searchKeyword));
            }, 500);

            return () => clearTimeout(timerId);
        }
        else
        dispatch(getProductFromApi());
    }, [searchKeyword, dispatch]);
    

    return (
        <div className="header d-flex align-items-center p-3">
            <div className="me-4"><LogoIcon /></div>
            <Form.Group className="col-sm-5">
                <Form.Control
                    type="search"
                    name="productSearch"
                    id="productSearch"
                    placeholder="Search products..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
            </Form.Group>
            <nav className="d-flex align-items-center">
                <span className="mx-5">Store</span>
                <span className="mx-5">Account</span>
                <span className="mx-5">Wish List</span>
                <span className="mx-5">Basket</span>
                <span>
                    <div className="add-btn">
                        <Button className="btn btn-primary" type="submit" onClick={() => navigate('/add-product')}>Add Product</Button>
                    </div>
                </span>
            </nav>
        </div>



    )
}