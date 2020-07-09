import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    minHeight: '90vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '& *': {
      fontFamily: 'Architects Daughter',
    },
  },
  card: {
    width: '400px',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
  },
  textField: {
    margin: '20px 0',
  },
  submit: {
    display: 'flex',
    justifyContent: 'center',
  },
  appbar: {
    backgroundColor: '#0dd42b',
  },
}));

export default useStyles;
