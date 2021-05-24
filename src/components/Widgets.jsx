import React from "react";

import { toast } from "react-toastify";

import entitiesService from "../services/EntitiesService";

class Widgets extends React.Component {
	state = {
		formData: {
			name: "",
			manufacturer: "",
			description: "",
			costs: "",
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
		this.addWidget({
			name: this.state.formData.name,
			manufacturer: this.state.formData.manufacturer,
			description: this.state.formData.description,
			costs: this.state.formData.costs,
		});
	};

	addWidget = (widget) => {
		entitiesService
			.add("widgets", widget)
			.then(this.addWidgetSuccess)
			.catch(this.addWidgetFail);
	};

	addWidgetSuccess = (res) => {
		console.log({ newWidget: res.data });
		this.setState({
			formData: {
				name: "",
				manufacturer: "",
				description: "",
				costs: "",
			},
		});
		toast.success("Added a Widget, Id: " + res.data.item);
	};

	addWidgetFail = (res) => {
		console.warn({ error: res });
		toast.error("Widget failed to be added");
	};

	render() {
		return (
			<div className="form-container">
				<h2>Add Widget</h2>
				<form id="my-form" className="row g-4">
					<div className="col-12">
						<label htmlFor="name-input" className="form-label">
							Name
						</label>
						<input
							name="name"
							className="form-control"
							value={this.state.formData.name}
							onChange={this.onFormFieldChanged}
						/>
					</div>
					<div className="col-12">
						<label htmlFor="manufacturer-input" className="form-label">
							Manufacturer
						</label>
						<input
							name="manufacturer"
							className="form-control"
							value={this.state.formData.manufacturer}
							onChange={this.onFormFieldChanged}
						/>
					</div>
					<div className="col-12">
						<label htmlFor="description-input" className="form-label">
							Description
						</label>
						<input
							name="description"
							className="form-control"
							value={this.state.formData.description}
							onChange={this.onFormFieldChanged}
						/>
					</div>

					<div className="col-12">
						<label htmlFor="costs-input" className="form-label">
							Costs
						</label>
						<input
							name="costs"
							className="form-control"
							value={this.state.formData.costs}
							onChange={this.onFormFieldChanged}
						/>
					</div>
					<div className="col-md-6">
						<button
							type="submit"
							className="btn btn-primary"
							onClick={this.onFormSubmit}
						>
							Login
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Widgets;
