import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchInput from '../../components/SearchInput/SearchInput'
import Login from '../../components/Login/Login'
import { useAppSelector } from '../../redux/store'
import toast from 'react-hot-toast'
import { PersonPinCircleOutlined } from '@mui/icons-material'
import Cart from '../../components/Cart/Cart'
import { Badge } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUserData, setCartOnLoad } from '../../pages/Dashboard/store/slice'

const pages = [
  { name: 'Bilim Kurgu', search: 'fiction' },
  { name: 'Gerilim', search: 'thriller' },
  { name: 'Tarih', search: 'history' },
]

const NavBar = (): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [anchorElCart, setAnchorElCart] = useState<null | HTMLElement>(null)
  const [loginModal, setLoginModal] = useState<boolean>(false)
  const dashboardSlice = useAppSelector((state) => state.dashboardSlice)
  const products = useAppSelector((state) => state.dashboardSlice.products)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleUserMenu = (event, type, state, action) => {
    if (state === 'modal') {
      setLoginModal(true)
    }
    if (type === 'open') {
      setAnchorElUser(event?.currentTarget)
    } else {
      setAnchorElUser(null)
    }
    if (action === 'logout') {
      dispatch(getUserData(false))
      localStorage.setItem('user', 'error')
      toast.success('Başarıyla çıkış yapıldı')
    }
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const navigateHandler = (genre) => {
    setAnchorElNav(null)
    navigate(`/category/${genre}`, { state: { category: genre } })
  }

  const handleCartOpen = (event: React.MouseEvent<any>) => {
    setAnchorElCart(event?.currentTarget)
  }

  const handleCartClose = () => {
    setAnchorElCart(null)
  }

  const cartOpen = Boolean(anchorElCart)
  const cartId = cartOpen ? 'simple-popover' : undefined

  const getUser = () => {
    const user = localStorage.getItem('user')

    dispatch(getUserData(user === 'success' ? true : false))
  }

  useEffect(() => {
    getUser()
  }, [dashboardSlice.user])

  useEffect(() => {
    dispatch(setCartOnLoad(JSON.parse(localStorage.getItem('cart') as string)))
  }, [])

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        background: 'white',
        color: 'black',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
            }}
            onClick={() => navigate('/')}
          >
            BookHub
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ p: 0, mr: 0.5, ml: 0.5, color: 'black', cursor: 'pointer' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={() => navigateHandler(page.search)}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              fontSize: 22,
            }}
            onClick={() => navigate('/')}
          >
            BH
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={() => navigateHandler(page.search)}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <SearchInput />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Seçenekler">
              <IconButton
                onClick={(e) => handleUserMenu(e, 'open', null, null)}
                sx={{ p: 0, ml: 0 }}
              >
                <Avatar
                  sx={{
                    p: 0,
                    mr: 0.5,
                    ml: 0.5,
                    background: 'yellow',
                    color: 'black',
                    cursor: 'pointer',
                  }}
                >
                  <PersonPinCircleOutlined />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={() => handleUserMenu(null, 'close', null, null)}
            >
              {dashboardSlice.user ? (
                <MenuItem key={2} onClick={(e) => handleUserMenu(e, null, null, 'logout')}>
                  <Typography textAlign="center">Çıkış Yap</Typography>
                </MenuItem>
              ) : (
                <MenuItem key={1} onClick={(e) => handleUserMenu(e, 'close', 'modal', null)}>
                  <Typography textAlign="center">Giriş Yap</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Badge
            sx={{ p: 0, mr: 0.5, ml: 0.5 }}
            badgeContent={products ? products.length : 0}
            color="error"
          >
            <Avatar sx={{ background: 'yellow', color: 'black', cursor: 'pointer' }}>
              <ShoppingCartIcon
                aria-describedby={cartId}
                onClick={(e: React.MouseEvent<any>) => handleCartOpen(e)}
              />

              <Cart
                open={cartOpen}
                handleClose={handleCartClose}
                anchorEl={anchorElCart}
                products={products}
              />
            </Avatar>
          </Badge>
        </Toolbar>
      </Container>
      {loginModal && <Login open={loginModal} setOpen={setLoginModal} />}
    </AppBar>
  )
}
export default NavBar
