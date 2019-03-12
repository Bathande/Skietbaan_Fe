import React, { Component } from "react";
import { connect } from "react-redux";
import "./groups.css";
import { withRouter } from "react-router-dom";
import { passId, getName } from "../actions/postActions";
import { BASE_URL } from "../actions/types";
import deleteState from "./GroupImages/deleteState.png";
import normalstate from "./GroupImages/submit-plus.png";
import back from "./GroupImages/back.png";
import { getCookie } from '../components/cookie.js';
class ViewGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newArray: [],
      count: 0,
      ShowMe: true,
      ids: 0,
      indexs:"",
      selected: "",
      deleteState: false
    };
    this.onBack = this.onBack.bind(this);
    this.onChange = this.onChange.bind(this);
    this.delete = this.delete.bind(this);
    this.editGroup = this.editGroup.bind(this);
  }

  componentDidMount() {
    fetch(BASE_URL + "/api/Groups")
      .then(
         fetch(BASE_URL + "/api/Groups")
      )
      .then(res => res.json())
      .then(data =>
        this.setState({
          posts: data.map(users => {
            return {
              ...users,
              colors: "black",
              image: normalstate
            };
          })
        })
      )
  }

  onChange(event) {
    this.setState({ filterText: event.target.value });
  }

  onBack() {
    this.props.history.push("/create");
  }
  editGroup(obj) {
    this.props.getName(obj.name);
    this.props.passId(obj.id);
    this.props.history.push("/EditGroup");
  }

  update = (obj,index) => {
    const newarry = [...this.state.posts];
    newarry[index].colors = "red";
    newarry[index].image = deleteState;
    this.setState({indexs:index})
    this.setState({
      ids: obj.id,
      selected: obj.name,
      ShowMe: false,
      posts: newarry,
      ShowMe: false,
      deleteState: true
    });
  };

  delete() {
    this.setState({ ShowMe: false });
    const newarry = [...this.state.posts];
    newarry.splice(this.state.indexs, 1);
    this.setState({ posts: newarry });

    fetch(BASE_URL + "/api/Groups/" + this.state.ids, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.ids)
    }).then(fetch({}))
      .then(function(response) {})
      .then(function(data) {})
      .catch(function(data) {});
  }

  changeState = () => {
    this.setState({ ShowMe: false });
  };

  do = () => {

    if (this.state.ShowMe == false) {
      this.setState({ ShowMe: true });
    }

  };

  cancel = () => {
    const newarry = [...this.state.posts];
    newarry[this.state.indexs].colors = "black";
    newarry[this.state.indexs].image = normalstate;
    this.setState({ selected: "", posts: newarry });
  };

  render() {
    const postitems = (
      <div className="the-main">
        <table className="table-member">
          <tbody>
            {this.state.posts
              .filter(post => {
                return (
                  !this.state.filterText ||
                  post.username
                    .toLowerCase()
                    .startsWith(this.state.filterText.toLowerCase()) ||
                  post.email
                    .toLowerCase()
                    .startsWith(this.state.filterText.toLowerCase()) ||
                  post.memberID.startsWith(this.state.filterText)
                );
              })
              .map((post, index) => (
                <tr className="view-group" key={post.id}>
                  <td
                    className="first-row"
                    onClick={() => this.editGroup(post)}
                    style={{ color: post.colors ,textAlign:"left" }}
                  >
                    {post.name}
                  </td>
                  <td>
                    <div
                      className="group-view"
                      onClick={() => this.update(post,index)}
                    >
                      <img src={post.image} alt="" />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );

    return (
      <main className="The-Main" onClick={()=>this.do()}>
        <div className="the-nav-bar">
        <a href="" className="back-container">
          <img className="back-image" onClick={this.onBack} src={back} alt="" /></a>
          <label className="center-label">View Groups</label>
        </div>
        <div
          className="scrollbar"
          data-simplebar
          data-simplebar-auto-hide="false"
        >
          {postitems}
        </div>
        {this.state.ShowMe ? null : (
          <div className="bpanel">
            <table className="group-delete-table">
              <tbody>
                <tr>
                  <td>
                    <div className="the-textname">Delete</div>
                  </td>
                  <td>
                    <span className="name-of-group">
                      {this.state.selected}
                    </span>
                  </td>
                  <div className="confrim-cancel">
                    <td>
                      <button
                        className="group-confirm"
                        onClick={() => this.delete()}
                      >
                        Confirm
                      </button>
                    </td>
                    <td className="group-undo">
                      <button
                        className="updatess"
                        onClick={() => this.cancel()}
                      >
                        Cancel
                      </button>
                    </td>
                  </div>
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
  name: state.posts.groupName,
  id: state.posts.groupId
});

export default withRouter(
  connect(
    mapStateToProps,
    { passId, getName }
  )(ViewGroups)
);
