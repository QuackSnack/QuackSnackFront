import { FormEvent, ReactElement, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Button, Divider } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import getCookie from '../plugin/getCookie'
import request from '../plugin/request'
import { useCurrentContext } from '../plugin/context'

interface ChildProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<string>>
}

function SignIn({ open, setOpen }: ChildProps): ReactElement {
  const { setUserData, setSnackBar } = useCurrentContext()
  const [formValue, setformValue] = useState({
    username: 'McDonalds',
    password: 'password'
  })

  const handleChange = (event: { target: { name: string; value: string } }): void => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    request
      .post('sign-in/', formValue)
      .then((res) => {
        setOpen('')
        setUserData(res.data.user)
        setSnackBar(res.data.message)
        setTimeout(function () {
          window.location.reload()
        }, 3000)
      })
      .catch((err) => {
        setSnackBar(err.response.data.message)
      })
  }

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen('')}>
        <DialogTitle id="scroll-dialog-title">Sign in</DialogTitle>
        <Divider />
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="csrfmiddlewaretoken" value={getCookie('X-CSRFToken')} />
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField className="text-field" label="Username" variant="outlined" color="success" name="username" onChange={handleChange} value={formValue.username} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="text-field"
                  label="Password"
                  variant="outlined"
                  color="success"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={formValue.password}
                />
              </Grid>
            </Grid>
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

export default SignIn
