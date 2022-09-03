import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Button, Divider, Snackbar } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import getCookie from '../plugins/getCookie'
import request from '../plugins/request'

function SignIn(props: { open: boolean; setOpen: Function }) {
  const { open } = props
  const { setOpen } = props
  const [snackbarMessage, setsnackbarMessage] = useState('')
  const [formValue, setformValue] = useState({
    username: '',
    password: '',
  })

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    request
      .post('sign-in/', formValue)
      .then((res) => {
        setsnackbarMessage(res.data.message)
        setOpen('')
      })
      .catch((err) => {
        setsnackbarMessage(err.response.data.message)
      })
  }

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen('')} aria-labelledby='scroll-dialog-title' aria-describedby='scroll-dialog-description'>
        <DialogTitle id='scroll-dialog-title'>Sign in</DialogTitle>
        <Divider />
        <form onSubmit={handleSubmit}>
          <input type='hidden' name='csrfmiddlewaretoken' value={getCookie('X-CSRFToken')} />
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField className='text-field' label='Username' variant='outlined' color='success' name='username' onChange={handleChange} value={formValue.username} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className='text-field'
                  label='Password'
                  variant='outlined'
                  color='success'
                  type='password'
                  name='password'
                  onChange={handleChange}
                  value={formValue.password}
                />
              </Grid>
            </Grid>
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              onClose={() => setsnackbarMessage('')}
              open={snackbarMessage !== ''}
              message={snackbarMessage}
              autoHideDuration={3000}
            />
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button variant='outlined' color='secondary' onClick={() => setOpen('')}>
              Cancel
            </Button>
            <Button type='submit' variant='contained' color='secondary'>
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default SignIn
