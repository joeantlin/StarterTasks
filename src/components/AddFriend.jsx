import React from "react";

import friendsService from "../services/FriendsService";

import { toast } from "react-toastify";

import { NavLink } from "react-router-dom";

class AddFriend extends React.Component {
	state = {
		formData: {
			title: "",
			bio: "",
			summary: "",
			headline: "",
			img: "",
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
		this.addFriend({
			title: this.state.formData.title,
			bio: this.state.formData.bio,
			summary: this.state.formData.summary,
			headline: this.state.formData.headline,
			slug: Math.random()
				.toString(36)
				.replace(/[^a-z0-9]+/g, ""),
			statusId: "Active",
			primaryImage: this.state.formData.img,
		});
	};

	addFriend = (friend) => {
		friendsService
			.add(friend)
			.then((res) => {
				console.log(res.data);
				friend.id = res.data.item;
				this.props.onAdd(friend);
			})
			.catch(this.addFriendFail);
	};

	addFriendFail = (res) => {
		console.warn(res);
		toast.error("Failed to add Friend!");
	};

	render() {
		return (
			<div className="form-container">
				<h4>Add Friend</h4>
				<form id="my-form" className="row g-4">
					<div className="col-12">
						<label htmlFor="title-input" className="form-label">
							Title
						</label>
						<input
							name="title"
							type="text"
							className="form-control"
							id="title-input"
							onChange={this.onFormFieldChanged}
						/>
					</div>
					<div className="col-12">
						<label htmlFor="bio-input" className="form-label">
							Bio
						</label>
						<textarea
							name="bio"
							type="text"
							className="form-control"
							id="bio-input"
							rows="3"
							onChange={this.onFormFieldChanged}
						/>
					</div>
					<div className="col-12">
						<label htmlFor="summary-input" className="form-label">
							Summary
						</label>
						<input
							name="summary"
							type="text"
							className="form-control"
							id="summary-input"
							onChange={this.onFormFieldChanged}
						/>
					</div>
					<div className="col-12">
						<label htmlFor="headline-input" className="form-label">
							Headline
						</label>
						<input
							name="headline"
							type="text"
							className="form-control"
							id="headline-input"
							onChange={this.onFormFieldChanged}
						/>
					</div>
					<div className="col-12">
						<label htmlFor="img-input" className="form-label">
							Profile Image
						</label>
						<input
							name="img"
							type="text"
							className="form-control"
							id="img-input"
							onChange={this.onFormFieldChanged}
						/>
					</div>
					<div className="col-md-6">
						<NavLink to="/friends" className="btn btn-danger">
							Cancel
						</NavLink>
						<button
							type="submit"
							className="btn btn-primary"
							id="form-button"
							onClick={this.onFormSubmit}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default AddFriend;
