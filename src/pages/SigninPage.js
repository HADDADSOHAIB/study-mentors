import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import { useForm } from 'react-hook-form';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useStyles from './SigninPageStyles';
import { setFlash } from '../actions/layoutCreators';
import { signIn } from '../actions/authCreators';

const Signin = ({
  history,
  signIn,
  redirect,
}) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = data => {
    const {
      email,
      password,
    } = data;
    signIn(email, password, value === 0 ? 'Teacher' : 'Student');
  };

  useEffect(() => {
    if (redirect) {
      history.push('/');
    }
    return () => '';
  }, [redirect]);

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <AppBar position="static" classes={{ root: classes.appbar }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Teacher" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
            <Tab label="Student" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
          </Tabs>
        </AppBar>
        <div>
          <Typography color="textPrimary" variant="h6" className={classes.title}>
            {`Sign In as ${!value ? 'Teacher' : 'Student'}`}
          </Typography>
        </div>
        <CardContent>
          <form className={classes.from} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.textField}>
              <TextField
                inputRef={register}
                required
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                fullWidth
                size="small"
              />
            </div>
            <div className={classes.textField}>
              <TextField
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                size="small"
                inputRef={register}
                fullWidth
                required
              />
            </div>
            <div className={classes.submit}>
              <Button variant="outlined" color="primary" type="submit">
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

Signin.propTypes = {
  history: PropTypes.shape([]).isRequired,
  signIn: PropTypes.func.isRequired,
  redirect: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setFlash: flash => dispatch(setFlash(flash)),
  signIn: (email, password, type) => dispatch(signIn(email, password, type)),
});

const mapStateToProps = state => ({
  redirect: state.auth.redirect,
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
