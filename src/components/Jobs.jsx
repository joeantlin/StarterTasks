import React from "react";

import jobsService from "../services/JobsService";

class Jobs extends React.Component {
	state = {
		page: 0,
	};

	componentDidMount = () => {
		this.getJobs();
	};

	getJobs = () => {
		console.log(this.state.page);
		jobsService.getAll(this.state.page).then((res) => {
			console.log(res);
			// this.getJobssSuccess(res, null);
		});
		// .catch(this.getJobsFail);
	};

	render() {
		return (
			<div className="title-container">
				<h2>Jobs Page</h2>
			</div>
		);
	}
}

export default Jobs;
