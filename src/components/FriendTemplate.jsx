import React from "react";

class FriendTemplate extends React.Component {
	// constructor(props) {
	//     super(props);
	//     this.state = {
	//         friend: props.friend
	//     }
	// }
	render() {
		return (
			<div className="card">
				<img
					src={this.props.friend.primaryImage.imageUrl}
					className="card-img-top profile"
					alt="profile"
				/>
				<div className="card-body">
					<h5 className="title">{this.props.friend.title}</h5>
					<p className="summary">{this.props.friend.summary}</p>
					<button type="button" className="btn btn-danger delete-friend">
						Delete
					</button>
					<button type="button" className="btn btn-secondary update-friend">
						Edit
					</button>
				</div>
			</div>
		);
	}
}

export default FriendTemplate;
