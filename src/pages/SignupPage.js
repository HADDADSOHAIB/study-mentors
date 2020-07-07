import React, { useState, useEffect } from 'react';
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
import { signUp } from '../actions/authCreators';

const Signup = ({
  history,
  redirect,
  signUp,
}) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    errors,
  } = useForm();

  const [value, setValue] = useState(0);
  const [state, setState] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const handleChange = ({ target: { name, value } }) => setState({ ...state, [name]: value });
  const handleValueChange = (event, newValue) => setValue(newValue);

  useEffect(() => {
    if (redirect) {
      history.push('/');
    }
    return () => '';
  }, [redirect]);

  const onSubmit = data => {
    const {
      email,
      fullname,
      password,
    } = data;
    signUp(email, fullname, password, value === 0 ? 'Teacher' : 'Student');
  };

  const shouldMatch = () => state.password === state.passwordConfirmation;
  const shouldBeUnique = async () => {
    const unique = await axios.post(`${BACKEND}/api/v1/signup/unique`, { email: state.email });
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
          <Tabs value={value} onChange={handleValueChange} centered>
            <Tab label="Teacher" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
            <Tab label="Student" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
          </Tabs>
        </AppBar>
        <div>
          <Typography color="textPrimary" variant="h6" className={classes.title}>
            {`${!value ? 'Teacher' : 'Student'} account`}
          </Typography>
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
                onChange={handleChange}
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
                value={state.password}
                onChange={handleChange}
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
                value={state.passwordConfirmation}
                onChange={handleChange}
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
  signUp: PropTypes.func.isRequired,
  redirect: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  signUp: (email, fullname, password, type) => dispatch(signUp(email, fullname, password, type)),
});

const mapStateToProps = state => ({
  redirect: state.auth.redirect,
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
