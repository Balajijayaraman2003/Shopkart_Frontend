import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className='main-container'>
      <Container fluid className='bg-dark text-light text-center py-3 mt-5' style={{position:'relative',bottom:60}}>
        <p><span>&copy;</span> All rights reserved, www.shopkart.com</p>
      </Container>
    </footer>
  );
}

export default Footer;