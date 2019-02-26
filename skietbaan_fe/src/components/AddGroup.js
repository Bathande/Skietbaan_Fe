import React, { Component } from "react";
import { connect } from "react-redux";
import { createGroups } from "../actions/postActions";
import { getname } from "../actions/postActions";
import "./add.css";
import { checkPropTypes } from "prop-types";
import history from './history';


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
  
   this.props.getname(this.state.name);
   this.props.createGroups(RequestObject);
   history.push("/Groups");
   }
  render() {
    console.log(this.props)
    return (
      <div className="page">
        <div className="top_bar">
          <a href="#" class="fa fa-angle-left" />
          <div className="center_label">
          <label className="groups">
            <h3><b>GROUPS</b></h3>
            </label>
          </div>
        </div>
        <div className="middle_bar">
          <label className="name">
            <h3>Enter Group Name</h3>
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
            ADD GROUP
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  name:state.posts.groupName,
 });

export default connect(
  mapStateToProps,
  {createGroups,getname}
)(AddGroup);