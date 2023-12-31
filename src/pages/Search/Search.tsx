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
import { useAppSelector } from '../../redux/store'
import { isNumber } from '../../functions/isNumber'
import { dashboardTypes } from '../Dashboard/store/type'
import { useLocation } from 'react-router-dom'

const Search = (): JSX.Element => {
  const dispatch = useDispatch()
  const dashboardSlice: any = useAppSelector((state) => state.dashboardSlice)
  const [books, setBooks] = useState([])
  const itemsPerPage = 20
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const startIndex = (currentPage - 1) * itemsPerPage
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const location = useLocation()
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    setBooks(dashboardSlice.data.items)
    setTotalItems(dashboardSlice.data.totalItems)
  }, [dashboardSlice])

  useEffect(() => {
    dispatch({
      type: dashboardTypes.SEARCH_PRODUCTS,
      payload: {
        page: isNumber(startIndex) ? startIndex : 0,
        search: location.state.search,
      },
    })
  }, [currentPage, location])

  return (
    <Grid container sx={{ mt: 3, boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
      <Grid
        item
        sm={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h3" component="h3">
          Arama Sonucu: {location.state.search}
        </Typography>
        <Divider />
        <Typography variant="body1" component="span">
          Sadece Mevcut Kitapları göster: <Switch onChange={() => setAvailable(!available)} />
        </Typography>
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

export default Search
