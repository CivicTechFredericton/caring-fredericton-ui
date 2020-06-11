import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Button from '../../common/button/button';
import SuspenseView from '../../suspense-view';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';
import { useTranslation } from 'react-i18next';

import useAuthDataContext from '../../../auth/hooks/useAuthDataContext';
import {
  getOrganizationDetails,
  verifyOrganization,
} from '../../../api/organization';

const useFetch = (orgId, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { success, data, errorMessage } = await getOrganizationDetails(
        orgId
      );
      if (success) {
        await setData(data);
      } else {
        await setError(errorMessage);
      }
    };

    fetchData();
  }, [orgId]);

  return { data, error };
};

const ValidationPage = () => {
  const { goToPage } = useAuthDataContext();
  const { t, ready } = useTranslation(['organization', 'error']);
  const classes = useStyles();

  const match = useRouteMatch();
  const orgId = match.params.orgId;
  const response = useFetch(orgId, {});

  if (!response.data) {
    if (response.error) {
      return (
        <form>
          <div>{t('error:organizationDoesNotExist')}</div>
        </form>
      );
    }

    return <SuspenseView />;
  }

  const responseData = response.data;

  let orgName = responseData.name;
  let orgEmail = responseData.email;
  let phoneNumber = responseData.phone;
  let street = responseData.address.street;
  let city = responseData.address.city;
  let province = responseData.address.province;
  let postalCode = responseData.address.postal_code;
  let adminFirstName = responseData.administrator_details.first_name;
  let adminLastName = responseData.administrator_details.last_name;
  let adminEmail = responseData.administrator_details.email;

  const onSubmit = async () => {
    const { success, errorMessage } = await verifyOrganization(orgId);
    if (success) {
      goToPage();
    } else {
      // TODO: Handle the error message
      console.log(errorMessage);
    }
  };

  if (!ready) {
    return <SuspenseView />;
  }

  return (
    <div className={classes.root}>
      <Typography variant='h3'>
        {t('organization:lblValidateOrganization')}
      </Typography>
      <br />
      <Divider />
      <br />
      <div>
        <Typography variant='h5'>
          {t('organization:lblOrganization')}
        </Typography>
        <Typography>{t('organization:organizationName') + orgName}</Typography>
        <Typography>{t('organization:email') + orgEmail}</Typography>
        <Typography>{t('organization:phoneNumber') + phoneNumber}</Typography>
      </div>
      <br />
      <div>
        <Typography variant='h5'>{t('organization:lblAddress')}</Typography>
        <Typography>{t('organization:street') + street}</Typography>
        <Typography>{t('organization:city') + city}</Typography>
        <Typography>{t('organization:province') + province}</Typography>
        <Typography>{t('organization:postalCode') + postalCode}</Typography>
      </div>
      <br />
      <div>
        <Typography variant='h5'>
          {t('organization:lblAdministrator')}
          <Typography>
            {t('organization:adminFirstName') + adminFirstName}
          </Typography>
          <Typography>
            {t('organization:adminLastName') + adminLastName}
          </Typography>
          <Typography>{t('organization:adminEmail') + adminEmail}</Typography>
        </Typography>
      </div>
      <br />
      <Divider />
      <br />
      <Button onClick={onSubmit}>{t('organization:btnValidate')}</Button>
    </div>
  );
};

export default ValidationPage;
