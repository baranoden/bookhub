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

const BookDetails = () => {
  const singleBookDetails = useAppSelector((state) => state.dashboardSlice.single)
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
              ? singleBookDetails?.volumeInfo?.categories?.map((item) => {
                  return (
                    <Chip
                      sx={{ cursor: 'pointer', m: 1 }}
                      label={item}
                      variant="outlined"
                      onClick={() => {
                        navigate(`/category/${item}`, {
                          state: { category: item },
                          replace: true,
                        })
                      }}
                    />
                  )
                })
              : 'Kategori Yok'}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Açıklama:
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: singleBookDetails?.volumeInfo?.description }} />
        </CardContent>
        <Typography sx={{ ml: 2 }} gutterBottom variant="h5" component="div">
          {singleBookDetails?.saleInfo?.saleability !== 'NOT_FOR_SALE'
            ? singleBookDetails?.saleInfo?.listPrice?.amount +
              ' ' +
              singleBookDetails?.saleInfo?.listPrice?.currencyCode
            : 'Mevcut Değil'}
        </Typography>
        <CardActions disableSpacing>
          <IconButton aria-label="sepet">
            <ShoppingCartCheckout />
          </IconButton>
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
