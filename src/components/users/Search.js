import React, { Component } from "react";
import PropTypes from "prop-types";
class Search extends Component {
	state = {
		searchText: ""
	};
	static propTypes = {
		searchUsers: PropTypes.func.isRequired,
		clearUsers: PropTypes.func.isRequired,
		setAlert: PropTypes.func,
		showUsers: PropTypes.bool.isRequired
	};
	handleChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		if (this.state.searchText === "") {
			this.props.setAlert("Please Write Something", "light");
		} else {
			this.props.searchUsers(this.state.searchText);
			this.setState({
				searchText: ""
			});
		}
	};

	render() {
		const { showUsers, clearUsers } = this.props;
		return (
			<div>
				<form className="form" onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="searchText"
						id="search"
						placeholder="Search Users..."
						value={this.state.searchText}
						onChange={this.handleChange}
					/>
					<button className="btn btn-block btn-dark" style={{ borderRadius: "30px" }}>
						Search
					</button>
				</form>
				{showUsers && (
					<button
						className="btn btn-block btn-primary my-1"
						style={{ borderRadius: "30px" }}
						onClick={clearUsers}
					>
						Clear Search
					</button>
				)}
			</div>
		);
	}
}

export default Search;
