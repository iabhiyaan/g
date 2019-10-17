import React from "react";
import UserItem from "./UserItem";
import Spinner from "./../layouts/Spinner";
import PropTypes from "prop-types";
const Users = ({ users, loading }) => {
	const usersStyles = {
		display: "grid",
		gridTemplateColumns: "repeat(3, 1fr)",
		gridGap: "1vw"
	};
	if (loading) {
		return <Spinner />;
	}
	return <div style={usersStyles}> {users.map(user => <UserItem key={user.id} user={user} />)} </div>;
};
Users.propTypes = {
	users: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired
};
export default Users;
