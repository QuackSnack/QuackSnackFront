import { ReactElement, useContext, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Autocomplete, TextField } from '@mui/material'
import { ManageAccounts, Settings, LogoutOutlined, ShoppingBasketOutlined, Search } from '@mui/icons-material'
import Button from '@mui/material/Button'
import SettingsRightPanel from './SettingsRightPanel'
import BasketRightPanel from './BasketRightPanel'
import { QSContext, reactContext } from '../plugin/context'
import SignIn from './SignIn'
import SignUp from './SignUp'
import QuackSnack from '../asset/logo/QuackLogo.png'
import request from '../plugin/request'
import FilterBar from './FilterBar'
import { Restaurant } from '../interface/Restaurant'

function NavBar(): ReactElement {
  const [openPanel, setOpenPanel] = useState('')
  const [openModal, setOpenModal] = useState('')
  const [openSearch, setOpenSearch] = useState(false)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const context: QSContext = useContext(reactContext)

  const logout = (): void => {
    request
      .post('log-out/')
      .then((res) => {
        console.log(res)
        context.setUserLoggedIn('0')
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (openSearch) {
      request
        .get('get/restaurant/')
        .then((res) => {
          setRestaurants(res.data.data)
        })
        .catch((err) => {
          console.log(err)
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
      {context.userLoggedIn === '1' ? (
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
    </nav>
  )
}

export default NavBar
