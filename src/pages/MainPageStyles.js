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
    width: 'fit-content',
  },
  teachers: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flexGrow: 1,
    position: 'relative',
  },
  teacherContainer: {
    position: 'absolute',
    top: 0,
  },
  next: {
    flexGrow: 1,
  },
  teacher: {
    flexGrow: 2,
    display: 'flex',
    justifyContent: 'center',
    minWidth: 345,
  },
  nextButtonContainer: {
    height: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  numberContainer: {
    height: '50%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '10px',
  },
  nextButton: {
    color: '#eee',
    backgroundColor: '#0dd42b',
    '&:hover': {
      color: '#111',
    },
  },
  moreContainer: {
    height: '50%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '10px',
  },
}));
