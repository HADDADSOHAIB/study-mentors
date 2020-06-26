import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import useStyles from './MainPageStyles';
import TeacherCard from '../components/TeacherCard';
import { increaseSelectedIndex, decreaseSelectedIndex } from '../actions/teacherCreators';

function MainPage({ profils, selectedProfilIndex, increaseSelectedIndex, decreaseSelectedIndex }) {
  const classes = useStyles();
  const [show, setShow] = useState([]);
  const [direction, setDirection] = useState('right');

  useEffect(() => {
    const newShow = [];
    for (let i = 0; i < profils.length; i += 1) {
      newShow.push(false);
    }
    newShow[selectedProfilIndex] = true;
    setShow(newShow);
    return () => '';
  }, [profils, selectedProfilIndex]);

  const clickRight = () => {
    setDirection('left');
    increaseSelectedIndex();
  };

  const clickLeft = () => {
    setDirection('right');
    decreaseSelectedIndex();
  };

  return (
    <div className={classes.body}>
      <div className={classes.bodyHeader}>
        <h1 className={clsx(classes.marginBottomNone, classes.marginTopNone)}>
          FIND A TEACHER
        </h1>
        <p className={classes.marginTopNone}>They are here for you</p>
      </div>
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
                <Slide key={i} direction={direction} in={show[i]} mountOnEnter unmountOnExit timeout={{ enter: 500 }}>
                  <Paper elevation={4} className={classes.paper}>
                    <TeacherCard name={profil.name} />
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
          <div className={classes.moreContainer}>
            {
              selectedProfilIndex + 1 === profils.length && (
                <Button className={classes.nextButton}>
                  Load More
                </Button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

MainPage.propTypes = {
  profils: PropTypes.shape([]).isRequired,
  selectedProfilIndex: PropTypes.string.isRequired,
  increaseSelectedIndex: PropTypes.func.isRequired,
  decreaseSelectedIndex: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profils: state.teacher.profils,
  selectedProfilIndex: state.teacher.selectedProfilIndex,
});

const mapDispatchToProps = dispatch => ({
  increaseSelectedIndex: () => dispatch(increaseSelectedIndex()),
  decreaseSelectedIndex: () => dispatch(decreaseSelectedIndex()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
