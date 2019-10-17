import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";
const App = () => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setalert] = useState(null);

	const searchUsers = async searchText => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/search/users?q=${searchText}&client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		// console.log(res.data.items);
		setUsers(res.data.items);
		setLoading(false);
	};
	const getUsers = async username => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		setUser(res.data);
		setLoading(false);
	};
	const getUsersRepos = async username => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		setRepos(res.data);
		setLoading(false);
	};
	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};
	const setAlert = (msg, type) => {
		setalert({ msg, type });
		setTimeout(() => setalert(null), 5000);
	};

	return (
		<Router>
			<div className="App">
				<Navbar />
				<div className="container">
					<Alert alert={alert} />
					<Switch>
						<Route
							exact
							path="/"
							render={props => (
								<Fragment>
									<Search
										searchUsers={searchUsers}
										clearUsers={clearUsers}
										showUsers={users.length > 0}
										setAlert={setAlert}
									/>
									<Users users={users} loading={loading} />
								</Fragment>
							)}
						/>
						<Route exact path="/about" component={About} />
						<Route
							exact
							path="/user/:login"
							render={props => (
								<User
									{...props}
									getUsers={getUsers}
									user={user}
									loading={loading}
									repos={repos}
									getUsersRepos={getUsersRepos}
								/>
							)}
						/>
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default App;
