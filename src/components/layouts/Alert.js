import React from "react";
import PropTypes from "prop-types";
const Alert = ({ alert }) => {
	return (
		alert != null && (
			<div className={`alert alert-${alert.type}`}>
				<i className="fa fa-info-circle" /> {alert.msg}
			</div>
		)
	);
};
Alert.propTypes = {
	alert: PropTypes.object
};

export default Alert;
