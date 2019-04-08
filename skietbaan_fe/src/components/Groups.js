import React, { Component } from 'react';
import { connect } from 'react-redux';
import './groups.css';
import { withRouter } from 'react-router-dom';
import { createGroups, pageState } from '../actions/postActions';
import { BASE_URL } from '../actions/types';
import back from './GroupImages/back.png';
import unmarked from './GroupImages/Oval.png';
import marked from './GroupImages/MarkedBox.png';
import Switch from '@material-ui/core/Switch';
import seleteAll from './GroupImages/seleteAll.png';
import unSelectAll from './GroupImages/unSelectAll.png';
import { Row, Col } from "react-bootstrap";

class Groups extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			groups: [],
			newArray: [],
			count: 0,
			st: true,
			filterText: '',
			check: 'Select all',
			height: window.innerHeight,
            width: window.innerWidth
		};
		this.toggleHighlight = this.toggleHighlight.bind(this);
		this.handleOnClick = this.handleOnClick.bind(this);
		this.onBack = this.onBack.bind(this);
		this.onChange = this.onChange.bind(this);
		this.selectall = this.selectall.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
		this.getBodyHeight = this.getBodyHeight.bind(this);
	}
	UNSAFE_componentWillMount() {
		fetch(BASE_URL + '/api/user').then((res) => res.json()).then((data) => {
			this.setState({
				posts: data.map((users) => {
					return {
						...users,
						highlighted: false
					};
				})
			});
		});

		fetch(BASE_URL + '/api/Groups').then((res) => res.json()).then((data) => this.setState({ groups: data.name })).catch(err => {
			/* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
		});
	}
	componentWillMount(){
		window.addEventListener("resize", this.updateDimensions);
	}
	componentDidMount(){
		this.updateDimensions();
	}
	getBodyHeight() {
		if (this.state.width < 575) {
		  return (this.state.height - 240);
		} else {
		  return (this.state.height - 184);
		}
	  }
	  updateDimensions() {
		this.setState({
		  height: window.innerHeight,
		  width: window.innerWidth
		});
	  }
	onChange(event) {
		this.setState({ filterText: event.target.value });
	}

	async handleOnClick() {
		const { newArray } = this.state;
		for (var i = 0; i < this.state.posts.length; i++) {
			if (this.state.posts[i].highlighted === true) {
				newArray.push(this.state.posts[i]);
			}
			delete this.state.posts[i].highlighted;
			delete this.state.posts[i].id;
		}

		const requestedObj = {
			name: this.props.name.toLowerCase(),
			users: this.state.newArray
		};

		await fetch(BASE_URL + '/api/groups/add', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestedObj)
		})
			.then(function (response) { })
			.catch(function (data) { }).catch(err => {
				/* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
			});
		window.location = '/GroupComponent';
	}

	selectall() {
		if (this.state.check === 'Select all') {
			this.setState({ count: this.state.posts.length });
			for (var i = 0; i < this.state.posts.length; i++) {
				this.state.posts[i].highlighted = true;
			}
			this.setState({ check: 'Unselect all' });
		} else {
			this.setState({ count: 0 });
			for (var i = 0; i < this.state.posts.length; i++) {
				this.state.posts[i].highlighted = false;
			}
			this.setState({ check: 'Select all' });
		}
	}

	toggleHighlight = (event) => {
		if (this.state.posts[event].highlighted === true) {
			this.state.posts[event].highlighted = false;
			this.setState({ count: this.state.count - 1 });
		} else {
			this.state.posts[event].highlighted = true;
			this.setState({ count: this.state.count + 1 });
		}
	};
	onBack() {
		this.props.history.push('/create');
	}
	render() {
		const postitems = (
			<div className="check" style={{ height: this.getBodyHeight() + "px" }}>
				<ul class="list-group" style={{ textAlign: 'left' }}>
					{this.state.posts
						.filter((post) => {
							return (
								!this.state.filterText ||
								post.username.toLowerCase().startsWith(this.state.filterText.toLowerCase()) ||
								post.email.toLowerCase().startsWith(this.state.filterText.toLowerCase())
							);
						})
						.map((post, index) => (
							<li className="listItem" key={post.id} onClick={() => this.toggleHighlight(index)}>
								<img
									className="checkbox-delete"
									src={post.highlighted == true ? marked : unmarked}
									alt=""
								/>
								<label className={post.highlighted === true ? 'blabe' : 'blabe2'}>
									<div className={post.highlighted === true ? 'userName-active' : 'userName'}>
										{post.username}
									</div>
									<div className={post.highlighted === true ? 'emails-active' : 'email'}>
										{post.email}
									</div>
								</label>
							</li>
						))}
				</ul>
			</div>
		);
		return (
			<Row className="row justify-content-center">
				<Col sm={8} className="createpage-bootstrap-col-center-container" style={{ position: "inherit" }}> {/* inline style to avoid affecting all bootstrap col-sm-8 in all pages */}
					<div className="The-Main">
						<div className="navBar-container">
							<div className="the-nav-bar">
								<img className="back-image" onClick={this.onBack} src={back} alt="" />
								<label className="center-label">ADD USERS</label>
							</div>
							<div class="BNavBar">
								<div className="inputBox">
									<input
										className="the-Text"
										id="username"
										type="text"
										onChange={this.onChange}
										autoComplete="off"
										placeholder="Search"
									/>
								</div>
								<div className="switchAll" onClick={this.selectall}>
									<img className="checkbox-delete" src={this.state.count === this.state.posts.length ? seleteAll : unSelectAll} alt="" />
								</div>
							</div>
						</div>
						<div className="scrollbar" data-simplebar data-simplebar-auto-hide="false">
							{postitems}
						</div>
						{this.state.count === 0 ? null : (
							<label className="bottom-label">
								<button className="create-group" onClick={this.handleOnClick}>
									Create Group
						</button>
							</label>
						)}
					</div>
				</Col>
			</Row>
		);
	}
}
const mapStateToProps = (state) => ({
	name: state.posts.groupName,
	thegroup: state.posts.selectedItem
});

export default withRouter(connect(mapStateToProps, { pageState, createGroups })(Groups));
