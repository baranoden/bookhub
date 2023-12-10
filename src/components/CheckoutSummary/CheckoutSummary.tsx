import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { useAppSelector } from '../../redux/store'
import { resetLocalStorage, setProducts } from '../../pages/Dashboard/store/slice'

const CheckoutSummary = ({ stepperForward, stepperBack, activeStep, steps }) => {
  const summary = useAppSelector((state) => state.dashboardSlice)
  const dispatch = useDispatch()
  const calculateTotalPrice = () => {
    let totalPrice = 0
    for (let i = 0; i < summary.products.length; i++) {
      let saleInfo = summary.products[i].saleInfo

      if (saleInfo.saleability === 'FOR_SALE' && saleInfo.listPrice) {
        totalPrice += saleInfo.listPrice.amount
      }
    }
    return totalPrice.toFixed(2)
  }
  const handleSubmit = () => {
    stepperForward()
    dispatch(resetLocalStorage())
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Sipariş Özeti
      </Typography>
      <List disablePadding>
        {summary?.products.map((product) => (
          <ListItem key={product?.volumeInfo?.title}>
            <ListItemText
              primary={product?.volumeInfo?.title}
              secondary={product?.volumeInfo?.subtitle}
            />
            <Typography variant="body2">{product.saleInfo.listPrice.amount + ' TL'}</Typography>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary="Toplam" />
          <Typography variant="subtitle1">{calculateTotalPrice() + ' TL'}</Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {summary.shipment.firstName + summary.shipment.lastName}
          </Typography>
          <Typography gutterBottom>{summary.shipment.address}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            <>
              <Grid item xs={6}>
                <Typography gutterBottom>{summary?.payment?.cardHolder}</Typography>
                <Typography gutterBottom>{summary?.payment?.cardNumber}</Typography>
                <Typography gutterBottom>{summary?.payment?.cvv}</Typography>
                <Typography gutterBottom>{summary?.payment?.expDate}</Typography>
              </Grid>
            </>
          </Grid>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={() => stepperBack()}
              sx={{ mr: 1 }}
            >
              Geri
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={() => handleSubmit()}>
              {activeStep === steps.length - 1 ? 'Ödeme Yap' : 'İleri'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default CheckoutSummary
