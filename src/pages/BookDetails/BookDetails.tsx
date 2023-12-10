import React, { useEffect } from 'react'
import { useAppSelector } from '../../redux/store'
import { dashboardTypes } from '../Dashboard/store/type'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from '@mui/material'
import { ShoppingCartCheckout } from '@mui/icons-material'
import noImage from '../../assets/img/no-image.jpg'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import NotFound from '../../layout/NotFound/NotFound'
import { availabilityCheck } from '../../functions/availabilityCheck'

const BookDetails = () => {
  const singleBookDetails = useAppSelector((state) => state.dashboardSlice.single)
  const products = useAppSelector((state) => state.dashboardSlice.products)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch({
      type: dashboardTypes.SINGLE_VIEW,
      payload: { id: location?.state?.id ? location.state.id : location.pathname.slice(6) },
    })
  }, [])

  return singleBookDetails !== 'error' ? (
    <Card sx={{ width: '100%', mt: 2, display: { sm: 'flex' } }}>
      <Box>
        <CardHeader
          avatar={
            <Avatar sx={{ background: 'yellow', color: 'black' }} aria-label="recipe">
              BH
            </Avatar>
          }
          action={
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          }
          title={singleBookDetails?.volumeInfo?.title}
          subheader={
            singleBookDetails?.volumeInfo?.authors
              ? singleBookDetails?.volumeInfo?.authors[0]
              : 'Anonim'
          }
        />
        <CardMedia
          component="img"
          image={
            singleBookDetails?.volumeInfo?.imageLinks?.thumbnail
              ? singleBookDetails?.volumeInfo?.imageLinks?.thumbnail
              : noImage
          }
          sx={{ width: '350px !important' }}
          height="auto"
        />
      </Box>
      <Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Kategoriler:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {singleBookDetails?.volumeInfo?.categories
              ? singleBookDetails?.volumeInfo?.categories?.map((category, index) => {
                  const subcategories = category.split(' / ')

                  return subcategories.map((subcategory) => (
                    <Chip
                      sx={{ cursor: 'pointer', m: 1 }}
                      label={subcategory}
                      variant="outlined"
                      onClick={() => {
                        navigate(`/category/${subcategory}`, {
                          state: { category: subcategory },
                          replace: true,
                        })
                      }}
                    />
                  ))
                })
              : 'Kategori Yok'}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Açıklama:
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: singleBookDetails?.volumeInfo?.description }} />
        </CardContent>
        <CardActions disableSpacing>
          <Typography sx={{ ml: 2 }} gutterBottom variant="h5" component="div">
            {availabilityCheck(singleBookDetails)
              ? singleBookDetails.saleInfo?.listPrice?.amount +
                ' ' +
                singleBookDetails?.saleInfo?.listPrice?.currencyCode
              : 'Uygun Değil'}
          </Typography>
          {!products.find((el) => el.id === singleBookDetails.id) ? (
            !availabilityCheck(singleBookDetails) ? (
              <></>
            ) : (
              <IconButton aria-label="sepet">
                <ShoppingCartCheckout
                  onClick={() => {
                    if (!products.find((el) => el.id === singleBookDetails.id)) {
                      dispatch({ type: dashboardTypes.ADD_TO_CART, payload: singleBookDetails })
                    }
                  }}
                />
              </IconButton>
            )
          ) : (
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Bu kitap sepetinizde zaten mevcut
            </Typography>
          )}

          <IconButton aria-label="paylaş">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  ) : (
    <NotFound />
  )
}

export default BookDetails
