import React from "react";

import AddFriend from "./AddFriend";
import FriendTemplate from "./FriendTemplate";

import friendsService from "../services/FriendsService";

class Friends extends React.Component {
	state = {
		friends: [],
		testFriend: {
			id: 24627,
			bio: "Kate has 50 cats, and wants more",
			title: "Ms. Kate",
			summary: "Kate has a lot of cats",
			headline: "Kate has Cat Lady",
			entityTypeId: 1,
			statusId: "Active",
			slug: "friend916",
			skills: null,
			primaryImage: {
				id: 11965,
				entityId: 24627,
				imageTypeId: "Main",
				imageUrl:
					"https://i.guim.co.uk/img/media/6ba3098f53605d34e13125a4b52274d4b8cae093/0_0_3000_1955/master/3000.jpg?width=700&quality=85&auto=format&fit=max&s=c5d42b3a07e7e857e009eb6f35f75394",
			},
			dateCreated: "2021-05-17T16:30:26.11",
			dateModified: "2021-05-17T20:38:57.6866667",
		},
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
		this.setState(() => {
			let friends = res.data.item.pagedItems;
			return { friends: friends.map(this.mapFriends) };
		});
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

	mapFriends = (friend) => {
		return (
			<FriendTemplate
				key={`friend-${friend.id}`}
				friend={friend}
				deleteBtn={this.deleteFriend}
			/>
		);
	};

	deleteFriend = (e) => {
		console.log("test");
		console.log(e);
		// let id = $(e.target).closest('.card').attr("id");
		// friendsService
		// 	.delete(id)
		// 	.then((res) => {
		// 		console.log(res.data);
		// 	})
		// 	.catch(this.deleteFriendFail);
	};

	deleteFriendFail = (res) => console.warn(res);

	render() {
		return (
			<React.Fragment>
				<div className="title-container">
					<h2>Friends Page</h2>
				</div>
				<AddFriend />
				<div className="data-container" id="data-container">
					{this.state.friends}
				</div>
			</React.Fragment>
		);
	}
}

export default Friends;