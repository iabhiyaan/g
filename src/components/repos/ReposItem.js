import React from "react";

const ReposItem = ({ repo: { html_url, name } }) => {
	return (
		<div className="card">
			<p>
				<a href={html_url} target="_blank"> {name} </a>
			</p>
		</div>
	);
};

export default ReposItem;
