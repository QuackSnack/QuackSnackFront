import { FormEvent, ReactElement, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import request from '../plugin/request'
import { useCurrentContext } from '../plugin/context'
import getCookie from '../plugin/getCookie'
import { Button, Stack, Typography } from '@mui/material'
import NoAccessView from './NoAccessView'

function UserView(): ReactElement {
  const { userValid, checkUser, userData, setSnackBar } = useCurrentContext()
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
    checkUser()
    if (userData !== null) {
      request
        .get(`get/user/${userData.id as string}/`)
        .then((res) => {
          setUser({
            ...user,
            email: res.data.data.email,
            username: res.data.data.username,
            currentPassword: '',
            newPassword: '',
            repeatedNewPassword: '',
            firstName: res.data.data.first_name,
            lastName: res.data.data.last_name,
            town: res.data.data.town,
            country: res.data.data.country,
            streetName: res.data.data.street
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  const handleChange = (event: { target: { name: string; value: string } }): void => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    request
      .post(`modify/user/${userData.id as string}/`, user)
      .then((res) => {
        setSnackBar(res.data.message)
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  }

  if (userValid) {
    return (
      <div className="main-frame">
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="csrfmiddlewaretoken" value={getCookie('X-CSRFToken')} />
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
  } else {
    return <NoAccessView message={'You are not logged in.'} />
  }
}

export default UserView
