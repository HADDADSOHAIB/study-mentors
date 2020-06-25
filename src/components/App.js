import React from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useStyles from './AppStyles';
import { openDrawer } from '../actions/layoutCreators';
import DrawerApp from './DrawerApp';
import Flash from './Flash';
import MainPage from '../pages/MainPage';

function App({ openDrawer, open }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DrawerApp />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <IconButton
          color="inherit"
          onClick={openDrawer}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.flash}>
          <Flash />
        </div>
        <MainPage />
      </main>
    </div>
  );
}

App.propTypes = {
  openDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  openDrawer: () => dispatch(openDrawer()),
});

const mapStateToProps = state => ({
  open: state.layout.drawer.open,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
