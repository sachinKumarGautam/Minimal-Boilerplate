import React from 'react'
import Input from '@material-ui/core/Input'
import { withStyles } from '@material-ui/core/styles'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { dateFormat } from '../../utils/dateFormat'

const styles = theme => ({
  formControl: {
    marginBottom: theme.spacing.unit,
    width: '100%',
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit * 6
  },
  input1: {
    border: '1px solid #800080',
    opacity: '0.3px',
    borderRadius: '4px'
  },
  input2: {
    border: '1px solid #800080',
    borderRadius: '4px',
    opacity: '0.3px',
    marginTop: theme.spacing.unit * 3
  },
  cardWrapper: {
    flexDirection: 'column',
    display: 'flex'
  },
  buttonWrapper: {
    marginLeft: theme.spacing.unit * 2
  }
})

const CardViewForm = props => {
  const { errors, touched, handleChange, handleSubmit, isEdit } = props
  return (
    <div className={props.classes.cardWrapper}>
      <form onSubmit={handleSubmit}>
        <FormControl
          className={props.classes.formControl}
          aria-describedby='card-text'
          error={errors.card_title && touched.card_title}
        >
          <Input
            className={props.classes.input1}
            disableUnderline
            onChange={handleChange}
            id='card_title'
            inputProps={{
              'aria-label': 'Description',
              placeholder: 'Add card title'
            }}
          />
          {errors.card_title &&
            touched.card_title &&
            <FormHelperText id='card_title'>
              {errors.card_title}
            </FormHelperText>}
        </FormControl>
        <FormControl
          className={props.classes.formControl}
          aria-describedby='card-description'
          error={errors.card_description && touched.card_description}
        >
          <Input
            className={props.classes.input2}
            multiline
            id='card_description'
            onChange={handleChange}
            disableUnderline
            rows={5}
            inputProps={{
              'aria-label': 'Description',
              placeholder: 'Add card content here'
            }}
          />
          {errors.card_description &&
            touched.card_description &&
            <FormHelperText id='card_description'>
              {errors.card_description}
            </FormHelperText>}
        </FormControl>
        <div className={props.classes.buttonWrapper}>
          <Button onClick={props.closeCardView} color='primary'>
            Cancel
          </Button>
          <Button type='submit' color='primary'>
            {isEdit ? 'Update' : 'Add'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default withStyles(styles)(
  withFormik({
    mapPropsToValues: props => {
      return {
        // card_title: props.progressCardItem.card_title,
        // card_description: props.progressCardItem.card_description
      }
    },
    validationSchema: Yup.object().shape({
      card_title: Yup.string().required(),
      card_description: Yup.string().required()
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
      const updatedValue = {
        ...values,
        date_added: dateFormat()
      }
      props.onSubmit(updatedValue)
      props.closeCardView()
    },
    displayName: 'CardViewForm' // helps with React DevTools
  })(CardViewForm)
)
