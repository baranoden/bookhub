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
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/store'
import noImage from '../../assets/img/no-image.jpg'
import ClearIcon from '@mui/icons-material/Clear'
import { useDispatch } from 'react-redux'
import { getUserData, removeProducts, resetLocalStorage } from '../../pages/Dashboard/store/slice'
import Login from '../Login/Login'
import Checkout from '../Checkout/Checkout'

const Cart = ({ anchorEl, open, handleClose, products }) => {
  const productSlice = useAppSelector((state) => state.dashboardSlice.products)
  const dispatch = useDispatch()
  const dashboardSlice = useAppSelector((state) => state.dashboardSlice)
  const [loginModal, setLoginModal] = useState<boolean>(false)
  const [checkout, setCheckout] = useState<boolean>(false)
  const calculateTotalPrice = () => {
    let totalPrice = 0
    for (let i = 0; i < productSlice.length; i++) {
      let saleInfo = productSlice[i].saleInfo

      if (saleInfo?.saleability === 'FOR_SALE' && saleInfo.listPrice) {
        totalPrice += saleInfo.listPrice.amount
      }
    }
    return totalPrice.toFixed(2)
  }

  const getUser = () => {
    const user = localStorage.getItem('user')

    dispatch(getUserData(user === 'success' ? true : false))
  }

  useEffect(() => {
    getUser()
  }, [dashboardSlice.user])

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
                        item.volumeInfo?.imageLinks?.smallThumbnail
                          ? item.volumeInfo?.imageLinks?.smallThumbnail
                          : noImage
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.volumeInfo?.title}
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
                  <Button sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ClearIcon
                      sx={{ background: 'yellow', color: 'black', p: 0.35, borderRadius: '50%' }}
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
        {dashboardSlice.user ? (
          products.length === 0 ? (
            <Typography
              sx={{ display: 'flex', justifyContent: 'flex-end', m: 1 }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Sepetinize ürün ekleyin.
            </Typography>
          ) : (
            <>
              <Button
                sx={{ m: 1 }}
                variant="outlined"
                onClick={() => dispatch(resetLocalStorage())}
              >
                Sepeti Boşalt
              </Button>
              <Button sx={{ m: 1 }} variant="contained" onClick={() => setCheckout(true)}>
                Satın Al
              </Button>
            </>
          )
        ) : (
          <Button
            sx={{ m: 1 }}
            variant="contained"
            onClick={() => {
              setLoginModal(true)
            }}
          >
            Önce Giriş Yap
          </Button>
        )}
      </Box>
      {loginModal && <Login open={loginModal} setOpen={setLoginModal} />}
      {checkout && <Checkout open={checkout} setOpen={setCheckout} />}
    </Menu>
  )
}

export default Cart
