import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'

function Transition (props) {
  return <Slide direction='up' {...props} />
}

class CardView extends React.Component {
  render () {
    return (
      <Dialog
        open={this.props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.props.handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {'Add new card'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Add new content
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.closeCardView} color='primary'>
            Cancel
          </Button>
          <Button onClick={this.props.closeCardView} color='primary'>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default CardView
