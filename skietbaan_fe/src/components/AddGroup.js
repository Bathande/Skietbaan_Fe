import React, { Component } from "react";
import { connect } from "react-redux";
import { createGroups, getname } from "../actions/postActions";
import "./add.css";
import history from "./history";

class AddGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      colors: true,
      txt: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onClick() {
    if (this.state.name.length != 0) {
      this.props.getname(this.state.name);
      history.push("/Groups");
    } else {
      this.setState({ txt: "group name can't be empty" });
    }
  }
  render() {
    return (
      <div className="page">
        <div className="top_bar">
          <a href="#" class="fa fa-angle-left" />

          <label className="center_label">Create Group</label>
        </div>
        <div className="middle_bar">
          <label className="name">Enter Group Name</label>
          <input
            className="texts"
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.state.name}
            autoComplete="off"
            autoCorrect="off"
            placeholder={this.state.txt}
          />
          <button
            className={this.state.name == "" ? "add" : "add2"}
            type="submit"
            onClick={this.onClick}
          >
            Add Users
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  name: state.posts.groupName
});

export default connect(
  mapStateToProps,
  { createGroups, getname }
)(AddGroup);