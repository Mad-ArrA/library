/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';  //Alternative of React-Router for Bootstrap
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox'
// rafce --> React arrow Functional component export
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions';

const Header = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar  style={{ backgroundColor: 'darkorange' }} variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>My library <i class="fas fa-book" style={{ color: 'indigo' }}></i></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={({ history }) => <SearchBox history={history} />} />
                        <Nav className="ml-auto">
                            { cartItems.length !== 0 ?
                                <LinkContainer to='/cart'  style={{ color: 'black' }}>
                                <Nav.Link> <i className="fas fa-shopping-cart"></i> Корзина</Nav.Link>
                                </LinkContainer> :
                                <LinkContainer to='/cart' style={{ color: 'black' }}>
                                <Nav.Link> <i className="fas fa-shopping-cart"></i> Корзина</Nav.Link>
                                </LinkContainer>
                            }



                            { userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Профиль</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Выход</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login' style={{ color: 'black' }}>
                                    <Nav.Link> <i className="fas fa-user"></i> Вход</Nav.Link>
                                </LinkContainer>
                            )}

                            { userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Админпанель' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Пользователи</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productList' >
                                        <NavDropdown.Item>Продукты</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderList'>
                                        <NavDropdown.Item>Заказы</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            ) }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
