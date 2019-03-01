import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import '../scss/navbar.css';
import 'font-awesome/css/font-awesome.min.css';
import '../bootstrap/NavbarMenuStyle.css';

class NavbarMenuUser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			expanded: false
		};

		this.isHome = this.isHome.bind(this);
		this.isScoreCapture = this.isScoreCapture.bind(this);
		this.isProfile = this.isProfile.bind(this);
		this.isDocuments = this.isDocuments.bind(this);
		this.isNotifications = this.isNotifications.bind(this);
		this.expand = this.expand.bind(this);
		this.isMore = this.isMore.bind(this);
		this.GoToLeaderboard = this.GoToLeaderboard.bind(this);
		this.GoToScoreCapture = this.GoToScoreCapture.bind(this);
		this.GoToProfile = this.GoToProfile.bind(this);
		this.GoToDocuments = this.GoToDocuments.bind(this);
		this.GoToNotifications = this.GoToNotifications.bind(this);
	}

	expand() {
		this.setState({ expanded: !this.state.expanded });
	}

	isHome() {
		if (window.location.pathname.endsWith("/home")) {
			return <img src={require('../components/navbar-icons/leaderboard-red.png')}
				className="leaderboard-icon-grey" alt='Leaderboard tab Selected'></img>
		}
		else {
			return <img src={require('../components/navbar-icons/leaderboard-grey.png')}
				className="leaderboard-icon-grey" alt='Leaderboard tab not Selected'></img>
		}
	}

	isScoreCapture() {
		if (window.location.pathname.endsWith("/scorecapture")) {
			return <img src={require('../components/navbar-icons/add-score-red.png')}
				className="add-score-icon-grey" alt='ScoreCapture tab Selected'></img>
		}
		else {
			return <img src={require('../components/navbar-icons/add-score-grey.png')}
				className="add-score-icon-grey" alt='ScoreCapture tab not Selected'></img>
		}
	}

	isProfile() {
		if (window.location.pathname.endsWith("/profile")) {
			return <img src={require('../components/navbar-icons/profile-red.png')}
				className="profile-icon-grey" alt='Profile tab Selected'></img>
		}
		else {
			return <img src={require('../components/navbar-icons/profile-grey.png')}
				className="profile-icon-grey" alt='Profile tab not Selected'></img>
		}
	}

	isDocuments() {
		if (window.location.pathname.endsWith("/documents")) {
			return <img src={require('../components/navbar-icons/docs-red.png')}
				className="docs-icon-grey" alt='Document tab Selected'></img>
		}
		else {
			return <img src={require('../components/navbar-icons/docs-grey.png')}
				className="docs-icon-grey" alt='Document tab not Selected'></img>
		}
	}

	isNotifications() {
		if (window.location.pathname.endsWith("/notifications")) {
			return <img src={require('../components/navbar-icons/notifications-red.png')}
				className="notifications-icon-grey" alt='Notification tab Selected'></img>
		}
		else {
			return <img src={require('../components/navbar-icons/notifications-grey.png')}
				className="notifications-icon-grey" alt='Notification tab not Selected'></img>
		}
	}

	isMore() {
		return <img src={require('../components/navbar-icons/more-grey.png')}
			className="more-icon-grey" alt='More icon to expand tray'></img>
	}

	GoToLeaderboard (){
		window.location = "/home";
	}

	GoToScoreCapture(){
		window.location = "/scorecapture";
	}

	GoToProfile(){
		window.location = "/profile";
	}

	GoToDocuments(){
		window.location = "/documents";
	}

	GoToNotifications(){
		window.location = "/notifications";
	}

	render() {
		// rendering the basic navbar within the render class
		return (
			<div >
				<table className="navbar-admin">
				<tbody>
					<tr className="first-row-navbar">
						<td className="columns" onClick={() => this.GoToLeaderboard()}>
							{this.isHome()}
						</td>
						<td className="columns" onClick={() => this.GoToScoreCapture()} >
							{this.isScoreCapture()}
						</td>
						<td className="columns" onClick={() => this.GoToProfile()}>
							{this.isProfile()}
						</td>
						<td onClick={this.expand}>
							{this.isMore()}
						</td>
					</tr>
					<tr className={this.state.expanded ? "second-row-navbar expand":"second-row-navbar"}>
						<td className="columns" onClick={() => this.GoToDocuments()}>
							{this.isDocuments()}
						</td>
						<td className="columns" onClick={() => this.GoToNotifications()}>
							{this.isNotifications()}
						</td>
						<td></td>
					</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
export default NavbarMenuUser;