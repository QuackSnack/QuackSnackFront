import { ReactElement, useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import request from '../plugin/request'
import { QSContext, reactContext } from '../plugin/context'
import getCookie from '../plugin/getCookie'
import { Button, Divider, Stack, Typography } from '@mui/material'

function UserView(): ReactElement {
  const context: QSContext = useContext(reactContext)
  const [user, setUser] = useState({
    email: '',
    username: '',
    currentPassword: '',
    newPassword: '',
    repeatedNewPassword: '',
    firstName: '',
    lastName: '',
    town: '',
    country: '',
    streetName: ''
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
          currentPassword: '',
          newPassword: '',
          repeatedNewPassword: '',
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          town: res.data.town,
          country: res.data.country,
          streetName: res.data.street
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleChange = (event: { target: { name: string; value: string } }): void => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: any): void => {
    event.preventDefault()
    request
      .post(`modify-single/user/${context.userData.id as string}/`, user)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  }

  return (
    <div className="main-frame">
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="row" className="data-display">
          <Stack spacing={2} className="data-display">
            <TextField label="Email" name="email" variant="standard" value={user.email} type="email" onChange={handleChange} />
            <TextField label="Username" name="username" variant="standard" value={user.username} onChange={handleChange} />
            <TextField label="New password" name="newPassword" variant="standard" value={user.newPassword} type="password" onChange={handleChange} />
            <TextField label="Repeat your new password" name="repeatedNewPassword" variant="standard" value={user.repeatedNewPassword} type="password" onChange={handleChange} />
          </Stack>
          <Stack spacing={2} className="data-display">
            <TextField label="First name" name="firstName" variant="standard" value={user.firstName} onChange={handleChange} />
            <TextField label="Last name" name="lastName" variant="standard" value={user.lastName} onChange={handleChange} />
            <TextField label="Country" name="country" variant="standard" value={user.country} onChange={handleChange} />
            <TextField label="Town" name="town" variant="standard" value={user.town} onChange={handleChange} />
            <TextField label="Street name" name="streetName" variant="standard" value={user.streetName} onChange={handleChange} />
          </Stack>
        </Stack>
        <Typography>To validate, please type your current password:</Typography>
        <TextField label="Current password" name="currentPassword" variant="standard" value={user.currentPassword} onChange={handleChange} type="password" />
        <Button type="submit" variant="contained" color="secondary">
          Confirm
        </Button>
      </form>
    </div>
  )
}

export default UserView
