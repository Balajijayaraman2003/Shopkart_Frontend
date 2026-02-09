import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { BsFillCartCheckFill } from "react-icons/bs"
import { Offcanvas } from 'react-bootstrap'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Person from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyIcon from '@mui/icons-material/Key';
import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import ContactsIcon from '@mui/icons-material/Contacts';
import RestoreIcon from '@mui/icons-material/Restore';

import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

function CanvasMenu({ isOpen, onClose }) {
  const navigate = useNavigate()
  const [openAccount, setOpenAccount] = useState(true)

  const handleClick = (path) => {
    onClose()
    navigate(path)
  }

  const handleOpenClose = () => {
    setOpenAccount(!openAccount)
  }

  return (
    <Offcanvas show={isOpen} onHide={onClose} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Profile</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
          {/* Account Settings Parent */}
          <ListItemButton className='border-bottom' onClick={handleOpenClose}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Account Settings" />
            {openAccount ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          {/* Collapsible Submenu */}
          <Collapse in={openAccount} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleClick('/profile')}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }} onClick={() => handleClick('/orders')}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItemButton>
              
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleClick('/orders')}>
                <ListItemIcon>
                  <PersonPinCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Address" />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }} onClick={() => handleClick('/whishlist')}>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary="Whish List" />
              </ListItemButton>
              
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleClick('/signout')}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="LogOut" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton className='border-bottom'>
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText primary="Two Step Authentication" />
          </ListItemButton>

          <ListItemButton className='border-bottom' >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About Us" />
            
          </ListItemButton>

          <ListItemButton className='border-bottom'>
            <ListItemIcon>
              <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Contact Us" />
            
          </ListItemButton>

          <ListItemButton className='border-bottom'>
            <ListItemIcon>
              <RestoreIcon />
            </ListItemIcon>
            <ListItemText primary="Return Policy" />
          </ListItemButton>

          <ListItemButton className='border-bottom'>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary="Privacy Policy" />
          </ListItemButton>
          



        </List>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default CanvasMenu