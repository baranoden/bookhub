import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { Avatar, TextField } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const SearchInput = () => {
  const [searchIcon, setSearchIcon] = useState(false)
  const navigate = useNavigate()

  const initialValues: { search: string } = {
    search: '',
  }

  const { handleSubmit, setFieldValue, values } = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      search: Yup.string().required('Arama yapmak için en az 3 harf giriniz...'),
    }),
    onSubmit: (values) => {
      navigate(`/search/${values.search}`, { state: { search: values.search }, replace: true })
    },
  })

  return (
    <>
      <Avatar onClick={() => setSearchIcon(!searchIcon)} sx={{ p: 0, mr: 0.5 }}>
        <SearchIcon />
      </Avatar>
      <TextField
        placeholder="Bir Kitap Ara..."
        onChange={(e) => {
          setFieldValue('search', e.target.value)
        }}
        size="small"
        sx={{
          display: searchIcon ? 'block' : 'none',
          width: '150px',
          marginRight: '0.2rem',
          background: '#fff',
          borderRadius: '8px',
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            if (values.search.length >= 3) {
              handleSubmit()
            } else {
              toast.error('Arama yapmak için en az 3 harf giriniz...')
            }
          }
        }}
      />
    </>
  )
}

export default SearchInput
