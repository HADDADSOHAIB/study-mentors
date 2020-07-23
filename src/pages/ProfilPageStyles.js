import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '90vh',
    flexDirection: 'column',
    '& *': {
      fontFamily: 'Architects Daughter',
    },
  },
}));

export default useStyles;
