import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Navbar = ({ logo, title }) => {
	return (
		<div className="navbar bg-primary">
			<h3>
				<i className={logo} /> {title}
			</h3>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
			</ul>
		</div>
	);
};
Navbar.defaultProps = {
	title: "Github Finder",
	logo: "fa fa-github"
};
Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	logo: PropTypes.string.isRequired
};
export default Navbar;
