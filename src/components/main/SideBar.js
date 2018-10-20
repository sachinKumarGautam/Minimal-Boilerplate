import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  button: {
    border: '1px dashed grey'
  }
})

const SideBar = ({ classes, openCardView }) => (
  <div>
    <Button className={classes.button} onClick={openCardView}>
      ADD
    </Button>
  </div>
)

export default withStyles(styles)(SideBar)
