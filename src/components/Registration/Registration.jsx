import React from 'react';
// import validate from './validate';
import Form from 'common/form';
import FormField from 'common/form-field';
import { Field } from 'redux-form/immutable';
//import { SubmitHandler } from 'redux-form';
import PropTypes from 'prop-types';
import { FORM_NAME } from './constants';
//import IPropTypes from 'react-immutable-proptypes';
import { Grid } from '@material-ui/core';

import { register } from 'auth/cognito-redux/actions';

class Registration extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { t } = this.props;
        return (

            <Form onSubmit={register} form={FORM_NAME} submitLabel={t('register:register')}>
                <Grid container
                    direction="column"
                    justify="flex-start"
                    alignItems="center" >
                    <Grid item>
                        <Field
                            required={true} component={FormField} type="text"
                            name="orgName" label={t('register:orgName')}
                        />
                    </Grid>
                    <Grid item>
                        <Field
                            required={true} component={FormField} type="text"
                            name="email" label={t('register:email')}
                        />
                    </Grid>
                    <Grid item>
                        <Field
                            required={true} component={FormField} type="text"
                            name="phoneNumber" label={t('register:phoneNumber')}
                        />
                    </Grid>
                </Grid>
            </Form>

        )
    }

}

Registration.propTypes = {
    t: PropTypes.func.isRequired
};

export default Registration;