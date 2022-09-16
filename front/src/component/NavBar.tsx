import { ReactElement, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Autocomplete, Slide, Snackbar, TextField } from '@mui/material'
import { ManageAccounts, Settings, LogoutOutlined, ShoppingBasketOutlined, Search } from '@mui/icons-material'
import Button from '@mui/material/Button'
import SettingsRightPanel from './SettingsRightPanel'
import BasketRightPanel from './BasketRightPanel'
import { useCurrentContext } from '../plugin/context'
import SignIn from './SignIn'
import SignUp from './SignUp'
import QuackSnack from '../asset/logo/QuackLogo.png'
import request from '../plugin/request'
import FilterBar from './FilterBar'
import { Restaurant } from '../interface/Restaurant'

function TransitionLeft(props: any): ReactElement {
  return <Slide {...props} direction="up" />
}

function NavBar(): ReactElement {
  const [openPanel, setOpenPanel] = useState('')
  const [openModal, setOpenModal] = useState('')
  const [openSearch, setOpenSearch] = useState(false)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const { userValid, setSnackBar, checkUser, setUserData, snackBarMessage } = useCurrentContext()

  const logout = (): void => {
    request
      .post('log-out/')
      .then((res) => {
        setUserData(null)
        setSnackBar(res.data.message)
        setTimeout(function () {
          window.location.reload()
        }, 3000)
      })
      .catch((err) => {
        setSnackBar(err.response.data.message)
      })
  }

  useEffect(() => {
    checkUser()
    if (openSearch) {
      request
        .get('get/restaurant/')
        .then((res) => {
          setRestaurants(res.data.data)
        })
        .catch((err) => {
          setSnackBar(err.response.data.message)
        })
    }
  }, [openSearch])

  return (
    <nav className="navbar">
      <Autocomplete
        popupIcon={<Search />}
        open={openSearch}
        loading={restaurants.length === 0}
        onOpen={() => {
          setOpenSearch(true)
        }}
        onClose={() => {
          setOpenSearch(false)
        }}
        className="search-bar"
        options={restaurants.map((restaurant) => restaurant.username)}
        renderInput={(params) => <TextField {...params} variant="standard" label="Search for a restaurant . . ." />}
      />
      <div className="logo-background">
        <Link to="/">
          <img src={QuackSnack} className={useLocation().pathname === '/' ? 'qs-logo active-qs' : 'qs-logo'} />
        </Link>
      </div>
      {userValid ? (
        <div className="navbar-right">
          <Link to="/user">
            <ManageAccounts className={useLocation().pathname === '/user' ? 'navbar-logo active-logo' : 'navbar-logo'} />
          </Link>

          <ShoppingBasketOutlined className={openPanel ? 'navbar-logo active-logo' : 'navbar-logo'} onClick={() => setOpenPanel('basket')} />
          <BasketRightPanel openPanel={openPanel === 'basket'} setOpenPanel={setOpenPanel} />

          <LogoutOutlined className="navbar-logo" onClick={() => logout()} />

          <Settings className={openPanel ? 'navbar-logo active-logo' : 'navbar-logo'} onClick={() => setOpenPanel('settings')} />
          <SettingsRightPanel openPanel={openPanel === 'settings'} setOpenPanel={setOpenPanel} />

          <SignIn open={openModal === 'signin'} setOpen={setOpenModal} />
          <SignUp open={openModal === 'signup'} setOpen={setOpenModal} />
        </div>
      ) : (
        <div className="navbar-right">
          <div className="sign-button-group">
            <Button variant="contained" color="primary" disableElevation onClick={() => setOpenModal('signin')}>
              Sign in
            </Button>
            <Button variant="outlined" color="primary" onClick={() => setOpenModal('signup')}>
              Sign up
            </Button>
          </div>
          <Settings className={openPanel ? 'navbar-logo active-logo' : 'navbar-logo'} onClick={() => setOpenPanel('settings')} />
          <SettingsRightPanel openPanel={openPanel === 'settings'} setOpenPanel={setOpenPanel} />
          <SignIn open={openModal === 'signin'} setOpen={setOpenModal} />
          <SignUp open={openModal === 'signup'} setOpen={setOpenModal} />
        </div>
      )}
      <FilterBar />
      <Snackbar TransitionComponent={TransitionLeft} open={snackBarMessage !== ''} message={snackBarMessage} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
    </nav>
  )
}

export default NavBar
