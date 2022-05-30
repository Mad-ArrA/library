import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({history}) => {

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart);
    const { cartItems, shippingAddress, paymentMethod } = cart;
    // console.log(paymentMethod.paymentMethod);


    // To add .00 at the End of Each Price
    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    // Calculated Price
    cart.itemsPrice = addDecimal(cart.cartItems.reduce((acc, item) =>
        acc + item.price * item.qty
    , 0))


    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate

    useEffect(() => {
        if(success) {
            history.push(`/order/${order.createdOrder._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch( createOrder({
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod.paymentMethod,
            itemsPrice: cart.itemsPrice
        }))
    }


    return (
        <div>

            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Доставка</h2>
                            <p>
                                <strong>Адрес: </strong>
                                { shippingAddress.address }, { shippingAddress.city },
                                { shippingAddress.postalCode }, { shippingAddress.country },
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Метод оплаты</h2>
                                <strong>Метод: </strong>
                                { paymentMethod.paymentMethod }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Элементы заказа</h2>
                                { cartItems.length === 0 ? <Message>Ваша корзина пуста!!</Message> : (
                                    <ListGroup variant='flush'>
                                        { cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.qty} x {item.price} руб.= {item.qty * item.price} руб.
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )) }
                                    </ListGroup>
                                ) }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Краткое описание заказа</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Итог</Col>
                                    <Col>{cart.itemsPrice} руб.</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>Что то пошло не так</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cartItems.length === 0}
                                onClick={placeOrderHandler}>
                                    Доставить
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>



        </div>
    )
}

export default PlaceOrderScreen