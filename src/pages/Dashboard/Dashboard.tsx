import React, { useEffect, useState } from 'react'
import { Box, Grid, Pagination } from '@mui/material'
import MiniCard from '../../components/MiniCard/MiniCard'
import { useDispatch } from 'react-redux'
import { dashboardTypes } from './store/type'
import { useAppSelector } from '../../redux/store'
import { isNumber } from '../../functions/isNumber'

const Dashboard = (): JSX.Element => {
  const dispatch = useDispatch()
  const dashboardSlice: any = useAppSelector((state) => state.dashboardSlice)
  const [books, setBooks] = useState([])
  const itemsPerPage = 20
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const startIndex = (currentPage - 1) * itemsPerPage
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  useEffect(() => {
    setBooks(dashboardSlice.data.items)
    setTotalItems(dashboardSlice.data.totalItems)
  }, [dashboardSlice])

  useEffect(() => {
    dispatch({
      type: dashboardTypes.GET_PRODUCTS,
      payload: {
        page: isNumber(currentPage) ? currentPage * itemsPerPage : 0,
      },
    })
  }, [currentPage])

  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid item sm={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {books?.map((item) => <MiniCard item={item} />)}
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
    </Grid>
  )
}

export default Dashboard
