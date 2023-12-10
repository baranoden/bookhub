import React, { useEffect } from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import noImage from '../../assets/img/no-image.jpg'
import { Box, Button, Chip, Grid } from '@mui/material'
import { ShoppingCartCheckout } from '@mui/icons-material'
import { dashboardTypes } from '../../pages/Dashboard/store/type'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { availabilityCheck } from '../../functions/availabilityCheck'

const MiniCard = ({ item }) => {
  const dispatch = useDispatch()
  const products = useAppSelector((state) => state.dashboardSlice.products)
  const navigate = useNavigate()

  const navigateToDetails = (id) => {
    navigate(`/book/${id}`, { state: { id: id }, replace: true })
  }

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
            <Typography
              component="div"
              variant="h5"
              sx={{ fontWeight: 500, fontSize: 18, cursor: 'pointer' }}
              onClick={() => navigateToDetails(item.id)}
            >
              {item.volumeInfo.title.length > 40
                ? item.volumeInfo.title.slice(0, 40)
                : item.volumeInfo.title}
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
              {availabilityCheck(item)
                ? item.saleInfo?.listPrice?.amount + ' ' + item?.saleInfo?.listPrice?.currencyCode
                : 'Uygun Değil'}
            </Typography>
            {!products.find((el) => el.id === item.id) ? (
              !availabilityCheck(item) ? (
                <></>
              ) : (
                <ShoppingCartCheckout
                  sx={{
                    background: 'yellow',
                    color: 'black',
                    p: 0.3,
                    borderRadius: '50%',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    if (!products.find((el) => el.id === item.id)) {
                      dispatch({ type: dashboardTypes.ADD_TO_CART, payload: item })
                    }
                  }}
                />
              )
            ) : (
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Bu kitap sepetinizde zaten mevcut
              </Typography>
            )}
          </Box>
          <CardMedia
            component="img"
            image={
              item.volumeInfo?.imageLinks?.smallThumbnail
                ? item.volumeInfo?.imageLinks?.smallThumbnail
                : noImage
            }
            sx={{ width: '150px !important', cursor: 'pointer' }}
            height="240"
            onClick={() => navigateToDetails(item.id)}
          />
        </Box>
      </Card>
    </Grid>
  )
}

export default MiniCard
