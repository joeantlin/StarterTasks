import React from "react";

// import SkillsForm from "./SkillsForm";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import friendsService from "../services/FriendsService";

const minMessage = (num) => {
	return `A minimum of ${num} characters are required`;
};

const maxMessage = (num) => {
	return `A maximum of ${num} characters are allowed`;
};

const validationSchema = Yup.object().shape({
	title: Yup.string()
		.min(2, minMessage(2))
		.max(120, maxMessage(120))
		.required("Required"),
	bio: Yup.string()
		.min(2, minMessage(2))
		.max(700, maxMessage(700))
		.required("Required"),
	summary: Yup.string()
		.min(2, minMessage(2))
		.max(80, maxMessage(80))
		.required("Required"),
	headline: Yup.string()
		.min(2, minMessage(2))
		.max(80, maxMessage(80))
		.required("Required"),
	slug: Yup.string()
		.min(2, minMessage(2))
		.max(100, maxMessage(100))
		.required("Required"),
	img: Yup.string()
		.url("Must be a valid URL")
		.max(100, maxMessage(100))
		.required("Required"),
	skill1: Yup.string().max(20, maxMessage(20)),
	skill2: Yup.string().max(20, maxMessage(20)),
	skill3: Yup.string().max(20, maxMessage(20)),
	skill4: Yup.string().max(20, maxMessage(20)),
});

class EditFriend extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			friendId: this.props.match.params.friendId,
			formData: {},
			statusList: [
				{ id: 0, name: "NotSet" },
				{ id: 1, name: "Active" },
				{ id: 2, name: "Deleted" },
				{ id: 3, name: "Flagged" },
			],
		};
	}

	onFormFieldChanged = (e) => {
		let input = e.currentTarget;
		this.setState(() => {
			let newState = { ...this.state.formData };
			newState[input.name] = input.value;
			return { formData: newState };
		});
	};

	handleSubmit = (form) => {
		console.log(form);
		let skills = [form.skill1, form.skill2, form.skill3, form.skill4];
		skills = skills.filter(this.filterSkills);
		skills = skills.map(this.mapSkills);

		this.updateFriend({
			title: form.title,
			bio: form.bio,
			summary: form.summary,
			headline: form.headline,
			slug: form.slug,
			statusId: form.status,
			primaryImage: form.img,
			imageId: form.imageId,
			skills: skills,
		});
	};

	componentDidMount() {
		console.log({ idFirst: this.props.match.params.friendId });
		this.getFriend(this.props.match.params.friendId);
	}

	componentWillReceiveProps(props) {
		// console.log({ friendId: this.state.friendId });
		// console.log({ paramId: props.match.params.friendId });
		if (this.state.friendId !== props.match.params.friendId) {
			this.setState({ friendId: props.match.params.friendId });
			this.getFriend(props.match.params.friendId);
		}
	}

	getFriend = (id) => {
		friendsService
			.getById(id)
			.then(this.getFriendSuccess)
			.catch(this.getFriendFail);
	};

	getFriendSuccess = (res) => {
		console.log({ friendData: res.data });
		let friend = res.data.item;
		if (friend.primaryImage === null) {
			friend.primaryImage = {
				imageUrl: "",
			};
		}

		let skillList = [];
		for (let i = 0; i < 4; i++) {
			if (friend.skills[i]) {
				skillList.push(friend.skills[i].name);
			} else {
				skillList.push("");
			}
		}

		this.setState({
			// friendId: friend.id,
			formData: {
				id: friend.id,
				title: friend.title,
				bio: friend.bio,
				summary: friend.summary,
				headline: friend.headline,
				slug: friend.slug,
				status: friend.statusId,
				img: friend.primaryImage.imageUrl,
				imageId: friend.primaryImage.Id,
				skill1: skillList[0],
				skill2: skillList[1],
				skill3: skillList[2],
				skill4: skillList[3],
			},
		});
		// fillData(res.data.item);
	};

	getFriendFail = (res) => {
		console.warn({ error: res });
		if (res.response.status === 404) {
			toast.error("No Friend Found!");
		} else {
			toast.error("Could not get Friend!");
		}
	};

	updateFriend = (friend) => {
		friendsService
			.update(friend, friend.id)
			.then((res) => {
				this.updateFriendSuccess(res, friend);
			})
			.catch(this.updateFriendFail);
	};

	updateFriendSuccess = (res, friend) => {
		console.log({ hasUpdated: res.data });
		toast.success(`${friend.title}has been updated!`);
		this.props.onUpdate(friend);
	};

	updateFriendFail = (res) => {
		toast.error("Could not update Friend!");
		console.warn({ error: res });
	};

	filterSkills = (skill) => {
		return skill && skill !== "";
	};

	mapSkills = (skill) => {
		return { name: skill };
	};

	mapStatus = (status) => {
		return (
			<option value={status.id} key={`status_${status.id}`}>
				{status.name}
			</option>
		);
	};
	4;
	render() {
		return (
			<div className="form-container">
				<h4>Edit Friend</h4>
				<Formik
					enableReinitialize={true}
					initialValues={this.state.formData}
					validationSchema={validationSchema}
					onSubmit={this.handleSubmit}
				>
					{(props) => {
						const { values, touched, errors, isValid, isSubmitting } = props;
						return (
							<Form className="row g-4">
								<div className="col-12">
									<label htmlFor="title" className="form-label">
										Title
									</label>
									<Field
										name="title"
										type="text"
										className="form-control"
										values={values.title}
									/>
									{errors.title && touched.title && (
										<span className="input-feedback has-error">{errors.title}</span>
									)}
								</div>
								<div className="col-12">
									<label htmlFor="bio" className="form-label">
										Bio
									</label>
									<Field
										name="bio"
										component="textarea"
										className="form-control"
										rows="3"
										values={values.bio}
									/>
									{errors.bio && touched.bio && (
										<span className="input-feedback has-error">{errors.bio}</span>
									)}
								</div>
								<div className="col-12">
									<label htmlFor="summary" className="form-label">
										Summary
									</label>
									<Field
										name="summary"
										type="text"
										className="form-control"
										values={values.summary}
									/>
									{errors.summary && touched.summary && (
										<span className="input-feedback has-error">{errors.summary}</span>
									)}
								</div>
								<div className="col-12">
									<label htmlFor="headline" className="form-label">
										Headline
									</label>
									<Field
										name="headline"
										type="text"
										className="form-control"
										values={values.headline}
									/>
									{errors.headline && touched.headline && (
										<span className="input-feedback has-error">{errors.headline}</span>
									)}
								</div>
								<div className="col-12">
									<label htmlFor="slug" className="form-label">
										Slug
									</label>
									<Field
										name="slug"
										type="text"
										className="form-control"
										values={values.slug}
									/>
									{errors.slug && touched.slug && (
										<span className="input-feedback has-error">{errors.slug}</span>
									)}
								</div>
								<div className="col-12">
									<label htmlFor="status" className="form-label">
										Status
									</label>
									<Field
										name="status"
										component="select"
										className="form-control"
										values={values.status}
									>
										{this.state.statusList.map(this.mapStatus)}
									</Field>
								</div>
								<div className="col-12">
									<label htmlFor="img" className="form-label">
										Profile Image
									</label>
									<Field
										name="img"
										type="text"
										className="form-control"
										values={values.img}
									/>
									{errors.img && touched.img && (
										<span className="input-feedback has-error">{errors.img}</span>
									)}
								</div>
								<div className="col-12">
									<label className="form-label">Skills: </label>
									<Field
										name="skill1"
										type="text"
										className="form-control"
										maxLength="20"
										values={values.skill1}
									/>
									{errors.skill1 && touched.skill1 && (
										<span className="input-feedback has-error">{errors.skill1}</span>
									)}
									<Field
										name="skill2"
										type="text"
										className="form-control"
										maxLength="20"
										values={values.skill2}
									/>
									{errors.skill2 && touched.skill2 && (
										<span className="input-feedback has-error">{errors.skill2}</span>
									)}
									<Field
										name="skill3"
										type="text"
										className="form-control"
										maxLength="20"
										values={values.skill3}
									/>
									{errors.skill3 && touched.skill3 && (
										<span className="input-feedback has-error">{errors.skill3}</span>
									)}
									<Field
										name="skill4"
										type="text"
										className="form-control"
										maxLength="20"
										values={values.skill4}
									/>
									{errors.skill4 && touched.skill4 && (
										<span className="input-feedback has-error">{errors.skill4}</span>
									)}
								</div>

								<div className="col-md-6">
									<NavLink to="/friends" className="btn btn-danger">
										Cancel
									</NavLink>
									<button
										type="submit"
										className="btn btn-primary"
										disabled={!isValid || isSubmitting}
									>
										Submit
									</button>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		);
	}
}

export default EditFriend;
