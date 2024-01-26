import React from 'react'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import { IconButton, Toolbar, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const Header: React.FC<props> = () => {
  const router = useRouter()
  const movePage = (election: any): void => {
    router.push(election)
  }

  return (
    <AppBar position='static'>
        <Toolbar>
            <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='menu'
                sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              <Button color='inherit' onClick = {() => { movePage('/') }}>OneMoreDog</Button>
            </Typography>
            <Button color='inherit' onClick = {() => { movePage('/about') }}>About Us</Button>
            <Button color='inherit' onClick = {() => { movePage('/contact') }}>More Info</Button>
        </Toolbar>
    </AppBar>
  )
}

export default Header
