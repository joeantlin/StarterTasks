import React from "react";
import { NavLink } from "react-router-dom";

import usersService from "../services/UsersService";

class Register extends React.Component {
	state = {
		formData: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirm: "",
			avatar: "",
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
		this.addUser({
			firstName: this.state.formData.firstName,
			lastName: this.state.formData.lastName,
			email: this.state.formData.email,
			password: this.state.formData.password,
			passwordConfirm: this.state.formData.confirm,
			avatarUrl: this.state.formData.avatar,
			tenantId: "U021BBT690B",
		});
	};

	addUser = (newUser) => {
		usersService.add(newUser).then(this.addUserSuccess).catch(this.addUserFail);
	};

	addUserSuccess = (res) => {
		console.log(res.data);
		// toastNotify('success', `${newUser.firstName} ${newUser.lastName} has registered an account!`);
		this.props.loggedIn();
		this.props.history.push("/");
	};

	addUserFail = (res) => {
		console.warn({ userError: res });
		if (res.response.status === 400) {
			// toastNotify('error', "You have input invalid information!");
		} else {
			// console.warn({ error: res });
			// toastNotify('error', "New account could not be registered!");
		}
	};

	render() {
		return (
			<div className="form-container">
				<h2>Register Account</h2>
				<form id="my-form" className="row g-4">
					<div className="col-md-6">
						<label htmlFor="first-name-input" className="form-label">
							First Name
						</label>
						<input
							name="firstName"
							type="text"
							className="form-control"
							onChange={this.onFormFieldChanged}
						/>
					</div>
					<div className="col-md-6">
						<label htmlFor="last-name-input" className="form-label">
							Last Name
						</label>
						<input
							name="lastName"
							type="text"
							className="form-control"
							onChange={this.onFormFieldChanged}
						/>
					</div>
					<div className="col-12">
						<label htmlFor="email-input" className="form-label">
							Email
						</label>
						<input
							name="email"
							type="text"
							className="form-control"
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
							onChange={this.onFormFieldChanged}
						/>
					</div>
					<div className="col-12">
						<label htmlFor="confirm-input" className="form-label">
							Confrim Password
						</label>
						<input
							name="confirm"
							type="password"
							className="form-control"
							onChange={this.onFormFieldChanged}
						/>
					</div>
					<div className="col-12">
						<label htmlFor="avatar-input" className="form-label">
							Avatar URL
						</label>
						<input
							name="avatar"
							type="text"
							className="form-control"
							onChange={this.onFormFieldChanged}
						/>
					</div>
					<div className="col-md-6">
						<button
							type="submit"
							className="btn btn-primary"
							onClick={this.onFormSubmit}
						>
							Register
						</button>
					</div>
					<div className="col-md-6 link-btn">
						<p>
							Already Registered? <NavLink to="/login">Login Here</NavLink>
						</p>
					</div>
				</form>
			</div>
		);
	}
}

export default Register;
