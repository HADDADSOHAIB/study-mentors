import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import { useForm } from 'react-hook-form';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useStyles from './SignupPageStyles';
import BACKEND from '../backend';
import { setFlash } from '../actions/layoutCreators';
import { setUser } from '../actions/authCreators';

const Signup = ({ history, setFlash, setUser }) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    errors,
  } = useForm();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => setValue(newValue);
  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);
  const handlePasswordConfirmation = e => setPasswordConfirmation(e.target.value);

  const onSubmit = data => {
    const {
      email,
      fullname,
      password,
    } = data;

    axios.post(`${BACKEND}/api/v1/signup`, {
      user: {
        email,
        fullname,
        password,
      },
      account_type: value === 0 ? 'teacher' : 'student',
    }).then(res => {
      localStorage.setItem('token_auth', res.data.access);
      history.push('/');
      setFlash({
        message: 'account created successfully',
        open: true,
        severity: 'success',
      });
      setUser(
        res.data.current_user,
        value === 0 ? 'teacher' : 'student',
      );
    }).catch(() => {
      setFlash({
        message: 'Error, try later',
        open: true,
        severity: 'error',
      });
    });
  };

  const shouldMatch = () => password === passwordConfirmation;
  const shouldBeUnique = async () => {
    const unique = await axios.post(`${BACKEND}/api/v1/signup/unique`, { email });
    return unique.data.email;
  };

  const errorMessage = (errors, name) => {
    if (errors[name] && errors[name].type === 'required') {
      return 'field required';
    }
    if (errors[name] && errors[name].type === 'minLength') {
      return 'Should be more the 8 caracters';
    }
    if (errors[name] && errors[name].type === 'match') {
      return 'the password does not match';
    }
    if (errors[name] && errors[name].type === 'unique') {
      return 'should be unique, this one already taken';
    }
    return '';
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
                Teacher account
              </Typography>
            )}
        </div>
        <div>
          {value === 1
            && (
              <Typography color="textPrimary" variant="h6" className={classes.title}>
                Student account
              </Typography>
            )}
        </div>
        <CardContent>
          <form className={classes.from} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.textField}>
              <TextField
                inputRef={register({ required: true, validate: { unique: () => shouldBeUnique('email') } })}
                required
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                fullWidth
                size="small"
                error={!!errors.email}
                helperText={errors.email ? errorMessage(errors, 'email') : ''}
                onChange={handleEmail}
              />
            </div>
            <div className={classes.textField}>
              <TextField
                inputRef={register({ required: true })}
                required
                label="full name"
                type="text"
                name="fullname"
                variant="outlined"
                fullWidth
                size="small"
                error={!!errors.fullname}
                helperText={errors.fullname ? errorMessage(errors, 'fullname') : ''}
              />
            </div>
            <div className={classes.textField}>
              <TextField
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                size="small"
                className={classes.half}
                error={!!errors.password}
                inputRef={register({ required: true, minLength: 8 })}
                required
                value={password}
                onChange={handlePassword}
                helperText={errors.password ? errorMessage(errors, 'password') : ''}
              />
              <TextField
                inputRef={register({ required: true, validate: { match: shouldMatch } })}
                required
                label="Confirme Password"
                name="passwordConfirmation"
                type="password"
                variant="outlined"
                size="small"
                error={!!errors.passwordConfirmation}
                helperText={errors.passwordConfirmation ? errorMessage(errors, 'passwordConfirmation') : ''}
                className={classes.half}
                value={passwordConfirmation}
                onChange={handlePasswordConfirmation}
              />
            </div>
            <div className={classes.submit}>
              <Button variant="outlined" color="primary" type="submit">
                create account
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

Signup.propTypes = {
  history: PropTypes.shape([]).isRequired,
  setFlash: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setFlash: flash => dispatch(setFlash(flash)),
  setUser: (currentUser, accountType) => dispatch(setUser(currentUser, accountType)),
});

export default connect(null, mapDispatchToProps)(Signup);
