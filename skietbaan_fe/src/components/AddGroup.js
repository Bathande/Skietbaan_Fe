import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createGroups } from "../actions/postActions";
import "./add.css";
import { bindActionCreators } from 'redux';
import * as groupactions from "../actions/postActions";

class AddGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  componentDidCatch(){}

   onClick() {
    let RequestObject = {
      "Name": this.state.name,
    };
    this.props.createGroups(RequestObject);
    window.location = "/Groups";
   }
  render() {
    return (
      <div className="page">
        <div className="top_bar">
          <a href="#" class="fa fa-angle-left" />
          <div className="center_label">
            <b>GROUPS</b>
          </div>
        </div>
        <div className="middle_bar">
          <label className="name">
            <b>Enter Group Name</b>
          </label>
          <br />
          <input
            className="texts"
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.state.name}
          />
          <br />
          <br />

          <button className="add" type="submit" onClick={this.onClick}>
            Add users
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch =>{
    return {
      group: bindActionCreators(groupactions,dispatch)
    }
  }
  

export default connect(
  mapStateToProps,
  {createGroups}
)(AddGroup);