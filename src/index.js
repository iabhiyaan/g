import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

// async componentDidMount() {
// 	this.setState({
// 		loading: true
// 	});
// 	const res = await axios.get(
// 		`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&&client_secret=${process
// 			.env.REACT_APP_GITHUB_CLIENT_SECRET}`
// 	);
// 	// console.log(res.data);
// 	this.setState({
// 		users: res.data,
// 		loading: false
// 	});
// }
