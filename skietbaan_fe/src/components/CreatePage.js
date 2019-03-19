import React, { Component } from 'react';
import '../scss/create-page.css';
import { getCookie } from '../components/cookie.js';
import history from "./history";
class CreatePage extends Component {

	constructor(props) {
		super(props);

		this.GoComps = this.GoComps.bind(this);
		this.GoMembers = this.GoMembers.bind(this);
		this.GoGroups = this.GoGroups.bind(this);
		this.ViewComps = this.ViewComps.bind(this);
		this.ViewMembers = this.ViewMembers.bind(this);
		this.ViewGroups = this.ViewGroups.bind(this);
	}

	GoComps() {
    history.push("/createComp");
	}

	GoMembers() {
    history.push("/registerMember");
	}

	GoGroups() {
    history.push("/AddGroup");
	}

	ViewComps() {
    history.push("/viewComp");
	}

	ViewMembers() {
    history.push("/viewMembers");
	}

	ViewGroups() {
    history.push("/ViewGroups");
	}

	render() {
		if(!getCookie("token")){
            window.location = "/registerPage";
        }
		return (
			<div className="create-page-container">
				<div class="page-name-create-page">
					<label className="create-menu-header">Create</label>
				</div>
				<div class="container centre">
					<div className="container-of-buttons">
						<div className="buttons-create">
							<div className="create-spacing">
								<button className="button-create-competitions" onClick={this.GoComps}>
									Competitions</button>
							</div>
							<div className="create-spacing">
								<button className="button-create-members" onClick={this.GoMembers}>
									Members</button>
							</div>
							<div className="create-spacing">
								<button className="button-create-groups" onClick={this.GoGroups}>
									Groups</button>
							</div>
						</div>
						<div className="buttons-view">
							<div className="view-spacing">
								<button className="button-view-competitions" onClick={this.ViewComps}>
									View</button>
							</div>
							<div className="view-spacing">
								<button className="button-view-members" onClick={this.ViewMembers}>
									View</button>
							</div>
							<div className="view-spacing">
								<button className="button-view-groups" onClick={this.ViewGroups}>
									View</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default CreatePage;
