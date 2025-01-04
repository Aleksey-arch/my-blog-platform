import React from 'react';
import classes from './index.module.scss';
import PropTypes from 'prop-types';

function AlertSignIn({ discriptionAlert }) {
  return (
    <>
      <div className={classes.alertSuccess}>
        <p>{discriptionAlert.desc}</p>
      </div>
    </>
  );
}

AlertSignIn.propTypes = {
  discriptionAlert: PropTypes.shape({
    desc: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlertSignIn;
