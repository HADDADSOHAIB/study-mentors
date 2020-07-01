import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  session: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'centre',
    margin: '10px 0',
  },
  sessionTitles: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  chips: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 0,
  },
}));

export default useStyles;
