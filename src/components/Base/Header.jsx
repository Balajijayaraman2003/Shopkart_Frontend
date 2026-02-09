import React, { useState } from 'react';
import { Container, Button, Form, Nav, Navbar, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CanvasMenu from './CanvasMenu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Header() {
  const userData = useSelector((state) => state.user);
  console.log(userData)
  const [searchTerm, setSearchTerm] = useState('');
  const [show,setShow] = useState(false)
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary d-none d-md-block mb-5 w-100 d-flex position-fixed" style={{zIndex:100}}>
      <Container fluid className='d-flex justify-content-around align-items-center'>
        <div>
          <img src="/logo.png" alt="" style={{ height: "50px", width: "50px" }} />
          <Navbar.Brand as={Link} to="/" className='logo-text'>ShopKart</Navbar.Brand>
        </div>

        <Form className="d-flex me-3 w-50" onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" variant="outline-success">Search</Button>
        </Form>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link>Cetegories</Nav.Link>
            <Nav.Link>Cart</Nav.Link>
            <Nav.Link onClick={()=>setShow(true)}> { userData && userData.profile_pic ? <Image src={userData.profile_pic} style={{width:35,height:35,borderRadius:35/2}}/> : <AccountCircleIcon style={{width:35,height:35,borderRadius:35/2}} />}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <CanvasMenu isOpen={show} onClose={()=>setShow(false)} />
       
      </Container>
    </Navbar>
  );
}

export default Header;