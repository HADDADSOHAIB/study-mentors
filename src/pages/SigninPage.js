import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
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
import BACKEND from '../backend';
import { setFlash } from '../actions/layoutCreators';
import { setUser } from '../actions/authCreators';

const Signin = ({ history, setFlash, setUser }) => {
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

    axios.post(`${BACKEND}/api/v1/login`, {
      email,
      password,
      account_type: value === 0 ? 'Teacher' : 'Student',
    }).then(res => {
      localStorage.setItem('token_auth', res.data.access);
      history.push('/');
      setFlash({
        message: 'Signed In successfully',
        open: true,
        severity: 'success',
      });
      setUser(
        res.data.current_user,
        value === 0 ? 'Teacher' : 'Student',
      );
    }).catch(err => {
      if (err.response.data && err.response.data.message) {
        setFlash({
          message: err.response.data.message,
          open: true,
          severity: 'error',
        });
      } else {
        setFlash({
          message: 'Error, try later',
          open: true,
          severity: 'error',
        });
      }
    });
  };

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
          { value === 0
            && (
              <Typography color="textPrimary" variant="h6" className={classes.title}>
                Sign In as Teacher
              </Typography>
            )}
        </div>
        <div>
          {value === 1
            && (
              <Typography color="textPrimary" variant="h6" className={classes.title}>
                Sign In as Student
              </Typography>
            )}
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
  setFlash: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setFlash: flash => dispatch(setFlash(flash)),
  setUser: (currentUser, accountType) => dispatch(setUser(currentUser, accountType)),
});

export default connect(null, mapDispatchToProps)(Signin);
