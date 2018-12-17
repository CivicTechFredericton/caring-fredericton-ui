import React from 'react';
// import validate from './validate';
// import Form from 'common/form';
// import FormField from 'common/form-field';
// import { Field } from 'redux-form/immutable';
// import { SubmitHandler } from 'redux-form';
import {
    Formik,
    Form,
    Field,
    //        ErrorMessage 
} from 'formik';
import PropTypes from 'prop-types';
// import { FORM_NAME } from './constants';
// import IPropTypes from 'react-immutable-proptypes';
import { Grid, withStyles, createStyles, Typography, TextField, Button } from '@material-ui/core';

// import { register } from 'auth/cognito-redux/actions';

const styles = () => createStyles({
    root: {
        paddingTop: 35
    },
    field: {
        paddingBottom: 15
    }

});

class Registration extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { t, classes } = this.props;
        return (
            <div className={classes.root}>
                {/* <Form onSubmit={register} form={FORM_NAME} submitLabel={t('register:register')}> */}
                <Grid container direction='column' justify='flex-start' alignItems='center'>
                    <h1>Registration</h1>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={values => {
                            let errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            } else {
                                errors.email = '';
                            }

                            if (!values.password) {
                                errors.password = 'Required';
                            } else {
                                errors.password = '';
                            }

                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Grid
                                    container
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="center"
                                >
                                    <Typography>
                                        Please Enter Organization Details
                                    </Typography>
                                    <Grid className={classes.field} item>
                                        <Field
                                            component={TextField} 
                                            type="text"
                                            name="orgName" 
                                            label={t('register:orgName')}
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                            placeholder={t('register:orgName')}
                                        />
                                    </Grid>
                                    <Grid className={classes.field} item>
                                        <Field
                                            required={true} component={TextField} type="text"
                                            name="email" label={t('register:email')}
                                            margin="normal"
                                            variant="outlined"
                                            placeholder={t('register:orgName')}
                                            className={classes.textField}
                                        />
                                    </Grid>
                                    <Grid className={classes.field} item>
                                        <Field
                                            required={true} component={TextField} type="text"
                                            name="phoneNumber" label={t('register:phoneNumber')}
                                            margin="normal"
                                            variant="outlined"
                                            placeholder={t('register:phoneNumber')}
                                            className={classes.textField}
                                        />
                                    </Grid>
                                    <Grid className={classes.field} item>
                                        <Field
                                            required={true} component={TextField} type="text"
                                            name="address" label={t('register:address')}
                                            margin="normal"
                                            variant="outlined"
                                            placeholder={t('register:address')}
                                            className={classes.textField}
                                        />
                                    </Grid>
                                    <Grid className={classes.field} item>
                                        <Field
                                            required={true} component={TextField} type="text"
                                            name="postalCode" label={t('register:postalCode')}
                                            margin="normal"
                                            variant="outlined"
                                            placeholder={t('register:postalCode')}
                                            className={classes.textField}
                                        />
                                    </Grid>
                                    <Typography>
                                        Caring Calendar Administrator
                                     </Typography>
                                    <Grid className={classes.field} item>
                                        <Field
                                            required={true} component={TextField} type="text"
                                            name="adminName" label={t('register:name')}
                                            margin="normal"
                                            variant="outlined"
                                            placeholder={t('register:name')}
                                            className={classes.textField}
                                        />
                                    </Grid>
                                    <Grid className={classes.field} item>
                                        <Field
                                            required={true} component={TextField} type="text"
                                            name="adminEmail" label={t('register:email')}
                                            margin="normal"
                                            variant="outlined"
                                            placeholder={t('register:email')}
                                            className={classes.textField}
                                        />
                                    </Grid>
                                    <Grid className={classes.field} item>
                                        <Field
                                            required={true} component={TextField} type="password"
                                            name="password" label={t('register:password')}
                                            margin="normal"
                                            variant="outlined"
                                            placeholder={t('register:password')}
                                            className={classes.textField}
                                        />
                                    </Grid>
                                    <Grid className={classes.field} item>
                                        <Field
                                            required={true} component={TextField} type="password"
                                            name="confirmPassword" label={t('register:confirmPassword')}
                                            margin="normal"
                                            variant="outlined"
                                            placeholder={t('register:confirmPassword')}
                                            className={classes.textField}
                                        />
                                    </Grid>
                                    <Button className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={isSubmitting}>
                                    Submit
                                   </Button>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </div>
        )
    }

}

Registration.propTypes = {
    t: PropTypes.func.isRequired,
    classes: PropTypes.object
};

export default withStyles(styles)(Registration);