import React from "react";
// import SkillsForm from "./SkillsForm";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import friendsService from "../services/FriendsService";
// import { format } from "util";

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

class AddFriend extends React.Component {
	state = {
		formData: {
			title: "",
			bio: "",
			summary: "",
			headline: "",
			slug: "",
			img: "",
			skill1: "",
			skill2: "",
			skill3: "",
			skill4: "",
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

	handleSubmit = (form, { resetForm }) => {
		console.log(form);
		let skills = [form.skill1, form.skill2, form.skill3, form.skill4];
		skills = skills.filter(this.filterSkills);
		skills = skills.map(this.mapSkills);

		this.addFriend(
			{
				title: form.title,
				bio: form.bio,
				summary: form.summary,
				headline: form.headline,
				slug: form.slug,
				statusId: "Active",
				primaryImage: form.img,
				skills: skills,
			},
			resetForm
		);
	};

	filterSkills = (skill) => {
		return skill && skill !== "";
	};

	mapSkills = (skill) => {
		return { name: skill };
	};

	addFriend = (friend, resetForm) => {
		friendsService
			.add(friend)
			.then((res) => {
				this.addFriendSuccess(res, friend, resetForm);
			})
			.catch(this.addFriendFail);
	};

	addFriendSuccess = (res, friend, resetForm) => {
		console.log(res.data);
		friend.id = res.data.item;
		resetForm(this.state.formData);
		this.props.onAdd(friend);
	};

	addFriendFail = (res) => {
		console.warn(res);
		toast.error("Failed to add Friend!");
	};

	// mapSkillsForm = (skill) => {
	// 	return (
	// 		<SkillsForm
	// 			key={`skill-${this.state.formData.skills.length - 1}`}
	// 			skill={skill}
	// 			deleteBtn={this.deleteSkill}
	// 		/>
	// 	);
	// };

	render() {
		return (
			<div className="form-container">
				<h4>Add Friend</h4>
				<Formik
					enableReinitialize={true}
					initialValues={this.state.formData}
					validationSchema={validationSchema}
					onSubmit={this.handleSubmit}
				>
					{(props) => {
						const { touched, errors, isValid, isSubmitting } = props;
						return (
							<Form className="row g-4">
								<div className="col-12">
									<label htmlFor="title" className="form-label">
										Title
									</label>
									<Field name="title" type="text" className="form-control" />
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
									/>
									{errors.bio && touched.bio && (
										<span className="input-feedback has-error">{errors.bio}</span>
									)}
								</div>
								<div className="col-12">
									<label htmlFor="summary" className="form-label">
										Summary
									</label>
									<Field name="summary" type="text" className="form-control" />
									{errors.summary && touched.summary && (
										<span className="input-feedback has-error">{errors.summary}</span>
									)}
								</div>
								<div className="col-12">
									<label htmlFor="headline" className="form-label">
										Headline
									</label>
									<Field name="headline" type="text" className="form-control" />
									{errors.headline && touched.headline && (
										<span className="input-feedback has-error">{errors.headline}</span>
									)}
								</div>
								<div className="col-12">
									<label htmlFor="slug" className="form-label">
										Slug
									</label>
									<Field name="slug" type="text" className="form-control" />
									{errors.slug && touched.slug && (
										<span className="input-feedback has-error">{errors.slug}</span>
									)}
								</div>
								<div className="col-12">
									<label htmlFor="img" className="form-label">
										Profile Image
									</label>
									<Field name="img" type="text" className="form-control" />
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
									/>
									{errors.skill1 && touched.skill1 && (
										<span className="input-feedback has-error">{errors.skill1}</span>
									)}
									<Field
										name="skill2"
										type="text"
										className="form-control"
										maxLength="20"
									/>
									{errors.skill2 && touched.skill2 && (
										<span className="input-feedback has-error">{errors.skill2}</span>
									)}
									<Field
										name="skill3"
										type="text"
										className="form-control"
										maxLength="20"
									/>
									{errors.skill3 && touched.skill3 && (
										<span className="input-feedback has-error">{errors.skill3}</span>
									)}
									<Field
										name="skill4"
										type="text"
										className="form-control"
										maxLength="20"
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

export default AddFriend;
