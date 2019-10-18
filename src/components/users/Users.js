import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "./../layouts/Spinner";
import GithubContext from "../../context/github/githubContext";
const Users = () => {
	const usersStyles = {
		display: "grid",
		gridTemplateColumns: "repeat(3, 1fr)",
		gridGap: "1vw"
	};
	const githubContext = useContext(GithubContext);
	const { users, loading } = githubContext;
	if (loading) {
		return <Spinner />;
	}
	return <div style={usersStyles}> {users.map(user => <UserItem key={user.id} user={user} />)} </div>;
};

export default Users;
