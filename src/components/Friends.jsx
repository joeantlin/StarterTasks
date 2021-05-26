import React from "react";

import AddFriend from "./AddFriend";
import EditFriend from "./EditFriend";
import FriendTemplate from "./FriendTemplate";

import ReactPaginate from "react-paginate";
import { Route, Switch, NavLink, withRouter } from "react-router-dom";
import { toast } from "react-toastify";

import friendsService from "../services/FriendsService";

class Friends extends React.Component {
	state = {
		friends: [],
		friendtemplates: [],
		pageCount: 0,
		page: 0,
		formData: {
			query: "",
			lastQuery: "",
		},
	};

	componentDidMount = () => {
		this.getFriends();
	};

	getFriends = () => {
		console.log(this.state.page);
		friendsService
			.getAll(this.state.page)
			.then((res) => {
				this.getFriendsSuccess(res, null);
			})
			.catch(this.getFriendsFail);
	};

	getFriendsSuccess = (res, query) => {
		console.log(res.data);
		console.log(res.data.item.pagedItems);
		this.setState({
			friends: res.data.item.pagedItems,
			pageCount: res.data.item.totalPages,
		});
		if (query) {
			this.setState(() => {
				let newState = { ...this.state.formData };
				newState.lastQuery = newState.query;
				return { formData: newState };
			});
		}
		this.setFriendTemplates(res.data.item.pagedItems);
		// renderAllFriends(res.data.item.pagedItems);
	};

	getFriendsFail = (res) => {
		console.warn({ error: res });
		if (res.response.status === 404) {
			toast.error("No Friends Found!");
		} else {
			toast.error("Could not get Friends!");
		}
	};

	setFriendTemplates(friends) {
		this.setState(() => {
			return { friendTemplates: friends.map(this.mapFriendTemplates) };
		});
	}

	mapFriendTemplates = (friend) => {
		return (
			<FriendTemplate
				key={`friend-${friend.id}`}
				friend={friend}
				deleteBtn={this.deleteFriend}
			/>
		);
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
		this.getFriendBySearch(this.state.formData.query);
	};

	getFriendBySearch = (query) => {
		friendsService
			.getBySearchQuery(this.state.page, query)
			.then((res) => {
				this.getFriendsSuccess(res, query);
			})
			.catch(this.getFriendsFail);
	};

	addFriendState = (newFriend) => {
		// let newState = this.state.friends;
		// newFriend.primaryImage = {
		// 	imageUrl: newFriend.primaryImage,
		// };
		// newState.unshift(newFriend);
		// this.setState({ friends: newState });
		// this.setFriendTemplates(newState);
		this.clearSearch();
		// this.getFriends();
	};

	deleteFriend = (friend) => {
		friendsService
			.remove(friend.id)
			.then((res) => {
				console.log(res.data);
				this.removeFriend(friend);
			})
			.catch(this.deleteFriendFail);
	};

	deleteFriendFail = (res) => console.warn(res);

	removeFriend = (deletedFriend) => {
		let newState = this.state.friends;
		newState.forEach((friend, i) => {
			if (friend.id === deletedFriend.id) {
				newState.splice(i, 1);
			}
		});

		this.setState({ friends: newState });
		this.setFriendTemplates(newState);
	};

	updateFriendState = (updatedFriend) => {
		let newState = this.state.friends;
		newState.forEach((friend, i) => {
			if (friend.id === updatedFriend.id) {
				newState[i] = updatedFriend;
				newState[i].primaryImage = {
					imageUrl: updatedFriend.primaryImage,
				};
			}
		});

		this.setState({ friends: newState });
		this.setFriendTemplates(newState);
	};

	handlePageClick = (data) => {
		this.setState({ page: data.selected }, () => {
			if (this.state.formData.query !== "") {
				this.getFriendBySearch(this.state.formData.lastQuery);
			} else {
				this.getFriends();
			}
		});
		console.log({ pageClick: data });
	};

	clearSearch = () => {
		this.setState(
			() => {
				let newState = { ...this.state.formData };
				newState.query = "";
				newState.lastQuery = "";
				return { formData: newState };
			},
			() => {
				this.getFriends();
			}
		);
	};

	render() {
		return (
			<React.Fragment>
				<div className="title-container">
					<h2>Friends Page</h2>
				</div>
				<Switch>
					<Route exact path="/friends">
						<div className="data-container friends-buttons">
							<NavLink to="/friends/add" className="btn btn-primary">
								Add Friends
							</NavLink>
							<form action="" className="col-md-6">
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										placeholder="Search Query"
										aria-label="Example text with button addon"
										aria-describedby="button-addon1"
										name="query"
										value={this.state.formData.query}
										onChange={this.onFormFieldChanged}
									/>
									<button
										className="btn btn-outline-secondary"
										type="submit"
										id="button-addon1"
										onClick={this.onFormSubmit}
									>
										Search
									</button>
									{this.state.formData.lastQuery !== "" && (
										<button
											className="btn btn-outline-danger"
											type="button"
											id="button-addon1"
											onClick={this.clearSearch}
										>
											Clear
										</button>
									)}
								</div>
							</form>
						</div>
					</Route>
					<Route exact path="/friends/add">
						<AddFriend onAdd={this.addFriendState} />
					</Route>
					<Route
						exact
						path="/friends/edit/:friendId"
						render={(props) => (
							<EditFriend {...props} onUpdate={this.updateFriendState} />
						)}
					/>
				</Switch>
				<div className="data-container">
					{this.state.formData.lastQuery !== "" && (
						<h5>Search Results For : {this.state.formData.lastQuery}</h5>
					)}
				</div>

				<div className="data-container friends-container">
					{this.state.friendTemplates}
				</div>

				<div className="data-container">
					<div id="react-paginate">
						<ReactPaginate
							previousLabel={"previous"}
							nextLabel={"next"}
							breakLabel={"..."}
							breakClassName={"break-me"}
							pageCount={this.state.pageCount}
							marginPagesDisplayed={1}
							pageRangeDisplayed={5}
							onPageChange={this.handlePageClick}
							containerClassName={"pagination"}
							activeClassName={"active"}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(Friends);
