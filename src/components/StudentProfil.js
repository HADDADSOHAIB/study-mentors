import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useStyles from './StudentProfilStyles';
import { setFlash } from '../actions/layoutCreators';
import { setUser, updateProfil } from '../actions/authCreators';

const StudentProfil = ({
  currentUser,
  updateProfil,
}) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    errors,
  } = useForm();

  const onSubmit = data => {
    updateProfil(data, currentUser, 'students');
  };

  const [state, setState] = useState({
    fullname: currentUser.fullname,
    phone: currentUser.phone,
  });

  const handleChange = ({ target: { name, value } }) => setState({ ...state, [name]: value });

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
              value={state.fullname}
              onChange={handleChange}
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
              value={state.phone || ''}
              onChange={handleChange}
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
  updateProfil: (data, currentUser, type) => dispatch(updateProfil(data, currentUser, type)),
});

StudentProfil.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    phone: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  updateProfil: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfil);
