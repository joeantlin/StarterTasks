import React from "react";

class SkillsForm extends React.Component {
	state = {
		skill: "",
	};

	onFormFieldChanged = (e) => {
		let input = e.currentTarget;
		this.setState(() => {
			let newState = { ...this.state };
			newState = input.value;
			return { skill: newState };
		});
	};

	componentDidMount() {
		if (this.props.match.params.skill) {
			this.setState({ skill: this.props.match.params.skill });
		}
	}

	render() {
		return (
			<React.Fragment>
				<input
					name="skill"
					type="text"
					className="form-control"
					value={this.state.skill}
					onChange={this.onFormFieldChanged}
				/>
				<button
					type="button"
					className="btn btn-warning"
					onClick={this.onFormSubmit}
				>
					Update
				</button>
			</React.Fragment>
		);
	}
}

export default SkillsForm;
