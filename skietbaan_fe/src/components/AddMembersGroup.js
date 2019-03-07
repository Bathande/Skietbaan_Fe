import React, { Component } from "react";
import { connect } from "react-redux";
import "./groups.css";
import { BASE_URL } from "../actions/types";
import { withRouter } from 'react-router-dom';
class AddMembersGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newArray: [],
      filterText: "",
      selected: "",
      count: 0
    };
    this.toggleHighlight = this.toggleHighlight.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  UNSAFE_componentWillMount() {
    if (this.props.id != 0) {
      console.log(123)
      fetch(BASE_URL + "/api/Groups/list?id=" + this.props.id)
        .then(res => res.json())
        .then(data => {
          this.setState({
            posts: data.map(users => {
              return {
                ...users,
                highlighted: false,
                backgrnd: "white" 
              };
            })
          });
        });
    } else {
      
        this.props.history.push("/ViewGroups");
       
    }
  }
  onChange(event) {
    this.setState({ filterText: event.target.value });
  }

  handleOnClick() {
    const { newArray } = this.state;
    for (var i = 0; i < this.state.posts.length; i++) {
      if (this.state.posts[i].highlighted === true) {
        newArray.push(this.state.posts[i]);
      }
      delete this.state.posts[i].highlighted;
      delete this.state.posts[i].id;
    }
    let request = {
      users: this.state.newArray,
      GroupIds: this.props.id
    };
    fetch(BASE_URL + "/api/groups/postMember/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    })
      .then(function(response) {})
      .then(function(data) {})
      .catch(function(data) {});
  }
  toggleHighlight = (name, event) => {
    if (this.state.posts[event].highlighted === true) {
      this.state.posts[event].backgrnd="white";
      this.state.posts[event].highlighted = false;
      this.setState({ count: this.state.count - 1 });
    } else {
      this.setState({ selected: name });
      this.state.posts[event].backgrnd="#F3F4F9";
      this.state.posts[event].highlighted = true;
      this.setState({ count: this.state.count + 1 });
    }
  };
  onBack() {
     this.props.history.push("/EditGroup");
  }
  render() {
    const postitems = (
      <div className="check">
        <ul class="list-group">
          {this.state.posts
            .filter(post => {
              return (
                !this.state.filterText ||
                post.username
                  .toLowerCase()
                  .startsWith(this.state.filterText.toLowerCase()) ||
                post.email
                  .toLowerCase()
                  .startsWith(this.state.filterText.toLowerCase())
              );
            })
            .map((post, index) => (
              <li
                class="list-group-item list-group-item-light"
                key={post.id}
                style={{background:post.backgrnd}}
              >
                <input
                  type="checkbox"
                  className="boxs"
                  style={{marginRight:"23px"}}
                  onClick={() => this.toggleHighlight(post.username, index)}
                />
                <label className="blabe">
                  <div className="userName"> {post.username}</div>
                  <div className="emails">{post.email}</div>
                </label>
              </li>
            ))}
        </ul>
      </div>
    );
    return (
      <main className="TheMain">
        <div className="TheNavBar">
          <a href="#" class="fa fa-angle-left" onClick={this.onBack} />
          <div className="center_label">
            <b>{this.props.name}</b>
          </div>
        </div>
        <div className="BNavBar">
          <input
            className="theText"
            id="username"
            type="text"
            onChange={this.onChange}
            autoComplete="off"
          />
        </div>

        <div className="OnToTheNextOne" />
        <div
          className="scrollbar"
          data-simplebar
          data-simplebar-auto-hide="false"
        >
          {postitems}
        </div>

        {this.state.count==0 ? null : (
          <div className="bpanel">
            <table className="group-delete-table">
              <tbody>
                <tr>
                  <td>
                    <div className="thetextname">Delete</div>
                  </td>
                  <td>
                    <span className="name-of-group">
                      {this.state.selected}{" "}
                    </span>
                  </td>
                  <td>
                    <button
                      className="group-confirm"
                      onClick={()=>this.handleOnClick()}
                      style={{background:"white",color:"black",border:"1px solid white"}}
                    >
                      Confirm
                    </button>
                  </td>
                  <td className="group-undo">
                    <button className="updatess" onClick={() => this.cancel()}>
                      Cancel
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
    );
  }
}
const mapStateToProps = state => ({
  id: state.posts.groupId,
  name: state.posts.groupName
});
export default withRouter(connect(mapStateToProps)(AddMembersGroup));
