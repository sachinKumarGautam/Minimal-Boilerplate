import React from 'react'
import Card from './Card'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    flexGrow: 1
  }
})

const CardList = props => (
  <Grid container justify='space-around' spacing={24}>
    {props.cardList.map((cardItem, index) => {
      return (
        <Grid key={index} justify='center' item>
          <Card />
        </Grid>
      )
    })}
  </Grid>
)

export default withStyles(styles)(CardList)
