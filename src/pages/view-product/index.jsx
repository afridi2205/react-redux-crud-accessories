import { useCallback, useEffect, useMemo, useState } from "react";
import tableConfig from '../../config/product-table-config.json'
import { EditIcon, TrashIcon } from "../../assests/images";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProductComponent } from "../update-product";
import { deleteProductToApi, getProductFromApi, removeProduct, setSelectedProduct } from "../../redux/product/productSlice";
import { getProductList } from "../../redux/selectors/productSelector";
import { Button, Table } from "react-bootstrap";

export const ViewProductComponent = () => {
    const [modalShow, setModalShow] = useState(false);
    const { productList, error } = useSelector(getProductList);
    const [countBg, setCountBg] = useState(false);
    const [lastEditedProductName, setLastEditedProductName] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductFromApi())
    }, [dispatch])

    const modifyProduct = (data) => {
        setModalShow(true);
        dispatch(setSelectedProduct(data))
    }

    const deleteProduct = (data) => {
        // dispatch(removeProduct(data));
        dispatch(deleteProductToApi(data))
            // .unwrap()
            .then(dispatch(removeProduct(data)))
    }

    const getTotalProductsCount = () => {
        // console.log('getTotalProductsCount');
        for (let i = 0; i < 100000000; i++) { };
        if (productList?.length <= 0) return 0;
        return productList?.length;
    }
    //Method: 1
    /*const totalProducts = useMemo(() => getTotalProductsCount(), [productList]); 
    getTotalProductsCount func will not be called when any state value changes, because of component re-rendering, so we used
     useMemo hook, it will memoize the value of the func and will allow to call it, only when values changes.*/

    //Method: 2
    const [totalProducts, setTotalProducts] = useState(null);
    useEffect(() => setTotalProducts(getTotalProductsCount()), [productList]);
    //so if we are using a state var, it should cal with dependency, else unneccessary func calls will happen.

    const productCountStyle = useMemo(() => ({
        backgroundColor: countBg ? 'green' : 'white',
        color: countBg ? 'white' : 'black'
    }), [countBg]);
    /* when totalProducts state is changed component is re-rendered, so productCountStyle variable is once again called, even without a 
    change, so beware that whenever state changes, we should use memo or other hooks to wrap it out and restrict the unwanted call */

    // useEffect(() => {
    //     console.log('productCountStyle');
    // }, [productCountStyle]);

    const getLastEditedProductName = useCallback((prevProductName) => {
        // console.log(productList[0].productName, 'productName') 
        /* this func is not based on productList state, but i want to display the
        productList array first product, it displays the first product which was initially present, even after deleting the product is displays
        the same, so useCallback actually freezes the function, so if our func is based on particular state, it is better to include that
        in the dependency array, to avoid unexpected behaviour*/
        setLastEditedProductName(prevProductName)
    }, []);
    //setting the received value from sibling update component using the useCallback hook and setting it on a state to bind it

    return (
        <>
            <div className="view-product p-5">
                {
                    (error !== '') ? <h5 className="text-center text-danger">{error}</h5> : null
                }
                <div className="product-count text-center mb-1" style={productCountStyle}>{`Total No. of Products ${totalProducts}`}</div>
                <div className="d-flex justify-content-end mb-1"><Button className="btn btn-secondary" onClick={() => setCountBg(!countBg)}>Change Count Color</Button></div>
                {lastEditedProductName && <div className="last-edited-product text-center">{`Last Modified Product: ${lastEditedProductName}`}</div>}
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            {tableConfig?.columns?.map((column) =>
                                <th scope="col" key={column.key}>{column?.label}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {(productList && productList.length > 0) ? productList.map((data) =>
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.productName}</td>
                                <td>{data.productDescription}</td>
                                <td>{data.price}</td>
                                <td>{data.productRating}</td>
                                <td><div className="pointer">
                                    <span className="me-2" onClick={() => modifyProduct(data)}><EditIcon /></span>
                                    <span onClick={() => deleteProduct(data)}><TrashIcon /></span></div>
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No Records to Display
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            <UpdateProductComponent show={modalShow} onHide={setModalShow} getLastEditedProductName={getLastEditedProductName} />
        </>
    )
}