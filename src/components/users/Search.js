import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "./../../context/alert/alertContext";

const Search = () => {
	const githubContext = useContext(GithubContext);
	const alertContext = useContext(AlertContext);
	const { setAlert } = alertContext;
	const [searchText, setSearchText] = useState("");
	const handleChange = e => setSearchText(e.target.value);
	const handleSubmit = e => {
		e.preventDefault();
		if (searchText === "") {
			setAlert("Please Write Something", "light");
		} else {
			githubContext.searchUsers(searchText);
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
			{githubContext.users.length > 0 && (
				<button
					className="btn btn-block btn-primary my-1"
					style={{ borderRadius: "30px" }}
					onClick={githubContext.clearUsers}
				>
					Clear Search
				</button>
			)}
		</div>
	);
};

export default Search;
