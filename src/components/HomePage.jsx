import React from "react";
// import usersService from "../services/UsersService";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="title-container">
                <h2>{this.props.message}</h2>
            </div>
        );
    }
}

export default HomePage;
