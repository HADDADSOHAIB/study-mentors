import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useStyles from './TeacherProfilStyles';
import authHeader from '../authHeader';
import BACKEND from '../backend';
import { setFlash } from '../actions/layoutCreators';
import { setUser } from '../actions/authCreators';

const TeacherProfil = ({
  currentUser,
  setFlash,
  categories,
  setUser,
}) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    errors,
  } = useForm();

  const [fullname, setFullName] = useState(currentUser.fullname);
  const [phone, setPhone] = useState(currentUser.phone);
  const [bio, setBio] = useState(currentUser.bio);
  const [whatICanDo, setWhatICanDo] = useState(currentUser.what_I_can_do);
  const [photo, setPhoto] = useState(currentUser.photo);

  const handleEmailChange = e => setFullName(e.target.value);
  const handlePhoneChange = e => setPhone(e.target.value);
  const handlePhotoChange = e => setPhoto(e.target.value);
  const handleBioChange = e => setBio(e.target.value);
  const handleWhatICanDoChange = e => setWhatICanDo(e.target.value);

  const [categoriesList, setCategoriesList] = useState({
    maths: false,
    physics: false,
    arts: false,
    english: false,
  });

  const handleChange = event => {
    setCategoriesList({ ...categoriesList, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    const currentCategories = categoriesList;
    categories.forEach(cat => {
      currentCategories[cat.name] = true;
    });
    setCategoriesList({ ...currentCategories });
    return () => '';
  }, [categories]);

  const onSubmit = data => {
    axios.put(`${BACKEND}/api/v1/teachers/${currentUser.id}/update_profil`, {
      ...data,
      what_I_can_do: data.whatICanDo,
      categories: categoriesList,
    }, { headers: authHeader })
      .then(res => {
        setFlash({ open: true, message: 'Profile updated with success', severity: 'success' });
        setUser(
          res.data.current_user,
          'Teacher',
          res.data.categories,
        );
      }).catch(() => setFlash({ open: true, message: 'Error, try later', severity: 'error' }));
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
          <div className={classes.textField}>
            <TextField
              inputRef={register}
              onChange={handlePhotoChange}
              value={photo || ''}
              label="photo"
              rows={2}
              fullWidth
              variant="outlined"
              type="text"
              name="photo"
              size="small"
            />
          </div>
          <div className={classes.Checkbox}>
            <FormControlLabel
              control={<Checkbox checked={categoriesList.maths} onChange={handleChange} name="maths" />}
              label="Maths"
            />
            <FormControlLabel
              control={<Checkbox checked={categoriesList.physics} onChange={handleChange} name="physics" />}
              label="Physics"
            />
            <FormControlLabel
              control={<Checkbox checked={categoriesList.arts} onChange={handleChange} name="arts" />}
              label="Arts"
            />
            <FormControlLabel
              control={<Checkbox checked={categoriesList.english} onChange={handleChange} name="english" />}
              label="English"
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
  categories: state.auth.categories,
});

const mapDispatchToProps = dispatch => ({
  setFlash: flash => dispatch(setFlash(flash)),
  setUser: (currentUser, accountType, categories) => dispatch(
    setUser(currentUser, accountType, categories),
  ),
});

TeacherProfil.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    phone: PropTypes.string,
    bio: PropTypes.string,
    what_I_can_do: PropTypes.string,
    id: PropTypes.number,
    photo: PropTypes.string,
  }).isRequired,
  setFlash: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(Object).isRequired,
  setUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherProfil);
