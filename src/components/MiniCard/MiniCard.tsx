import React, { useEffect } from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import noImage from '../../assets/img/no-image.jpg'
import { Box, Button, Chip, Grid, Rating } from '@mui/material'
import { ShoppingCartCheckout } from '@mui/icons-material'
import { dashboardTypes } from '../../pages/Dashboard/store/type'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/store'
import { useNavigate } from 'react-router-dom'

const MiniCard = ({ item, available }) => {
  const dispatch = useDispatch()
  const products = useAppSelector((state) => state.dashboardSlice.products)
  const navigate = useNavigate()

  return (
    <Grid
      item
      sx={{
        width: 350,
        margin: 1,
        boxShadow: ' rgba(149, 157, 165, 0.2) 0px 8px 24px',
        border: 'none',
      }}
    >
      <Card
        sx={{
          borderRadius: 3,
          border: 'none',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            sx={{
              p: 2,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography component="div" variant="h5" sx={{ fontWeight: 500, fontSize: 18 }}>
              {item.volumeInfo.title}
            </Typography>
            <Typography
              onClick={() => {
                if (item.volumeInfo.authors) {
                  navigate(`/author/${item.volumeInfo.authors[0]}`, {
                    state: { author: item.volumeInfo.authors[0].toLowerCase() },
                    replace: true,
                  })
                }
              }}
              sx={{ cursor: 'pointer' }}
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Anonim'}
            </Typography>
            <Chip
              sx={{ cursor: 'pointer' }}
              label={item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'Kategori Yok'}
              variant="outlined"
              onClick={() => {
                if (item.volumeInfo.categories[0]) {
                  navigate(`/category/${item.volumeInfo.categories[0]}`, {
                    state: { category: item.volumeInfo.categories[0] },
                    replace: true,
                  })
                }
              }}
            />
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {item.saleInfo?.saleability !== 'NOT_FOR_SALE'
                ? item.saleInfo?.listPrice?.amount + ' ' + item?.saleInfo?.listPrice?.currencyCode
                : 'Mevcut Değil'}
            </Typography>
            {item.saleInfo?.saleability !== 'NOT_FOR_SALE' && (
              <Button sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <ShoppingCartCheckout
                  sx={{ background: 'yellow', color: 'black', p: 1, borderRadius: '50%' }}
                  onClick={() => {
                    if (!products.find((el) => el.id === item.id)) {
                      dispatch({ type: dashboardTypes.ADD_TO_CART, payload: item })
                    }
                  }}
                />
              </Button>
            )}
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
