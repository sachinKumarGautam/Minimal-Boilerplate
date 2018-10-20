import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

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
  },
  noCardYet: {
    marginTop: theme.spacing.unit * 3
  }
})

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      isEdit: false,
      cardList: [],
      progressCardItem: {},
      inProgressIndex: null
    }
  }

  openCardView = () => {
    this.setState({
      open: true,
      progressCardItem: {},
      inProgressIndex: null,
      isEdit: false
    })
  }

  closeCardView = () => {
    this.setState({
      open: false
    })
  }

  addCard = data => {
    console.log(data, this)
    const newCard = {
      card_title: data.card_title,
      card_description: data.card_description,
      date_added: data.date_added
    }
    this.setState(prevState => ({
      cardList: [...prevState.cardList, newCard]
    }))
  }

  updateCard = value => {
    const cardList = this.state.cardList
    const inProgressIndex = this.state.inProgressIndex
    const updatedCardList = cardList.map((item, index) => {
      if (index !== inProgressIndex) {
        return item
      } else {
        return {
          ...item,
          card_title: value.card_title,
          card_description: value.card_description
        }
      }
    })
    this.setState({
      cardList: updatedCardList
    })
  }

  deleteCard = (index, event) => {
    event.stopPropagation()
    console.log(event)
    let updatedCardList = []
    const cardList = this.state.cardList
    updatedCardList = cardList.slice()
    updatedCardList.splice(index, 1)
    this.setState({
      cardList: updatedCardList
    })
  }

  editCard = (cardItem, index) => {
    this.setState({
      open: true,
      isEdit: true,
      progressCardItem: cardItem,
      inProgressIndex: index
    })
  }

  render () {
    const { classes } = this.props
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
              {!this.state.cardList.length &&
                <Typography variant={'display1'} className={classes.noCardYet}>
                  You have not added any card yet!
                </Typography>}
              <CardList
                cardList={this.state.cardList}
                deleteCard={this.deleteCard}
                editCard={this.editCard}
              />
            </Paper>
          </Grid>
        </Grid>
        <CardView
          addCard={this.addCard}
          open={this.state.open}
          closeCardView={this.closeCardView}
          isEdit={this.state.isEdit}
          updateCard={this.updateCard}
          progressCardItem={this.state.progressCardItem}
        />
      </div>
    )
  }
}

export default withStyles(styles)(Main)
