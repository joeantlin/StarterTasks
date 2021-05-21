import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import Home from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import Friends from "./components/Friends";

import usersService from "./services/UsersService";

class App extends Component {
	state = {};

	getUser = () => {
		usersService.getCurrent().then(this.getUserSuccess).catch(this.getUserFail);
	};

	getUserSuccess = (res) => {
		console.log({ success: res.data });
		this.setState({
			currentUser: res.data.item,
			welcomeMsg: `Welcome ${res.data.item.name}`,
		});
		console.log(this.state);
	};

	getUserFail = (res) => {
		console.warn({ error: res });
		this.setState({
			welcomeMsg: `Please register or login`,
		});
	};

	componentDidMount() {
		this.getUser();
	}

	render() {
		return (
			<Router>
				<React.Fragment>
					<NavBar user={this.state.currentUser} />
					<main role="main">
						<Switch>
							<Route exact path="/">
								<Home message={this.state.welcomeMsg} />
							</Route>
							<Route path="/login" strict={true}>
								<Login />
							</Route>
							<Route path="/register" strict={true}>
								<Register />
							</Route>
							<Route path="/friends" strict={true}>
								<Friends />
							</Route>
						</Switch>
					</main>

					<footer className="container">
						<p>&copy; Sabio 2019-2020</p>
					</footer>
				</React.Fragment>
			</Router>
		);
	}
}

export default App;
