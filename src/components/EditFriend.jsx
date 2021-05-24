import React from "react";

import friendsService from "../services/FriendsService";

import { NavLink } from "react-router-dom";

class EditFriend extends React.Component {
	state = { formData: {} };

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
		this.updateFriend({
			id: this.state.formData.id,
			title: this.state.formData.title,
			bio: this.state.formData.bio,
			summary: this.state.formData.summary,
			headline: this.state.formData.headline,
			slug: this.state.formData.slug,
			statusId: this.state.formData.status,
			primaryImage: this.state.formData.img,
		});
	};

	componentDidMount() {
		console.log({ id: this.props.match.params.friendId });
		this.getFriend(this.props.match.params.friendId);
	}

	getFriend = (id) => {
		friendsService
			.getById(id)
			.then(this.getFriendSuccess)
			.catch(this.getFriendFail);
	};

	getFriendSuccess = (res) => {
		console.log(res.data);
		let friend = res.data.item;
		this.setState({
			formData: {
				id: friend.id,
				title: friend.title,
				bio: friend.bio,
				summary: friend.summary,
				headline: friend.headline,
				slug: friend.slug,
				status: friend.statusId,
				img: friend.primaryImage.imageUrl,
			},
		});
		// fillData(res.data.item);
	};

	getFriendFail = (res) => {
		console.warn({ error: res });
		if (res.response.status === 404) {
			// toastNotify('error', "No Friend Found!");
		} else {
			// toastNotify('error', "Could not get Friend!");
		}
	};

	updateFriend = (friend) => {
		friendsService
			.update(friend, friend.id)
			.then((res) => {
				console.log({ hasUpdated: res.data });
				// toastNotify('success', `${friend.title}has been updated!`);
				this.props.onUpdate(friend);
			})
			.catch(this.updateFriendFail);
	};

	updateFriendFail = (res) => {
		// toastNotify('error', "Could not update Friend!");
		console.warn({ error: res });
	};

	render() {
		return (
			<div className="form-container">
				<h4>Edit Friend</h4>
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
							value={this.state.formData.title}
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
							value={this.state.formData.bio}
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
							value={this.state.formData.summary}
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
							value={this.state.formData.headline}
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
							value={this.state.formData.img}
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
							Update
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default EditFriend;
