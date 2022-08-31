/* eslint-disable no-console */
import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Button, Divider } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import axios from 'axios'

function SignIn(props: { open: boolean; setOpen: Function }) {
  const { open } = props
  const { setOpen } = props

  function getCookie(name: string) {
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';')
      for (let i = 0; i < cookies.length; i + 1) {
        const cookie = cookies[i].trim()
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === `${name  }=`) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
          break
        }
      }
    }
    return cookieValue
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()

    axios.post(
      'http://localhost:8000/test/',
      {
        next: '/',
        username: 'admin@admin.com',
        password: 'Cancun10!',
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('X-CSRFToken'),
        },
        withCredentials: true,
      },
    ).then((res) => {
      console.log(res)
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
                <TextField className='text-field' label='Username' variant='outlined' color='success' name='username' />
              </Grid>
              <Grid item xs={12}>
                <TextField className='text-field' label='Password' variant='outlined' color='success' type='password' name='password' />
              </Grid>
            </Grid>
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
