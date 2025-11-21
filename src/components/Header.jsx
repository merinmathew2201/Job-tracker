import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';



function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:"#0B2447"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img width={'50px'} src="https://cdn-icons-png.freepik.com/256/9166/9166929.png?semt=ais_white_label" alt="logo" />
          </IconButton>
          <Typography variant="h6" component="" sx={{ flexGrow: 1 }}>
            <Link to={'/'} className='text-light text-decoration-none'>JOBMATE</Link>
          </Typography>
          <Typography variant="" component=""  >
            <Link to={'/jobs'} className='text-light text-decoration-none'>ALL JOBS</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header