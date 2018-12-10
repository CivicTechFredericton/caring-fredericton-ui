import React from 'react';
import { Input, Typography, Grid, withStyles, createStyles } from '@material-ui/core';

const styles = () => createStyles({
   formField: {
     width: 350,
     paddingBottom: 10
   },
   input: {
     width: 200
   }, 
   spacing: {
    paddingBottom: 10
   }
})

const FormField = ({
    field, 
    form: { touched, errors },
    ...props
  }) => (
    <div>
    <Grid className={props.classes.formField}
          container 
          direction="row"
          justify="space-between"
          alignItems="center"
          item
          >
    { props.label && <Typography>
          {props.label}
    </Typography> }
      <Input className={props.classes.input} 
             type={props.type} {...field} {...props} />
    </Grid>
    {
      touched[field.name] && errors[field.name] && 
      <Typography classNmae={props.classes.spacing}>
      {errors[field.name]}
      </Typography>
    }
    </div>
  );

export default withStyles(styles)(FormField);
  