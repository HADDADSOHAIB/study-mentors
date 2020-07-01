import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useStyles from './TeacherProfilStyles';

const TeacherProfil = ({ currentUser }) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    errors,
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  const [newChanges, setNewChanges] = useState(false);
  const [fullname, setFullName] = useState(currentUser.fullname);
  const [phone, setPhone] = useState(currentUser.phone);
  const [bio, setBio] = useState(currentUser.bio);
  const [whatICanDo, setWhatICanDo] = useState(currentUser.what_I_can_do);

  const handleEmailChange = e => {
    if (!newChanges) {
      setNewChanges(true);
    }
    setFullName(e.target.value);
  };

  const handlePhoneChange = e => {
    if (!newChanges) {
      setNewChanges(true);
    }
    setPhone(e.target.value);
  };

  const handleBioChange = e => {
    if (!newChanges) {
      setNewChanges(true);
    }
    setBio(e.target.value);
  };

  const handleWhatICanDoChange = e => {
    if (!newChanges) {
      setNewChanges(true);
    }
    setWhatICanDo(e.target.value);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography color="textPrimary" variant="h6" className={classes.title}>
          Teacher Profil Informations
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
          <div className={classes.textField}>
            <TextField
              inputRef={register}
              onChange={handleBioChange}
              value={bio || ''}
              label="bio"
              multiline
              rows={2}
              fullWidth
              variant="outlined"
              type="text"
              name="bio"
            />
          </div>
          <div className={classes.textField}>
            <TextField
              inputRef={register}
              onChange={handleWhatICanDoChange}
              value={whatICanDo || ''}
              label="what I can do"
              multiline
              rows={2}
              fullWidth
              variant="outlined"
              type="text"
              name="whatICanDo"
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

TeacherProfil.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    phone: PropTypes.string,
    bio: PropTypes.string,
    what_I_can_do: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(TeacherProfil);
