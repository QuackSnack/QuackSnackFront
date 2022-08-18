import React, { useCallback, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Button, Divider } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

function SignUp(props: { open: boolean; setOpen: Function }) {
  const { open } = props
  const { setOpen } = props
  const [role, setRole] = React.useState('0')
  const [fields, setFields] = React.useState({
    email: '',
    password: '',
    repeatedPassword: '',
  })
  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
  })

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setRole(event.target.value)
  }

  const handleValidation = (event: React.ChangeEvent<{ value: string }>, target: string) => {
    setFields((prevState) => ({
      ...prevState,
      [target]: event.target.value,
    }))

    if (fields.email.includes('@') && fields.email.includes('.')) {
      setErrors((prevState) => ({
        ...prevState,
        [target]: '',
      }))
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [target]: 'Email is invalid',
      }))
    }

    if (fields.password === fields.repeatedPassword) {
      setErrors((prevState) => ({
        ...prevState,
        password: '',
      }))
    } else {
      setErrors((prevState) => ({
        ...prevState,
        password: 'Passwords are not the same',
      }))
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen('')}>
        <DialogTitle>Create your account</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                value={fields.email}
                className='text-field'
                label='Email address'
                variant='outlined'
                color='success'
                type='email'
                onChange={(event) => handleValidation(event, 'email')}
                error={errors.email !== ''}
                helperText={errors.email === '' ? null : errors.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField className='text-field' label='Username' variant='outlined' color='success' />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className='text-field'
                label='Password'
                variant='outlined'
                color='success'
                type='password'
                value={fields.password}
                onChange={(event) => handleValidation(event, 'password')}
                error={errors.password !== ''}
                helperText={errors.password === '' ? null : errors.password}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className='text-field'
                label='Repeated password'
                variant='outlined'
                color='success'
                type='password'
                value={fields.repeatedPassword}
                onChange={(event) => handleValidation(event, 'repeatedPassword')}
                error={errors.password !== ''}
                helperText={errors.password === '' ? null : errors.password}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField className='text-field' label='First name' variant='outlined' color='success' />
            </Grid>
            <Grid item xs={6}>
              <TextField className='text-field' label='Last name' variant='outlined' color='success' />
            </Grid>
            <Grid item xs={6}>
              <TextField className='text-field' label='Town' variant='outlined' color='success' />
            </Grid>
            <Grid item xs={6}>
              <TextField className='text-field' label='Country' variant='outlined' color='success' />
            </Grid>
            <Grid item xs={6}>
              <TextField className='text-field' label='Street name' variant='outlined' color='success' />
            </Grid>
            <Grid item xs={6}>
              <TextField className='text-field' select label='Role' color='success' value={role} onChange={handleChange}>
                <MenuItem value='0'>Client</MenuItem>
                <MenuItem value='1'>Restaurant</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant='outlined' color='secondary' onClick={() => setOpen('')}>
            Cancel
          </Button>
          <Button variant='contained' color='secondary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SignUp
