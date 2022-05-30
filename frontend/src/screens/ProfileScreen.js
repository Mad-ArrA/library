import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
        if(!user.name) {
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
        } else {
            setName(user.name)
            setEmail(user.email)
        }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
    //   DISPATCH UPDATE PROFILE
    dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return <Row>
      <Col md={3}>
      <h2><i class="fas fa-user"></i> Профиль пользователя</h2>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>Профиль обновлён!!</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type='name'
            placeholder='Введите имя'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Введите email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type='password'
            placeholder='Введите пароль'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Подтвердить пароль</Form.Label>
          <Form.Control
            type='password'
            placeholder='Подтвердить пароль'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
            Обновление
        </Button>
      </Form>
      </Col>
      <Col md={9}>
            <h2>Мои заказы</h2>
            { loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> :
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                      <th>ID</th>
                      <th>ДАТА</th>
                      <th>ИТОГ</th>
                      <th>ОПЛАТА</th>
                      <th>ДОСТАВЛЕН</th>
                    <th></th>
                  </tr>
                </thead>

                { orders.length === 0 ? <p><Message variant='danger'>Нет заказов</Message></p> :

                <tbody>
                { orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isPaid ?  <i class="fas fa-check fa-2x" style={{ color: 'green' }}></i> : (
                      <i className='fas fa-times fa-2x' style={{ color: 'red' }}></i>
                    )}</td>
                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                      <i className='fas fa-times fa-2x' style={{ color: 'red' }}></i>
                    )}</td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>Подробности</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                )) }
              </tbody>


                }
              </Table>
            }
      </Col>
  </Row>
}

export default ProfileScreen
