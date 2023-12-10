import { Box, Typography } from '@mui/material'
import React from 'react'

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Typography gutterBottom variant="h1" component="div">
        404
      </Typography>
      <Typography gutterBottom variant="body2" component="div">
        Aradığın ürünü bulamadık :(
      </Typography>
    </Box>
  )
}

export default NotFound
