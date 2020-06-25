import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 220;

export default makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    minHeight: 20,
    justifyContent: 'space-between',
  },
  content: {
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
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    minHeight: '100vh',
  },
  bodyHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  marginBottomNone: {
    marginBottom: theme.spacing(1),
  },
  marginTopNone: {
    marginTop: theme.spacing(1),
  },
  flash: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
}));
