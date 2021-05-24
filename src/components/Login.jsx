import React from "react";
import { NavLink } from "react-router-dom";

import usersService from "../services/UsersService";

class Login extends React.Component {
	state = {
		formData: {
			email: "",
			password: "",
		},
	};

	onFormFieldChanged = (e) => {
		let input = e.currentTarget;
		this.setState(() => {
			let newState = { ...this.state.formData };
			newState[input.name] = input.value;
			return { formData: newState };
		});
	};

	onFormSubmit = (e) => {
		e.preventDefault();
		this.loginUser({
			email: this.state.formData.email,
			password: this.state.formData.password,
			tenantId: "U021BBT690B",
		});
	};

	loginUser = (user) => {
		usersService
			.login(user)
			.then(this.loginUserSuccess)
			.catch(this.loginUserFail);
	};

	loginUserSuccess = (res) => {
		console.log(res.data);
		this.props.loggedIn();
		this.props.history.push("/");
	};

	loginUserFail = (res) => {
		console.warn({ userError: res });
		// toastNotify('error', "Could not validate Email or Password!");
	};

	render() {
		return (
			<div className="form-container">
				<h2>Login</h2>
				<form id="my-form" className="row g-4">
					<div className="col-12">
						<label htmlFor="email-input" className="form-label">
							Email
						</label>
						<input
							name="email"
							type="email"
							className="form-control"
							value={this.state.formData.email}
							onChange={this.onFormFieldChanged}
						/>
					</div>
					<div className="col-12">
						<label htmlFor="password-input" className="form-label">
							Password
						</label>
						<input
							name="password"
							type="password"
							className="form-control"
							value={this.state.formData.password}
							onChange={this.onFormFieldChanged}
						/>
					</div>
					<div className="col-md-6">
						<button
							type="submit"
							className="btn btn-primary"
							onClick={this.onFormSubmit}
						>
							Login
						</button>
					</div>
					<div className="col-md-6 link-btn">
						<p>
							New User? <NavLink to="/register">Register Here</NavLink>
						</p>
					</div>
				</form>
			</div>
		);
	}
}

export default Login;
