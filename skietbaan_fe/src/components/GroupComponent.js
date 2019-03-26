import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ViewGroups from './ViewGroups';
import EditGroup from './EditGroup';
import AddMembersGroup from './AddMembersGroup';
import { pageState } from '../actions/postActions';

export class GroupComponent extends Component {
	
componentDidMount(){
	this.props.pageState(0);
}
	render() {
		return (
			<div>
				{this.props.page === 0 ? <ViewGroups /> : this.props.page === 1 ? <EditGroup /> : <AddMembersGroup />}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	page: state.posts.page
});

export default connect(mapStateToProps,{pageState})(GroupComponent);
