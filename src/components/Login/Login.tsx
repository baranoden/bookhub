import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { dashboardTypes } from '../../pages/Dashboard/store/type'
import { useAppSelector } from '../../redux/store'

const Login = ({ open, setOpen }) => {
  const userLogin = useAppSelector((state) => state.dashboardSlice)
  const handleLogin = () => {
    handleSubmit()
  }
  const dispatch = useDispatch()
  const { handleSubmit, handleChange, values, touched, errors, handleBlur } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Kullanıcı Adı zorunludur'),
      password: Yup.string().required('Şifre zorunludur'),
    }),
    onSubmit: (values) => {
      dispatch({
        type: dashboardTypes.POST_LOGIN,
        payload: values,
      })
    },
  })
  useEffect(() => {
    if (userLogin.success) {
      setOpen(false)
    }
  }, [userLogin.success])
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Giriş Yap</DialogTitle>
      <DialogContent>
        <DialogContentText>admin : admin</DialogContentText>
        <Box>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Kullanıcı Adı"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          {errors.username && touched.username && (
            <Typography variant="body2" sx={{ color: 'red' }}>
              {errors.username}
            </Typography>
          )}
        </Box>
        <Box>
          <TextField
            margin="dense"
            id="password"
            label="Şifre"
            type="password"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          {errors.password && touched.password && (
            <Typography variant="body2" sx={{ color: 'red' }}>
              {errors.password}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="outlined" onClick={handleLogin}>
          Giriş Yap
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Login
