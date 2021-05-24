import React from "react";

import AddFriend from "./AddFriend";
import EditFriend from "./EditFriend";
import FriendTemplate from "./FriendTemplate";
import { Route, Switch, NavLink, withRouter } from "react-router-dom";
import friendsService from "../services/FriendsService";

class Friends extends React.Component {
	state = {
		friends: [],
		friendtemplates: [],
	};

	componentDidMount = () => {
		this.getFriends();
	};

	getFriends = () => {
		friendsService
			.getAll()
			.then(this.getFriendsSuccess)
			.catch(this.getFriendsFail);
	};

	getFriendsSuccess = (res) => {
		console.log(res.data.item.pagedItems);
		this.setState({
			friends: res.data.item.pagedItems,
		});
		this.setFriendTemplates(res.data.item.pagedItems);
		// renderAllFriends(res.data.item.pagedItems);
	};

	getFriendsFail = (res) => {
		console.warn({ error: res });
		if (res.response.status === 404) {
			// toastNotify("error", "No Users Found!");
		} else {
			// toastNotify("error", "Could not get Users!");
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

	render() {
		return (
			<React.Fragment>
				<div className="title-container">
					<h2>Friends Page</h2>
				</div>
				<Switch>
					<Route exact path="/friends">
						<div className="data-container">
							<NavLink to="/friends/add" className="btn btn-primary">
								Add Friends
							</NavLink>
						</div>
					</Route>
					<Route exact path="/friends/add">
						<AddFriend />
					</Route>
					<Route
						exact
						path="/friends/edit/:friendId"
						render={(props) => (
							<EditFriend {...props} onUpdate={this.updateFriendState} />
						)}
					/>
				</Switch>
				<div className="data-container" id="data-container">
					{this.state.friendTemplates}
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(Friends);
