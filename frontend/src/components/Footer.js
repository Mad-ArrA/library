import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer style={{'backgroundColor': 'darkorange', 'color': 'black'}}>
            <Row>
                <Col className='text-center py-3'>&copy;My library | 2022</Col>
            </Row>
        </footer>
    )
}

export default Footer
