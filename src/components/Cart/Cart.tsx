import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  Typography,
} from '@mui/material'
import React, { useEffect } from 'react'
import { useAppSelector } from '../../redux/store'
import noImage from '../../assets/img/no-image.jpg'
import ClearIcon from '@mui/icons-material/Clear'
import { useDispatch } from 'react-redux'
import { removeProducts } from '../../pages/Dashboard/store/slice'

const Cart = ({ anchorEl, open, handleClose, products }) => {
  const productSlice = useAppSelector((state) => state.dashboardSlice.products)
  const dispatch = useDispatch()
  const calculateTotalPrice = () => {
    let totalPrice = 0
    for (let i = 0; i < productSlice.length; i++) {
      let saleInfo = productSlice[i].saleInfo

      if (saleInfo.saleability === 'FOR_SALE' && saleInfo.listPrice) {
        totalPrice += saleInfo.listPrice.amount
      }
    }
    return totalPrice
  }

  return (
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      onClose={handleClose}
    >
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {products.length === 0 ? (
          <Typography
            sx={{ margin: '0 1rem' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            Sepetiniz Boş
          </Typography>
        ) : (
          products.map((item) => {
            return (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        item.volumeInfo.imageLinks?.smallThumbnail
                          ? item.volumeInfo.imageLinks?.smallThumbnail
                          : noImage
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.volumeInfo.title}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item?.saleInfo?.listPrice?.amount +
                            ' ' +
                            item?.saleInfo?.listPrice?.currencyCode}
                        </Typography>
                      </>
                    }
                  />
                  <Button sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <ClearIcon
                      sx={{ background: 'yellow', color: 'black', p: 1, borderRadius: '50%' }}
                      onClick={() => {
                        dispatch(removeProducts(item.id))
                      }}
                    />
                  </Button>
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            )
          })
        )}
      </List>

      <Typography
        sx={{ display: 'flex', justifyContent: 'flex-end', m: 1 }}
        component="span"
        variant="body2"
        color="text.primary"
      >
        {'Toplam:' + calculateTotalPrice() + 'TL'}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1 }}>
        <Button variant="outlined">Satın Al</Button>
      </Box>
    </Menu>
  )
}

export default Cart
