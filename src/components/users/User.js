import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";
import Repos from "../repos/Repos";
const User = ({ loading, repos, user, getUsers, getUsersRepos, match }) => {
	useEffect(() => {
		getUsers(match.params.login);
		getUsersRepos(match.params.login);
	}, []);
	const {
		name,
		company,
		avatar_url,
		location,
		bio,
		blog,
		login,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
		hireable
	} = user;

	if (loading) {
		return <Spinner />;
	}
	return (
		<Fragment>
			<div>
				<Link to="/" className="btn btn-light">
					Back to Search
				</Link>
			</div>

			<div className="card grid-2">
				<div className="all-center">
					<img src={avatar_url} alt={name} className="round-img" style={{ width: "150px" }} />
					<h3>
						{name} {" "}
						<span>
							{hireable ? (
								<i className="fa fa-check-circle text-success" />
							) : (
								<i className="fa fa-times-circle text-danger" />
							)}
						</span>
					</h3>
					<span> Location: {location} </span>
				</div>
				<div>
					{bio && (
						<Fragment>
							<h2>Bio</h2>
							<p> {bio} </p>
						</Fragment>
					)}
					<div>
						<a href={html_url} target="_blank" className="btn btn-sm btn-dark my-1">
							Visit Profile
						</a>
					</div>
					<ul>
						<li>
							{login && (
								<Fragment>
									<strong>Username: </strong> {login}
								</Fragment>
							)}
						</li>

						<li>
							{company && (
								<Fragment>
									<strong>Company: </strong> {company}
								</Fragment>
							)}
						</li>

						<li>
							{blog && (
								<Fragment>
									<strong>Website: </strong> {blog}
								</Fragment>
							)}
						</li>
					</ul>
				</div>
			</div>
			<div className="card text-center">
				<div className="badge badge-primary">Followers: {followers}</div>
				<div className="badge badge-success">Following: {following}</div>
				<div className="badge badge-light">Public Repos: {public_repos}</div>
				<div className="badge badge-dark">Public Gists: {public_gists}</div>
			</div>
			<Repos repos={repos} />
		</Fragment>
	);
};

export default User;
