import React from "react";

import { NavLink } from "react-router-dom";

class FriendTemplate extends React.Component {
	deleteFriend = () => {
		this.props.deleteBtn(this.props.friend);
	};

	render() {
		// let image;
		// if (this.props.friend.primaryImage) {
		// 	image = (
		// 		<img
		// 			src={this.props.friend.primaryImage.imageUrl}
		// 			className="card-img-top profile"
		// 			alt="profile"
		// 		/>
		// 	);
		// }
		return (
			<div className="card">
				{this.props.friend.primaryImage ? (
					<img
						src={this.props.friend.primaryImage.imageUrl}
						className="card-img-top profile"
						alt="profile"
					/>
				) : (
					<img
						src="https://azstatefair.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
						className="card-img-top profile"
						alt="profile"
					/>
				)}
				<div className="card-body">
					<h5 className="title">{this.props.friend.title}</h5>
					<p className="summary">{this.props.friend.summary}</p>
					<button
						className="btn btn-danger delete-friend"
						onClick={this.deleteFriend}
					>
						Delete
					</button>
					<NavLink
						to={"/friends/edit/" + this.props.friend.id}
						className="btn btn-primary"
					>
						Edit
					</NavLink>
					{/* <button type="button" className="btn btn-secondary update-friend">
						Edit
					</button> */}
				</div>
			</div>
		);
	}
}

export default React.memo(FriendTemplate);
