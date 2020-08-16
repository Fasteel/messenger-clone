import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

const UsernameDialog = ({ current, send }) => (
  <Dialog
    open={current.name === 'editingUsername'}
    onClose={() => {}}
    aria-labelledby='form-dialog-title'
  >
    <DialogTitle id='form-dialog-title'>Information</DialogTitle>
    <DialogContent>
      <DialogContentText>
        La conversation est effacé toutes les 10 minutes.
      </DialogContentText>
      <TextField
        autoFocus
        value={current.context.editedUsername}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            send('submitUsername')
          }
        }}
        margin='dense'
        id='name'
        label='Pseudo'
        type='text'
        onChange={(ev) => {
          send({
            type: 'editUsername',
            value: ev.target.value
          })
        }}
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => send('cancel')} color='primary'>
        Annuler
      </Button>
      <Button onClick={() => send('submitUsername')} color='secondary'>
        Enregistrer
      </Button>
    </DialogActions>
  </Dialog>
)

export default UsernameDialog
