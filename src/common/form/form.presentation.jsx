import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from 'common/loading-spinner';
import styles from './styles';
import AutobindComponent from 'common/autobind-component';
import classnames from 'classnames';
import { Grid, Button} from '@material-ui/core';

const FormError = ({ error, t, formValues }) => {
  if(error) {
    const errorValues = formValues ? formValues.toJS() : {};

    const finalErrorValues = {
      ...errorValues,
      message: error.message
    };

    return (<div className={ styles.errors }>
      <div className={ styles.error }>
      { t(`errors:${error.code}`, { ...finalErrorValues }) }
      </div>
    </div>);
  }

  return null;
};

class Form extends AutobindComponent {


  render() {
    const { onSubmit, header, submitting, valid, children, submitLabel, handleSubmit, error } = this.props;

    const finalFormClassName = classnames(
      styles.form,
      { [styles.submitting]: submitting }
    );

    return (
      <Grid
      container
      direction="column"
      justify="center"
      alignItems="center">
    <div className={ finalFormClassName }>
      { header ? (<h1>{ header }</h1>) : null }
      <form onSubmit={ handleSubmit(onSubmit) }>
        { submitting ? (<div className={ styles.spinner }><LoadingSpinner /></div>) : null }
        {
          children instanceof Function ?
          children(this.props) :
          children
        }
        {
          submitLabel ?
          (<Grid item>
              <Button color="primary"  type="submit"  disabled={ !valid || submitting }>{submitLabel}</Button>
          </Grid>) :
          null
        }
        {
          error ?
          (
            <div className="formError">
          <FormError { ...this.props } />
          </div>
           ) :
          null
        }
      </form>
    </div>
    </Grid>
    );
  }
}

FormError.propTypes = Form.propTypes = {
  header: PropTypes.node,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  valid: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]),
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formValues: PropTypes.any,
  error: PropTypes.shape({
    code: PropTypes.string,
    message: PropTypes.string
  })
};

export default Form;
