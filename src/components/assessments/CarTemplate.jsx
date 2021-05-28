import React from "react";

class CarTemplate extends React.Component {
	render() {
		return (
			<div className="card col-md-3 m-1">
				<div className="card-body">
					<h5 className="card-title">{this.props.car.make}</h5>
					<h5 className="card-text">{this.props.car.model}</h5>
					<h5 className="card-text">{this.props.car.year}</h5>
				</div>
			</div>
		);
	}
}

export default CarTemplate;
