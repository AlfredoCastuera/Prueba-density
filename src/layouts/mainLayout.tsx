import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppBar,Toolbar,IconButton, Typography } from '@mui/material'
import poklogo from '../assets/poklogo.png'
import { Link } from 'react-router-dom'
const MainLayout = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Link to="/">
            <img src={poklogo} alt="" style={{
              maxWidth: '84px',
            }} />
          </Link>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  )
}

export default MainLayout