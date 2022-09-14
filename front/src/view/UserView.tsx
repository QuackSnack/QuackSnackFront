import { ReactElement, useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import request from '../plugin/request'
import { QSContext, reactContext } from '../plugin/context'
import getCookie from '../plugin/getCookie'
import { Stack } from '@mui/material'

function UserView(): ReactElement {
  const context: QSContext = useContext(reactContext)
  const [user, setUser] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    town: '',
    country: '',
    streetName: '',
  })

  useEffect(() => {
    request
      .get(`get-single/user/${context.userData.id as string}/`)
      .then((res) => {
        console.log(res)
        setUser({
          ...user,
          email: res.data.email,
          username: res.data.username,
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          town: res.data.town,
          country: res.data.country,
          streetName: res.data.street,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="main-frame">
      <h1>User</h1>
        <Stack spacing={2} className='data-display'>
        <TextField
          label="Email"
          variant="standard"
          InputProps={{
            readOnly: true
          }}
          value={user.email}
        />
        <TextField
          label="Username"
          variant="standard"
          InputProps={{
            readOnly: true
          }}
          value={user.username}
        />
        <TextField
          label="First name"
          variant="standard"
          InputProps={{
            readOnly: true
          }}
          value={user.firstName}
        />
        <TextField
          label="Last name"
          variant="standard"
          InputProps={{
            readOnly: true
          }}
          value={user.lastName}
        />
        <TextField
          label="Country"
          variant="standard"
          InputProps={{
            readOnly: true
          }}
          value={user.country}
        />
        <TextField
          label="Town"
          variant="standard"
          InputProps={{
            readOnly: true
          }}
          value={user.town}
        />
        <TextField
          label="Street name"
          variant="standard"
          InputProps={{
            readOnly: true
          }}
          value={user.streetName}
        />
        </Stack>
    </div>
  )
}

export default UserView
