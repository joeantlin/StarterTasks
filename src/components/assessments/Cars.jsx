import React from "react";

import CarTemplate from "./CarTemplate";

class Cars extends React.Component {
	state = {
		cars: [
			{
				make: "Kia",
				model: "Sorento",
				year: 2020,
			},
			{
				make: "Kia",
				model: "Optima",
				year: 2019,
			},
			{
				make: "Tesla",
				model: "Model 3",
				year: 2021,
			},
			{
				make: "Honda",
				model: "Civic",
				year: 2019,
			},
			{
				make: "Honda",
				model: "Accord",
				year: 2018,
			},
			{
				make: "Volkswagen",
				model: "Jetta",
				year: 2021,
			},
			{
				make: "Toyota",
				model: "Camry",
				year: 2021,
			},
			{
				make: "Ford",
				model: "Mustang",
				year: 2019,
			},
			{
				make: "Ford",
				model: "F-150",
				year: 2019,
			},
			{
				make: "Toyota",
				model: "Camry",
				year: 2020,
			},
			{
				make: "Ford",
				model: "F-150",
				year: 2021,
			},
		],
		showCars: true,
		carYear: 0,
		carTemplates: [],
	};

	componentDidMount() {
		this.setCars();
	}

	setCars = () => {
		this.setState({ carTemplates: this.state.cars.map(this.mapCarTemplates) });
	};

	mapCarTemplates = (car, index) => {
		return <CarTemplate key={index} car={car} />;
	};

	filterCars = (car) => {
		return car.year === this.state.carYear;
	};

	onFormFieldChanged = (e) => {
		let carYear = e.currentTarget.value;
		console.log(e.currentTarget);
		if (carYear === 0) {
			this.setCars();
		} else {
			this.setState({ carYear }, () => {
				this.newTemplates();
			});
		}
	};

	newTemplates = () => {
		let newCarList = [...this.state.cars];
		console.log(newCarList);
		newCarList = newCarList.filter(this.filterCars);
		this.setState({ carTemplates: newCarList.map(this.mapCarTemplates) });
	};

	onShowCarsToggle = () => {
		let showCars = this.state.showCars;
		showCars = showCars ? false : true;
		this.setState({ showCars });
	};
	render() {
		return (
			<React.Fragment>
				<div className="title-container">
					<h2>Cars Page</h2>
				</div>
				<div className="data-container">
					<form action="" className="col-md-3">
						<label htmlFor="filter-input" className="form-label">
							Filter
						</label>
						<select
							className="form-control form-select"
							aria-label="Select Status"
							name="filter"
							onChange={this.onFormFieldChanged}
						>
							<option value={0}>None</option>
							<option value={2019}>2019</option>
							<option value={2020}>2020</option>
							<option value={2021}>2021</option>
						</select>
					</form>
					<button
						className="btn btn-primary"
						type="button"
						onClick={this.onShowCarsToggle}
					>
						{this.state.showCars ? "Hide Cars" : " Show Cars"}
					</button>
				</div>
				{this.state.showCars && (
					<div className="data-container">{this.state.carTemplates}</div>
				)}
			</React.Fragment>
		);
	}
}

export default Cars;
