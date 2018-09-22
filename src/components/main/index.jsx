import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import SideBar from './SideBar'
import CardView from './CardView'
import CardList from './CardList'

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
    marginBottom: theme.spacing.unit,
    height: '100vh'
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  }
})

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      cardList: [
        { sjskjs: 'sklsskl' },
        { sjskjs: 'sklsskl' },
        { sjskjs: 'sklsskl' }
      ]
    }
  }

  openCardView = () => {
    this.setState({
      open: true
    })
  }

  closeCardView = () => {
    this.setState({
      open: false
    })
  }

  render () {
    const { classes } = this.props
    console.log(this.closeCardView)
    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={1}>
            <Paper elevation={1} className={classes.paper}>
              <SideBar
                openCardView={this.openCardView}
                closeCardView={this.closeCardView}
              />
            </Paper>
          </Grid>
          <Grid item xs={11}>
            <Paper elevation={1} className={classes.paper}>
              {!this.state.cardList &&
                <div>You have not added any card yet!</div>}
              <CardList cardList={this.state.cardList} />
            </Paper>
          </Grid>
        </Grid>
        <CardView open={this.state.open} closeCardView={this.closeCardView} />
      </div>
    )
  }
}

export default withStyles(styles)(Main)
