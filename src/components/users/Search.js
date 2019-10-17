import React, { useState } from "react";
import PropTypes from "prop-types";
const Search = ({ showUsers, clearUsers, searchUsers, setAlert }) => {
	const [searchText, setSearchText] = useState("");
	const handleChange = e => setSearchText(e.target.value);
	const handleSubmit = e => {
		e.preventDefault();
		if (searchText === "") {
			setAlert("Please Write Something", "light");
		} else {
			searchUsers(searchText);
			setSearchText("");
		}
	};
	return (
		<div>
			<form className="form" onSubmit={handleSubmit}>
				<input
					type="text"
					name="searchText"
					id="search"
					placeholder="Search Users..."
					value={searchText}
					onChange={handleChange}
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
};
Search.propTypes = {
	searchUsers: PropTypes.func.isRequired,
	clearUsers: PropTypes.func.isRequired,
	setAlert: PropTypes.func,
	showUsers: PropTypes.bool.isRequired
};
export default Search;
