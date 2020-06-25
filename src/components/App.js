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
        <div className={classes.drawerHeader}>
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
        </div>
        <div className={classes.body}>
          <div className={classes.bodyHeader}>
            <h1 className={classes.marginBottomNone}>FIND A TEACHER</h1>
            <p className={classes.marginTopNone}>There are here for you</p>
          </div>
          <div>
            <p>Placeholder</p>
          </div>
        </div>
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
