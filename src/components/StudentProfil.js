import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useStyles from './StudentProfilStyles';
import authHeader from '../authHeader';
import BACKEND from '../backend';
import { setFlash } from '../actions/layoutCreators';
import { setUser } from '../actions/authCreators';

const StudentProfil = ({
  currentUser,
  setFlash,
  setUser,
}) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    errors,
  } = useForm();

  const onSubmit = data => {
    axios.put(`${BACKEND}/api/v1/students/${currentUser.id}/update_profil`, {
      ...data,
    }, { headers: authHeader })
      .then(res => {
        setFlash({ open: true, message: 'Profile updated with success', severity: 'success' });
        setUser(
          res.data.current_user,
          'Student',
          [],
        );
      }).catch(() => setFlash({ open: true, message: 'Error, try later', severity: 'error' }));
  };

  const [fullname, setFullName] = useState(currentUser.fullname);
  const [phone, setPhone] = useState(currentUser.phone);

  const handleEmailChange = e => setFullName(e.target.value);
  const handlePhoneChange = e => setPhone(e.target.value);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography color="textPrimary" variant="h6" className={classes.title}>
          Student Profil Informations
        </Typography>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.textField}>
            <TextField
              inputRef={register}
              label="Email"
              type="email"
              name="email"
              variant="outlined"
              fullWidth
              size="small"
              value={currentUser.email}
              disabled
            />
          </div>
          <div className={classes.textField}>
            <TextField
              inputRef={register({ required: true })}
              required
              value={fullname}
              onChange={handleEmailChange}
              label="full name"
              type="text"
              name="fullname"
              variant="outlined"
              fullWidth
              size="small"
              error={!!errors.fullname}
              helperText={errors.fullname ? 'This field is required' : ''}
            />
          </div>
          <div className={classes.textField}>
            <TextField
              inputRef={register}
              value={phone || ''}
              onChange={handlePhoneChange}
              label="phone"
              type="text"
              name="phone"
              variant="outlined"
              fullWidth
              size="small"
            />
          </div>
          <div className={classes.submit}>
            <Button variant="outlined" color="primary" type="submit">
              update profil
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({
  setFlash: flash => dispatch(setFlash(flash)),
  setUser: (currentUser, accountType, categories) => dispatch(
    setUser(currentUser, accountType, categories),
  ),
});

StudentProfil.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    phone: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  setFlash: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfil);
