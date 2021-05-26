import React, { Component } from "react";
import { Route, Switch, withRouter, NavLink } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import Home from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import Friends from "./components/Friends";
import Widgets from "./components/Widgets";
import Jobs from "./components/Jobs";

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
			leftButtons: (
				<button
					type="button"
					className="btn btn-primary"
					id="logout-button"
					onClick={this.logoutUser}
				>
					Logout
				</button>
			),
		});
		console.log(this.state);
	};

	getUserFail = (res) => {
		console.warn({ error: res });
		this.setState({
			welcomeMsg: `Please register or login`,
			leftButtons: (
				<React.Fragment>
					<NavLink to="/login" className="btn btn-primary">
						Login
					</NavLink>
					<NavLink to="/register" className="btn btn-primary">
						Register
					</NavLink>
				</React.Fragment>
			),
		});
	};

	logoutUser = () => {
		usersService.logout().then(this.logoutUserSuccess).catch(this.logoutUserFail);
	};

	logoutUserSuccess = (res) => {
		console.log({ loggedOut: res.data });
		this.setState({
			welcomeMsg: `Please register or login`,
			leftButtons: (
				<React.Fragment>
					<NavLink to="/login" className="btn btn-primary">
						Login
					</NavLink>
					<NavLink to="/register" className="btn btn-primary">
						Register
					</NavLink>
				</React.Fragment>
			),
		});
		this.props.history.push("/login");
	};

	logoutUserFail = (res) => console.warn({ error: res });

	componentDidMount() {
		this.getUser();
	}

	render() {
		return (
			<React.Fragment>
				<NavBar
					user={this.state.currentUser}
					leftButtons={this.state.leftButtons}
				/>
				<main role="main">
					<Switch>
						<Route exact path="/">
							<Home message={this.state.welcomeMsg} history={this.props.history} />
						</Route>
						<Route path="/login" strict={true}>
							<Login history={this.props.history} loggedIn={this.getUser} />
						</Route>
						<Route path="/register" strict={true}>
							<Register history={this.props.history} loggedIn={this.getUser} />
						</Route>
						<Route path="/friends" strict={true}>
							<Friends />
						</Route>
						<Route exact path="/widgets">
							<Widgets />
						</Route>
						<Route exact path="/jobs">
							<Jobs />
						</Route>
					</Switch>
				</main>

				<footer className="container">
					<p>&copy; Sabio 2019-2020</p>
				</footer>
			</React.Fragment>
		);
	}
}

export default withRouter(App);
