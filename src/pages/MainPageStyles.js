import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    minHeight: '100vh',
    '& > *': {
      marginBottom: '10px',
    },
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
  paper: {
    zIndex: 1,
    position: 'relative',
    margin: theme.spacing(1),
  },
}));
