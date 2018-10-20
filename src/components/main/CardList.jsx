import React from 'react'
import Card from './Card'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    marginTop: theme.spacing.unit * 3
  }
})

const CardList = props => (
  <Grid
    container
    className={props.classes.container}
    justify='space-around'
    spacing={24}
  >
    {props.cardList.map((cardItem, index) => {
      return (
        <Grid key={index} justify='center' item>
          <Card
            cardItem={cardItem}
            index={index}
            key={index}
            deleteCard={props.deleteCard}
            editCard={props.editCard}
          />
        </Grid>
      )
    })}
  </Grid>
)

export default withStyles(styles)(CardList)
