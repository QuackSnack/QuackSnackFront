import { ReactElement, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Button, Divider, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import getCookie from '../plugins/getCookie'
import request from '../plugins/request'

interface ChildProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<string>>
}

function SignUp({ open, setOpen }: ChildProps): ReactElement {
  const [formValue, setformValue] = useState({
    email: '',
    username: '',
    password: '',
    repeatedPassword: '',
    firstName: '',
    lastName: '',
    town: '',
    country: '',
    streetName: '',
    role: '0'
  })

  const handleChange = (event: { target: { name: string; value: string } }): void => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: any): void => {
    event.preventDefault()
    request
      .post('sign-up/', formValue)
      .then(() => {
        setOpen('')
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  }

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen('')}>
        <DialogTitle>Create your account</DialogTitle>
        <Divider />
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="csrfmiddlewaretoken" value={getCookie('X-CSRFToken')} />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  value={formValue.email}
                  onChange={handleChange}
                  name="email"
                  className="text-field"
                  label="Email address"
                  variant="outlined"
                  color="success"
                  type="email"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField value={formValue.username} onChange={handleChange} name="username" className="text-field" label="Username" variant="outlined" color="success" required />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={formValue.password}
                  onChange={handleChange}
                  name="password"
                  className="text-field"
                  label="Password"
                  variant="outlined"
                  color="success"
                  type="password"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={formValue.repeatedPassword}
                  onChange={handleChange}
                  name="repeatedPassword"
                  className="text-field"
                  label="Repeated password"
                  variant="outlined"
                  color="success"
                  type="password"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={formValue.firstName}
                  onChange={handleChange}
                  name="firstName"
                  className="text-field"
                  label="First name"
                  variant="outlined"
                  color="success"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={formValue.lastName}
                  onChange={handleChange}
                  name="lastName"
                  className="text-field"
                  label="Last name"
                  variant="outlined"
                  color="success"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField value={formValue.town} onChange={handleChange} name="town" className="text-field" label="Town" variant="outlined" color="success" required />
              </Grid>
              <Grid item xs={6}>
                <TextField value={formValue.country} onChange={handleChange} name="country" className="text-field" label="Country" variant="outlined" color="success" required />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={formValue.streetName}
                  onChange={handleChange}
                  name="streetName"
                  className="text-field"
                  label="Street name"
                  variant="outlined"
                  color="success"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField value={formValue.role} onChange={handleChange} name="role" className="text-field" select label="Role" color="success" required>
                  <MenuItem value="0">Client</MenuItem>
                  <MenuItem value="1">Restaurant</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Typography variant="caption">* : field required.</Typography>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={() => setOpen('')}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="secondary">
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default SignUp
