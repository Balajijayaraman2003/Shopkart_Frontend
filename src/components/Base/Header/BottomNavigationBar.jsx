import React, { useState } from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import CanvasMenu from '../CanvasMenu';
import HomeFilled from '@mui/icons-material/HomeFilled';
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import CategoryIcon from '@mui/icons-material/Category';
function BottomNavigationBar() {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(0)

  const navigate = useNavigate()
  return (
    <div className='d-md-none'>
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}>
          <BottomNavigationAction label="Home" icon={<HomeFilled />} onClick={() => {
            navigate("/");
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });

          }} />
          <BottomNavigationAction label="Categories" icon={<CategoryIcon />} onClick={()=>{
            navigate("/categories")
          }} />
          <BottomNavigationAction label="Cart" icon={<ShoppingCart />} onClick={()=>{navigate("/cart")}} />
          <BottomNavigationAction label="Menu" icon={<MenuIcon />} onClick={()=>setShow(true)} />
        </BottomNavigation>
      </Paper>
      <CanvasMenu isOpen={show} onClose={()=>setShow(false)} />
    </div>
  )
}

export default BottomNavigationBar