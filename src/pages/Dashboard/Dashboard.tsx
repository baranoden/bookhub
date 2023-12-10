import React, { useEffect, useState } from 'react'
import {
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  Grid,
  Pagination,
  Switch,
  Typography,
} from '@mui/material'
import MiniCard from '../../components/MiniCard/MiniCard'
import { useDispatch } from 'react-redux'
import { dashboardTypes } from './store/type'
import { useAppSelector } from '../../redux/store'
import { isNumber } from '../../functions/isNumber'
import { setSuccess } from './store/slice'

const Dashboard = (): JSX.Element => {
  const dispatch = useDispatch()
  const dashboardSlice: any = useAppSelector((state) => state.dashboardSlice)
  const [books, setBooks] = useState([])
  const itemsPerPage = 20
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const startIndex = (currentPage - 1) * itemsPerPage
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    setBooks(dashboardSlice.data.items)
    setTotalItems(dashboardSlice.data.totalItems)
  }, [dashboardSlice])

  useEffect(() => {
    dispatch({
      type: dashboardTypes.GET_PRODUCTS,
      payload: {
        page: isNumber(startIndex) ? startIndex : 0,
      },
    })
  }, [currentPage])

  useEffect(() => {
    if (dashboardSlice.success) {
      dispatch(setSuccess(false))
    }
  }, [dashboardSlice.success])

  return (
    <Grid container sx={{ mt: 3, boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
      <Grid
        item
        sm={12}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" component="h3" textAlign={'center'}>
          Öne Çıkan Kitaplar
        </Typography>
        <Divider />
        <Typography
          variant="body1"
          component="span"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          Sadece Mevcut Kitapları göster:
        </Typography>
        <Switch onChange={() => setAvailable(!available)} />
        <Divider />
      </Grid>
      <Grid item sm={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {books?.map((item: any) => {
          if (available) {
            if (item.saleInfo.saleability !== 'NOT_FOR_SALE') {
              return <MiniCard item={item} />
            }
          } else {
            return <MiniCard item={item} />
          }
        })}
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          mt: 3,
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
            setCurrentPage(page)
          }}
          variant="outlined"
          shape="rounded"
        />
      </Box>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={dashboardSlice.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  )
}

export default Dashboard
