import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import './Create.css';
import history from './history';
import { getCookie } from './cookie.js';
import { BASE_URL } from '../actions/types.js';
import ViewMembers from '../components/ViewMembers';
import Radio from '@material-ui/core/Radio';
import AddGroup from '../components/AddGroup';
import ViewNonMembers from '../components/ViewNonMembers';
import ViewMembersExpiring from '../components/ViewMembersExpiring';
import GroupComponent from '../components/GroupComponent';
import CompComponent from '../components/CompComponent';
import { compSelectedPages } from '../actions/competition.action';
import { pageState, selectedPage, binStateFunc } from '../actions/postActions';
import whiteBin from './GroupImages/whiteBin.png';
import blackBin from './GroupImages/blackBin.png';
import unselected from './GroupImages/unselected-icon.png';
import selected from './GroupImages/selected-icon.png';
import { userIsClicked, expiredIsClicked, memberIsClicked, filterName,exportTextName } from '../actions/notificationAction';
export class createPages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userIconIsClicked: false,
			memberIconIsClicked: false,
			expiredIconIsClicked: false,
			isToken: true,
			selectedButton: 1,
			selectedButtonCreateViewGroups: 1,
			selectedButtonCreateViewCompetitions: 1,
			selectedValue: 'A',
			user: [],
			height: document.body.clientHeight,
			binState: false,
			filterNameData: ["users"],
			secondValueA:'a',
			secondValueB:'d',
			secondValueC:'d'
		};

		this.groupsPage = this.groupsPage.bind(this);
		this.comptetitionsPage = this.comptetitionsPage.bind(this);
		this.membersPage = this.membersPage.bind(this);
		this.createGroups = this.createGroups.bind(this);
		this.viewGroups = this.viewGroups.bind(this);
		this.createCompetitions = this.createCompetitions.bind(this);
		this.viewCompetitions = this.viewCompetitions.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.updateCreateContainer = this.updateCreateContainer.bind(this);
		this.noShadowOnMember = this.noShadowOnMember.bind(this);
		this.showHideHeader = this.showHideHeader.bind(this);
		this.changeUserIconState = this.changeUserIconState.bind(this);
		this.changeMemberIconState = this.changeMemberIconState.bind(this);
		this.changeExpiredIconState = this.changeExpiredIconState.bind(this);
	}
	updateCreateContainer() {
		this.props.binStateFunc(1);
		switch (this.selectedButton) {
			case 1:
				if (this.state.selectedButtonCreateViewGroups === 1) {
				} else if (this.state.selectedButtonCreateViewGroups === 1) {

				}
				break;
			case 2:
				if (this.state.selectedButtonCreateViewGroups === 1) {
				} else if (this.state.selectedButtonCreateViewGroups === 1) {

				}
				break;
			case 3:
				if (this.state.selectedValue === 'A') {
				} else if (this.state.selectedValue === 'B') {
				} else if (this.state.selectedValue === 'C') {
				}
				break;
		}
	}
	noShadowOnMember() {
		if (this.state.selectedButton === 3) {
			return "0px 0px 0px 0px grey";
		} else {
			return "0px 21px 18px -26px grey";
		}
	}

	groupsPage() {
		this.props.pageState(10);
		this.setState({ selectedButton: 1 });
	}

	comptetitionsPage() {
		this.setState({ selectedButton: 2 });
		this.props.compSelectedPages(1);
		this.props.pageState(10);
	}

	membersPage() {
		this.props.exportTextName("EXPORT users");
		this.setState({ selectedButton: 3, selectedValue: 'A' });
	}

	createGroups() {
		this.props.pageState(10);
		this.props.compSelectedPages(1);
		this.setState({ selectedButtonCreateViewGroups: 1 });
	}

	viewGroups() {
		this.props.binStateFunc(1);
		this.props.pageState(0);
		this.props.compSelectedPages(2);
		this.setState({ selectedButtonCreateViewGroups: 2 });
	}

	createCompetitions() {
		this.setState({ selectedButtonCreateViewCompetitions: 1 });
		this.props.compSelectedPages(2);
	}

	viewCompetitions() {

		this.setState({ selectedButtonCreateViewCompetitions: 2 });
		this.props.compSelectedPages(2);

	}
	handleChange = (event) => {
		this.setState({ selectedValue: event });
	};
	componentDidMount() {
		this.props.selectedPage(1);
		if (this.state.selectedValue === 'A') {
			
		} else if (this.state.selectedValue === 'B') {
			
		} else if (this.state.selectedValue === 'C') {
			
		}

		if (getCookie('token') !== null) {
			let token = getCookie('token');
			fetch(BASE_URL + '/api/features/getuserbytoken/' + token, {
				method: 'Get',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			})
				.then((response) => response.json())
				.then(function (data) {
					if (data.admin === false) {
						history.push('/home');
					}
				})
				.catch(function (data) { })
				.catch((err) => {
					/* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
				});
		} else {
			window.location = '/registerPage';
		}
		if (this.props.page === "") {
			this.props.pageState(10);
		}
	}

	showHideHeader() {
		window.addEventListener("resize", () => {
			let Navbar = document.querySelector(".create-main-container");
			if (this.state.height === document.body.clientHeight) {
				this.setState({
					toggle: false
				});
			} else {
				this.setState({
					toggle: true
				});
			}
		});
	}

	componentWillMount() {
		this.props.binStateFunc(1);
		this.showHideHeader();
		if (window.innerWidth < 575 && window.innerHeight < 800) {
			window.addEventListener("resize", () => {
				let Navbar = document.querySelector(".navbar-admin");
				if (this.state.height === document.body.clientHeight) {
					Navbar.classList.remove("hidden");
				} else {
					Navbar.classList.add("hidden");
				}
			})
		}
	}

	changeUserIconState = () => {
		if (this.state.filterNameData.indexOf("users") < 0) {
			this.state.filterNameData.push("users");
			this.setState({secondValueA:'a'});

			 if(this.state.filterNameData.length===1){
			 	this.props.exportTextName("EXPORT " +this.state.filterNameData[0].toUpperCase());
			}
			 else if(this.state.filterNameData.length===2){
				let x ="EXPORT "+this.state.filterNameData[0].toUpperCase() +"+"+ this.state.filterNameData[1].toUpperCase()
			 	this.props.exportTextName(x)
			 }
			 else{
				this.props.exportTextName("EXPORT ALL")
			 }
			
		} else {
			var index = this.state.filterNameData.indexOf("users");
			this.state.filterNameData.splice(index, 1);
			this.setState({secondValueA:'d'});

			 if(this.state.filterNameData.length===1){
				let x = this.state.filterNameData[0] 
			 	this.props.exportTextName("EXPORT"+" "+x.toUpperCase());
			 }
			 else if(this.state.filterNameData.length===2){
			 	let x ="EXPORT "+this.state.filterNameData[0].toUpperCase() +"+"+ this.state.filterNameData[1].toUpperCase();
			 	this.props.exportTextName(x)
			 }
			 else if(this.state.filterNameData.length===0){
			 	this.props.exportTextName("UNSELECTED")
			 }
			
		}
		this.props.filterName(this.state.filterNameData);
	}

	changeMemberIconState = () => {

		if (this.state.filterNameData.indexOf("members") < 0) {
			this.state.filterNameData.push("members");
			this.setState({secondValueB:'b'});

			 if(this.state.filterNameData.length===1){
			 	this.props.exportTextName("EXPORT " +this.state.filterNameData[0].toUpperCase());
			 }
			 else if(this.state.filterNameData.length===2){
			 	let x ="EXPORT "+this.state.filterNameData[0].toUpperCase() +"+"+ this.state.filterNameData[1].toUpperCase()
			 	this.props.exportTextName(x)
			 }
			 else{
			 	this.props.exportTextName("EXPORT ALL")
			 }
		} else {
			var index = this.state.filterNameData.indexOf("members");
			this.state.filterNameData.splice(index, 1);
			this.setState({secondValueB:'d'});

			 if(this.state.filterNameData.length===1){
			 	let x = "EXPORT "+this.state.filterNameData[0].toUpperCase();
			 	this.props.exportTextName(x);
			 }
			 else if(this.state.filterNameData.length===2){
			 	let x ="EXPORT "+this.state.filterNameData[0].toUpperCase() +"+"+ this.state.filterNameData[1].toUpperCase();
			 	this.props.exportTextName(x)
			 }
			 else if(this.state.filterNameData.length===0) {
			 	this.props.exportTextName("UNSELECTED")
			 }
			
		}
		this.props.filterName(this.state.filterNameData);
	}

	changeExpiredIconState = () => {

		this.props.expiredIsClicked();
		if (this.state.filterNameData.indexOf("expiring") < 0) {
			this.state.filterNameData.push("expiring");
			this.setState({secondValueC:'c'});

			if(this.state.filterNameData.length===1){
				let x = this.state.filterNameData[0] 
				this.props.exportTextName("EXPORT"+" "+x.toUpperCase());
			}
			else if(this.state.filterNameData.length===2){
				let x ="EXPORT "+this.state.filterNameData[0].toUpperCase() +"+"+ this.state.filterNameData[1].toUpperCase();
				this.props.exportTextName(x)
			}
			else{
				this.props.exportTextName("EXPORT ALL")
			}

		} else {
			var index = this.state.filterNameData.indexOf("expiring");
			this.state.filterNameData.splice(index, 1);
			this.setState({secondValueC:'d'});

			if(this.state.filterNameData.length===1){
				let x = this.state.filterNameData[0] 
				this.props.exportTextName("EXPORT"+" "+x.toUpperCase());
			}
			else if(this.state.filterNameData.length===2){
				let x ="EXPORT "+this.state.filterNameData[0].toUpperCase() +"+"+ this.state.filterNameData[1].toUpperCase();
				this.props.exportTextName(x)
			}
			else if(this.state.filterNameData.length===0){
				this.props.exportTextName("UNSELECTED")
			}
		}
		this.props.filterName(this.state.filterNameData);
	}

	changeBinState = () => {
		if (this.props.binState === 1) {
			for (var i = 0; i < this.props.groupsList.length; i++) {
				this.props.groupsList[i].highlighted = false;
			}
			this.props.binStateFunc(2);
		} else {
			for (var i = 0; i < this.props.compOBJ.length; i++) {
				this.props.compOBJ[i].highlighted = false;
			}
			this.props.binStateFunc(1);
		}
	};

	render() {
		const keyBoardVisible = (
			<Row className="row justify-content-center">
				<Col sm={8} className="createpage-bootstrap-col-center-container">
					<div className="">
						{this.props.page === 0 || this.props.page === 10 || this.props.page === 5 ? (
							<div className="">
								<div className={this.state.selectedButton === 3 ? 'create-top-nav-members' : 'create-top-nav'}>
									{/* top */}
									<div class="page-name-bar">
										<div className="gun-overlay-image">
											<label className="label-for-score">CREATE</label>
										</div>
									</div>
								</div>
							</div>
						) : null}
						<div className="components-create">

							{this.state.selectedButton === 1 && this.props.page === 10 ? (
								<AddGroup />
							) : this.state.selectedButton === 1 && this.props.page === 0 || this.state.selectedButton === 1 && this.props.page === 1 || this.state.selectedButton === 1 && this.props.page === 2 ? (
								<GroupComponent />
							) : null}
							{this.state.selectedButton === 2 ? <CompComponent /> : null}
							{this.state.selectedButton === 3 && this.state.selectedValue === 'A' ? (
								<ViewNonMembers />
							) : this.state.selectedButton === 3 && this.state.selectedValue === 'B' ? (
								<ViewMembers />
							) : this.state.selectedButton === 3 && this.state.selectedValue === 'C' ? (
								<ViewMembersExpiring />
							) : null}
						</div>
					</div>
				</Col>
			</Row>
		);

		const noKeyBoardVisible = (
			<Row className="justify-content-center">
				<Col sm={8} className="createpage-bootstrap-col-center-container">
					<div className="create-main-container">
						{this.props.page === 0 || this.props.page === 10 || this.props.page === 5 ? (
							<div className="create-nav-container">
								<div className={this.state.selectedButton === 3 ? 'create-top-nav-members' : 'create-top-nav'}>
									{/* top */}
									<div className="page-name-bar">
										<div className="gun-overlay-image">
											<label className="label-for-score">CREATE</label>

										</div>
										{(this.props.page === 0 && this.state.selectedButton === 1) || (this.props.page === 0 && this.state.selectedButton === 2) ?
											<div className="plus-next" onClick={() => this.changeBinState()}>
												<img
													className="bin-image"
													src={this.props.binState === 1 ? whiteBin : blackBin}
													alt=""
												/>
											</div> : null}
									</div>
									<Row className="row justify-content-center">
										<div className="create-switch-top">
											<div
												className={
													this.state.selectedButton === 1 ? 'switch-active' : 'switch-inactive'
												}
												onClick={this.groupsPage}
											>
												GROUPS
										</div>
											<div
												className={
													this.state.selectedButton === 2 ? 'switch-active' : 'switch-inactive'
												}
												onClick={this.comptetitionsPage}
											>
												COMPETITIONS
										</div>
											<div
												className={
													this.state.selectedButton === 3 ? 'switch-active' : 'switch-inactive'
												}
												onClick={this.membersPage}
											>
												MEMBERS
										</div>
										</div>
									</Row>
									<Row className="row justify-content-center">
										<div className="temp-container" style={{ boxShadow: this.noShadowOnMember() }}> {/* inline style to avoid affecting all bootstrap col-sm-8 in all pages */}
											<div className={this.state.selectedButton === 3 ? "create-switch-bottom-hide"
												: "create-switch-bottom"} >
												<div
													className={
														(this.state.selectedButton === 1 && this.props.page !== 0) || (this.state.selectedButton === 2 && this.props.page !== 0) ? (
															'switch-active-left'
														) : (
																'switch-inactive'
															)
													}
													onClick={this.createGroups}
												>
													CREATE

										</div>

												<div
													className={
														(this.state.selectedButton === 1 && this.props.page === 0) || (this.state.selectedButton === 2 && this.props.page === 0) ? (
															'switch-active-right'
														) : (
																'switch-inactive'
															)
													}
													onClick={this.viewGroups}
												>
													VIEW
										</div>
											</div>
										</div>
									</Row>
									{this.props.isClicked === false ?
										<Row className="row justify-content-center">
											{this.state.selectedButton === 3 ? (
												<div className="member-radio">
													<div className="radio-A">
														<Radio
															className="a-radio"
															aria-label="A"
															checked={this.state.selectedValue === 'A'}
															onChange={() => this.handleChange('A')}
															value="b"
															color={'primary'}
															name="radio-button-demo"
															aria-label="B"
														/>

														<label className="member-user-label">USERS</label>
													</div>
													<div className="radio-B">
														<Radio
															className="b-radio"
															aria-label="A"
															checked={this.state.selectedValue === 'B'}
															value="b"
															aria-label="B"
															color={'primary'}
															onChange={() => this.handleChange('B')}
														/>
														<label className="member-user-label">MEMBERS</label>
													</div>
													<div className="radio-C">
														<Radio
															className="c-radio"
															aria-label="A"
															checked={this.state.selectedValue === 'C'}
															value="b"
															aria-label="B"
															color={'primary'}
															onChange={() => this.handleChange('C')}
														/>
														<label className="member-user-label">EXPIRING</label>
													</div>
												</div>
											) : null}
										</Row>
										:
										<Row className="row justify-content-center">
											{this.state.selectedButton === 3 ? (
												<div className="member-radio">
													<div className="checkbox-A">
														<img src={this.state.secondValueA==='a' ? selected :
														 unselected}
															className="icon-size" alt="unselected"
															onClick={this.changeUserIconState} />
														<label className="member-user-label">USERS</label>
													</div>
													<div className="checkbox-B">
														<img src={ this.state.secondValueB==='b' ? selected : unselected}
															className="icon-size" alt="unselected"
															onClick={this.changeMemberIconState } />
														<label className="member-user-label">MEMBERS</label>
													</div>
													<div className="checkbox-C">
														<img src={ this.state.secondValueC==='c' ? selected : unselected}
															className="icon-size" alt="unselected"
															onClick={this.changeExpiredIconState } />
														<label className="member-user-label">EXPIRING</label>
													</div>
												</div>
											) : null}
										</Row>

									}
								</div>
							</div>
						) : null}


						<div className="components-create">

							{this.state.selectedButton === 1 && this.props.page === 10 ? (
								<AddGroup />
							) : this.state.selectedButton === 1 && this.props.page === 0 || this.state.selectedButton === 1 && this.props.page === 1 || this.state.selectedButton === 1 && this.props.page === 2 ? (
								<GroupComponent />
							) : null}
							{this.state.selectedButton === 2 ? <CompComponent /> : null}
							{this.state.selectedButton === 3 && this.state.selectedValue === 'A' ? (
								<ViewNonMembers />
							) : this.state.selectedButton === 3 && this.state.selectedValue === 'B' ? (
								<ViewMembers />
							) : this.state.selectedButton === 3 && this.state.selectedValue === 'C' ? (
								<ViewMembersExpiring />
							) : null}
						</div>
					</div>
				</Col>
			</Row>
		);

		if (!getCookie('token')) {
			window.location = '/registerPage';
		}
		return (
			<div>{this.state.toggle ? keyBoardVisible : noKeyBoardVisible}</div>
		);
	}
}

const mapStateToProps = (state) => ({
	page: state.posts.page,
	binState: state.posts.binState,
	groupsList: state.posts.groupsList,
	compOBJ: state.compOBJ.allComps,
	isClicked: state.notificationOBJ.isClicked,
	filterTitle: state.notificationOBJ.filterTitle,
	filterName: state.notificationOBJ.filterName,
	ExportWrittenText: state.notificationOBJ.ExportWrittenText
});

export default connect(mapStateToProps, {
	compSelectedPages, pageState, selectedPage, binStateFunc,
	userIsClicked, memberIsClicked, expiredIsClicked, filterName,exportTextName
})(createPages);
