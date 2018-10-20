import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import IconButton from '@material-ui/core/IconButton'

const styles = {
  card: {
    width: 320,
    cursor: 'pointer'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}

function CardItem (props) {
  const { classes, cardItem, deleteCard, index, editCard } = props
  return (
    <Card
      className={classes.card}
      onClick={editCard.bind(this, cardItem, index)}
    >
      <CardHeader
        title={cardItem.card_title}
        subheader={cardItem.date_added}
        action={
          <IconButton key={index} onClick={deleteCard.bind(this, index)}>
            <DeleteOutlinedIcon className={classes.icon} />
          </IconButton>
        }
      />
      <CardContent>
        {cardItem.card_description}
      </CardContent>
      <CardActions />
    </Card>
  )
}

export default withStyles(styles)(CardItem)
