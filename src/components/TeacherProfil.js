import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
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
import { setFlash } from '../actions/layoutCreators';
import { setUser, updateProfil } from '../actions/authCreators';

const TeacherProfil = ({
  currentUser,
  categories,
  updateProfil,
}) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    errors,
  } = useForm();

  const [state, setState] = useState({
    fullname: currentUser.fullname,
    phone: currentUser.phone,
    bio: currentUser.bio,
    whatICanDo: currentUser.what_I_can_do,
    photo: currentUser.photo,
  });

  const handleChange = ({ target: { name, value } }) => setState({ ...state, [name]: value });

  const [categoriesList, setCategoriesList] = useState({
    maths: false,
    physics: false,
    arts: false,
    english: false,
  });

  const handlecategoriesChange = event => {
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
    updateProfil({
      ...data,
      what_I_can_do: data.whatICanDo,
      categories: categoriesList,
    }, currentUser, 'teachers');
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
              type="tel"
              name="phone"
              variant="outlined"
              fullWidth
              size="small"
            />
          </div>
          <div className={classes.textField}>
            <TextField
              inputRef={register}
              onChange={handleChange}
              value={state.bio || ''}
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
              onChange={handleChange}
              value={state.whatICanDo || ''}
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
              onChange={handleChange}
              value={state.photo || ''}
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
              control={<Checkbox checked={categoriesList.maths} onChange={handlecategoriesChange} name="maths" />}
              label="Maths"
            />
            <FormControlLabel
              control={<Checkbox checked={categoriesList.physics} onChange={handlecategoriesChange} name="physics" />}
              label="Physics"
            />
            <FormControlLabel
              control={<Checkbox checked={categoriesList.arts} onChange={handlecategoriesChange} name="arts" />}
              label="Arts"
            />
            <FormControlLabel
              control={<Checkbox checked={categoriesList.english} onChange={handlecategoriesChange} name="english" />}
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
  updateProfil: (data, currentUser, type) => dispatch(updateProfil(data, currentUser, type)),
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
  categories: PropTypes.arrayOf(Object).isRequired,
  updateProfil: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherProfil);
