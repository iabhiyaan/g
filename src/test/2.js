import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";
class App extends Component {
	state = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null
	};

	searchUsers = async searchText => {
		this.setState({
			loading: true
		});
		const res = await axios.get(
			`https://api.github.com/search/users?q=${searchText}&client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		// console.log(res.data.items);
		this.setState({
			users: res.data.items,
			loading: false
		});
	};
	getUsers = async username => {
		this.setState({
			loading: true
		});
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({
			user: res.data,
			loading: false
		});
	};
	getUsersRepos = async username => {
		this.setState({
			loading: true
		});
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({
			repos: res.data,
			loading: false
		});
	};
	clearUsers = () => {
		this.setState({ users: [], loading: false });
	};
	setAlert = (msg, type) => {
		this.setState({
			alert: { msg, type }
		});
		setTimeout(() => {
			this.setState({ alert: null });
		}, 5000);
	};
	render() {
		const { users, loading, alert, user, repos } = this.state;
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
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											showUsers={users.length > 0}
											setAlert={this.setAlert}
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
										getUsers={this.getUsers}
										user={user}
										loading={loading}
										repos={repos}
										getUsersRepos={this.getUsersRepos}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
