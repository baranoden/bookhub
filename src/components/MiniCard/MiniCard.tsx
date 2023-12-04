import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import noImage from '../../assets/img/no-image.jpg'
import { Box, Grid, Rating } from '@mui/material'

const MiniCard = ({ item }) => {
  console.log(item)
  return (
    <Grid item sx={{ width: 350, margin: 1 }}>
      <Card
        sx={{
          borderRadius: 3,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5" sx={{ fontWeight: 500, fontSize: 18 }}>
                {item.volumeInfo.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Anonim'}
              </Typography>
              <Rating readOnly value={Math.floor(Math.random() * (5 - 1)) + 1} />
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {item.saleInfo.saleability !== 'NOT_FOR_SALE'
                  ? item.saleInfo.listPrice.amount + ' ' + item.saleInfo.listPrice.currencyCode
                  : 'Mevcut Değil'}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}></Box>
          </Box>
          <CardMedia
            component="img"
            image={
              item.volumeInfo.imageLinks?.smallThumbnail
                ? item.volumeInfo.imageLinks?.smallThumbnail
                : noImage
            }
            sx={{ width: '150px !important' }}
            height="240"
          />
        </Box>
      </Card>
    </Grid>
  )
}

export default MiniCard
