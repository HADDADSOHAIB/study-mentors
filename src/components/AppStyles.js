import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 220;

export default makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    position: 'absolute',
    top: '0px',
    left: '5px',
  },
  hide: {
    display: 'none',
  },
  content: {
    position: 'relative',
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  flash: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
}));
