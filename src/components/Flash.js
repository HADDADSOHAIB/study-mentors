import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import { clearFlash } from '../actions/layoutCreators';

const Flash = ({
  open,
  severity,
  message,
  clearFlash,
}) => {
  useEffect(() => {
    if (open) {
      setTimeout(() => clearFlash(), 2000);
    }
    return () => '';
  }, [open]);
  return (
    <Collapse in={open}>
      {
        open && (
          <Alert
            severity={severity}
            action={
              (
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    clearFlash();
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              )
            }
          >
            {message}
          </Alert>
        )
      }
    </Collapse>
  );
};

const mapStateToProps = state => ({
  open: state.layout.flash.open,
  severity: state.layout.flash.severity,
  message: state.layout.flash.message,
});

const mapDispatchToProps = dispatch => ({
  clearFlash: () => dispatch(clearFlash()),
});

Flash.propTypes = {
  severity: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  clearFlash: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Flash);
