import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  }
})

const Header = ({ classes }) => (
  <Grid container spacing={16}>
    <Grid item xs={12}>
      <Paper elevation={1} className={classes.paper}>
        <Typography variant={'display3'}>Notes</Typography>
      </Paper>
    </Grid>
  </Grid>
)

export default withStyles(styles)(Header)
