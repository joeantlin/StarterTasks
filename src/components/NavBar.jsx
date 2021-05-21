import React from "react";
import { NavLink } from "react-router-dom";

import usersService from "../services/UsersService";

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		if (props.currentUser) {
			this.state = {
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
			};
		} else {
			this.state = {
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
			};
		}
	}

	loggedIn() {
		this.setState({
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
	}

	loggedOut() {
		this.setState({
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
	}

	logoutUser = () => {
		usersService.logout().then(this.logoutUserSuccess).catch(this.logoutUserFail);
	};

	logoutUserSuccess = (res) => {
		console.log({ loggedOut: res.data });
		this.loggedOut();
		window.location.href = "/login"; // Come back and fix
	};

	logoutUserFail = (res) => console.warn({ error: res });

	render() {
		return (
			<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">
				<div className="container-fluid">
					<NavLink className="navbar-brand" to="/">
						Sabio
					</NavLink>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<NavLink className="nav-link" to="/friends">
									Friends
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/blogs">
									Blogs
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/companies">
									Companies
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/jobs">
									Jobs
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/events">
									Events
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
				<div className="container-fluid justify-content-end" id="nav-btns-right">
					{this.state.leftButtons}
				</div>
			</nav>
		);
	}
}

export default NavBar;
