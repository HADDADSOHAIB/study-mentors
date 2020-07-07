import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import uid from 'uid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import useStyles from './MainPageStyles';
import TeacherCard from '../components/TeacherCard';
import { increaseSelectedIndex, decreaseSelectedIndex, fetchTeachers } from '../actions/teacherCreators';
import { clearRedirect } from '../actions/bookingCreators';

function MainPage({
  profils,
  selectedProfilIndex,
  increaseSelectedIndex,
  decreaseSelectedIndex,
  selectedCategory,
  fetchTeachers,
  error,
  clearRedirect,
}) {
  const classes = useStyles();
  const [show, setShow] = useState([]);
  const [direction, setDirection] = useState('right');

  useEffect(() => {
    clearRedirect();
    return () => '';
  }, []);

  useEffect(() => {
    const newShow = [];
    for (let i = 0; i < profils.length; i += 1) {
      newShow.push(false);
    }
    newShow[selectedProfilIndex] = true;
    setShow(newShow);
    return () => '';
  }, [profils, selectedProfilIndex]);

  useEffect(() => {
    fetchTeachers(selectedCategory.toLowerCase());
    return () => '';
  }, [selectedCategory]);

  const clickRight = () => {
    setDirection('left');
    increaseSelectedIndex();
  };

  const clickLeft = () => {
    setDirection('right');
    decreaseSelectedIndex();
  };

  const TeachersDisplay = (
    <div className={classes.teachers}>
      <div className={classes.next}>
        <div className={classes.nextButtonContainer}>
          {
            selectedProfilIndex !== 0 && (
              <IconButton className={classes.nextButton} onClick={clickLeft}>
                <ArrowBackOutlinedIcon fontSize="large" />
              </IconButton>
            )
          }
        </div>
        <div className={classes.numberContainer}>
          <IconButton className={classes.nextButton}>
            {selectedProfilIndex + 1}
            /
            { profils.length }
          </IconButton>
        </div>
      </div>
      <div className={classes.teacher}>
        <div className={classes.teacherContainer}>
          {
            profils.map((profil, i) => (
              <Slide
                key={uid(12)}
                direction={direction}
                in={show[i]}
                mountOnEnter
                unmountOnExit
                timeout={{ enter: 500 }}
              >
                <Paper elevation={4} className={classes.paper}>
                  <TeacherCard
                    fullname={profil.fullname}
                    photo={profil.photo}
                    whatICanDo={profil.what_I_can_do}
                    bio={profil.bio}
                    id={profil.id}
                  />
                </Paper>
              </Slide>
            ))
          }
        </div>
      </div>
      <div className={classes.next}>
        <div className={classes.nextButtonContainer}>
          {
            selectedProfilIndex + 1 !== profils.length && (
              <IconButton className={classes.nextButton} onClick={clickRight}>
                <ArrowForwardOutlinedIcon fontSize="large" />
              </IconButton>
            )
          }
        </div>
      </div>
    </div>
  );

  return (
    <div className={classes.body}>
      <div className={classes.bodyHeader}>
        <h1 className={clsx(classes.marginBottomNone, classes.marginTopNone)}>
          FIND A TEACHER
        </h1>
        <p className={classes.marginTopNone}>They are here for you</p>
      </div>
      {
        profils.length && !error ? TeachersDisplay : (
          <div className={classes.noteachers}>
            <p>There is no available teachers for this category</p>
          </div>
        )
      }
    </div>
  );
}

MainPage.propTypes = {
  profils: PropTypes.arrayOf(Object).isRequired,
  selectedProfilIndex: PropTypes.number.isRequired,
  increaseSelectedIndex: PropTypes.func.isRequired,
  decreaseSelectedIndex: PropTypes.func.isRequired,
  fetchTeachers: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  error: PropTypes.shape({}),
  clearRedirect: PropTypes.func.isRequired,
};

MainPage.defaultProps = {
  error: null,
};

const mapStateToProps = state => ({
  profils: state.teacher.profils,
  selectedProfilIndex: state.teacher.selectedProfilIndex,
  selectedCategory: state.teacher.selectedCategory,
  error: state.teacher.error,
});

const mapDispatchToProps = dispatch => ({
  increaseSelectedIndex: () => dispatch(increaseSelectedIndex()),
  decreaseSelectedIndex: () => dispatch(decreaseSelectedIndex()),
  fetchTeachers: category => dispatch(fetchTeachers(category)),
  clearRedirect: () => dispatch(clearRedirect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
