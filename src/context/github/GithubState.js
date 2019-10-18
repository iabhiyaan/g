import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS } from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
	githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
	githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
	githubClientId = process.env.GITHUB_CLIENT_ID;
	githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}
const GithubState = props => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false
	};
	const [state, dispatch] = useReducer(GithubReducer, initialState);

	// Set Loading
	const setLoading = () => {
		dispatch({ type: SET_LOADING });
	};

	// Search Users
	const searchUsers = async searchText => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/search/users?q=${searchText}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);
		// console.log(res.data.items);
		dispatch({
			type: SEARCH_USERS,
			payload: res.data.items
		});
	};

	// Get User
	const getUsers = async username => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);
		dispatch({
			type: GET_USER,
			payload: res.data
		});
	};

	// Get Repos

	const getUsersRepos = async username => {
		setLoading();

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);

		dispatch({
			type: GET_REPOS,
			payload: res.data
		});
	};

	// Clear Users
	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	const values = {
		users: state.users,
		user: state.user,
		repos: state.repos,
		loading: state.loading,
		searchUsers,
		clearUsers,
		getUsers,
		getUsersRepos
	};
	return <GithubContext.Provider value={values}>{props.children}</GithubContext.Provider>;
};

export default GithubState;
