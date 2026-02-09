import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Form, Button,Offcanvas } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications';

function TopBar() {
    

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm('')
        }
    };

    return (
        <div className='d-md-none py-2' style={{ position: "sticky", top: 0, zIndex: 100, background: "white"}}>
            <div className="logo d-flex justify-content-center" onClick={() => navigate("/")}>
                <img src="/logo.png" alt="" style={{ width: "50px", height: "50px" }} />
                <h1 className='mx-2 py-2 logo-text'>ShopKart</h1>
            </div>

            <div className='d-flex w-100'>
                <div className='p-2'><ArrowBackIcon style={{ height: "30px", width: "50px" }} onClick={() => { navigate(-1) }} /></div>
                <Form className="d-flex me-3 w-100" onSubmit={handleSearch}>
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button type="submit" variant="success"><SearchIcon /></Button>
                </Form>
                <div className='mx-3 btn btn-primary'><NotificationsIcon /></div>
            </div>

        </div>

    )
}

export default TopBar