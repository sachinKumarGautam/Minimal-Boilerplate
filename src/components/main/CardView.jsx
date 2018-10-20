import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import CardViewForm from './CardViewForm'

function Transition (props) {
  return <Slide direction='up' {...props} />
}

const styles = theme => ({
  cardViewWrapper: {
    minHeight: '300px',
    minWidth: '500px'
  },
  dialogTitle: {
    textAlign: 'center'
  }
})

class CardView extends React.Component {
  addCardToList = data => {
    this.props.addCard(data)
  }

  updateCardToList = data => {
    this.props.updateCard(data)
  }

  render () {
    const { classes, isEdit, progressCardItem } = this.props
    return (
      <Dialog
        open={this.props.open}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          paper: classes.cardViewWrapper
        }}
        scroll={'body'}
        onClose={this.props.handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle
          className={classes.dialogTitle}
          id='alert-dialog-slide-title'
        >
          {isEdit ? 'Update card' : 'Add new card'}
        </DialogTitle>
        <DialogContent>
          <CardViewForm
            closeCardView={this.props.closeCardView}
            onSubmit={this.addCardToList}
            onSubmit={isEdit ? this.updateCardToList : this.addCardToList}
            isEdit={isEdit}
            progressCardItem={progressCardItem}
          />
        </DialogContent>
        <DialogActions />
      </Dialog>
    )
  }
}

export default withStyles(styles)(CardView)
