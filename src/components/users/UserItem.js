import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const UserItem = ({ user: { avatar_url, login, html_url } }) => {
	return (
		<div className="card text-center">
			<img
				src={avatar_url}
				alt={login}
				className="round-img"
				style={{
					width: "60px"
				}}
			/>
			<h3>{login}</h3>
			<Link to={`/user/${login}`} className="btn btn-sm btn-dark my-1">
				More
			</Link>
		</div>
	);
};
UserItem.propTypes = {
	user: PropTypes.object.isRequired
};
export default UserItem;
