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

const pages = ['Bilim Kurgu', 'Gerilim', 'Tarih']

const NavBar = (): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [loginModal, setLoginModal] = useState<boolean>(false)
  const dashboardSlice = useAppSelector((state) => state.dashboardSlice)
  const [canLogin, setCanLogin] = useState(false)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleUserMenu = (event, type, state, action) => {
    console.log(event, type, state, action)
    if (state === 'modal') {
      setLoginModal(true)
      console.log('^+^+3434')
    }
    if (type === 'open') {
      setAnchorElUser(event?.currentTarget)
    } else {
      setAnchorElUser(null)
    }
    if (action === 'logout') {
      setCanLogin(false)
      localStorage.setItem('user', 'failure')
      toast.success('Başarıyla çıkış yapıldı')
    }
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const getUser = () => {
    const user = localStorage.getItem('user')

    if (user !== null) {
      return setCanLogin(user == 'success' ? true : false)
    }

    return null
  }

  useEffect(() => {
    if (dashboardSlice.success) {
      getUser()
    }
  }, [dashboardSlice.success])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BookHub
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: 22,
            }}
          >
            BH
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <SearchInput />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={(e) => handleUserMenu(e, 'open', null, null)}
                sx={{ p: 0, ml: 0 }}
              >
                <Avatar sx={{ p: 0, mr: 0.5, ml: 0.5 }}>
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
              {canLogin ? (
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
          {canLogin && (
            <Avatar sx={{ p: 0, mr: 0.5, ml: 0.5 }}>
              <ShoppingCartIcon />
            </Avatar>
          )}
        </Toolbar>
      </Container>
      {loginModal && <Login open={loginModal} setOpen={setLoginModal} />}
    </AppBar>
  )
}
export default NavBar
