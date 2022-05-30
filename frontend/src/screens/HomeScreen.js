// import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Product from '../components/Product';
import Blog from '../components/Blog';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
// import products from '../products';
import { listProducts } from '../actions/productActions.js'
import { listBlogs } from '../actions/blogActions.js'


const HomeScreen = ({ match }) => {

    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const res = await axios.get('/api/products');

    //         setProducts(res.data);
    //     }
    //     fetchProducts();
    // }, []);

    const keyword = match.params.keyword;

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, pages, page } = productList;


    useEffect(() => {

        dispatch(listProducts(keyword, pageNumber))
        dispatch(listBlogs())
    }, [dispatch, keyword, pageNumber]);


    return (
        <>
        <Meta />
            { loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) :
                (
                   <>
                     <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={6} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                     </Row>
                     <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                   </>
                )
            }

        </>
    )
}

export default HomeScreen
