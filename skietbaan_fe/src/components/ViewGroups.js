import React, { Component } from "react";
import { connect } from "react-redux";
import "./groups.css";
import history from "./history";
import { passId } from "../actions/postActions";
import { getname } from "../actions/postActions";

class ViewGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newArray: [],
      count: 0,
      black: ""
    };
    this.toggleHighlight = this.toggleHighlight.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onChange = this.onChange.bind(this);
    this.delete = this.delete.bind(this);
    this.editGroup = this.editGroup.bind(this);
  }
  componentWillMount() {
    fetch("http://localhost:63474/api/Groups")
      .then(res => res.json())
      .then(data => this.setState({ posts: data }));
  }
  onChange(event) {
    this.setState({ filterText: event.target.value });
  }

  onBack() {
    history.push("/ViewGroups");
      }
      delete this.state.posts[i].highlighted;
      delete this.state.posts[i].id;
  editGroup(event, name) {
    this.props.getname(name);
    this.props.passId(event);
    history.push("/EditGroup");
    }

  delete(e, index) {
    const newarry = [...this.state.posts];

    newarry.splice(index, 1);
    this.setState({ posts: newarry });
    console.log("here");
    fetch("http://localhost:63474/api/groups/" + e, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    })
      .then(function(response) {})
      .then(function(data) {})
      .catch(function(data) {});
    window.location = "/GroupDone";
  }
  toggleHighlight = event => {
    if (this.state.posts[event].highlighted === true) {
      this.state.posts[event].highlighted = false;
      {
        this.setState({ count: this.state.count - 1 });
      }
    } else {
      this.state.posts[event].highlighted = true;
      {
        this.setState({ count: this.state.count + 1 });
      }
    }
  };
  onBack() {
    
    //window.location = "/AddGroup";
  }
  editGroup(event,name){ 
    this.props.getname(name);
    this.props.passId(event);
    history.push("/AddMembersGroup");
  }

  delete(e){
    console.log(123)
  }

  render() {
    const postitems = (
      <div className="check">
        <ul class="list-group">
          {this.state.posts.filter(
            (post) => {
              return (!this.state.filterText || post.username.toLowerCase().startsWith(this.state.filterText.toLowerCase()) || post.email.toLowerCase().startsWith(this.state.filterText.toLowerCase()))
            }
          ).map((post, index) => (
            <li style={{width:"100%" }} class="list-group-item list-group-item-light" key={post.id}>
              <label style={{width:"100%"}} className="blabe">
                {post.name}
              <div style={{float:"right" , paddingLeft:"20px"}}>
              <img src={require("./GroupImages/submit plus add score.png")}  className="boxes" /><br/>delete
              
              </div>
              <div style={{float:"right"}}>
             <img src={require("./GroupImages/Group.png")}  className="boxes" onClick={()=>this.editGroup(post.id,post.name)}  /><br/>edit
             </div>
                <br/>
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
            <b>GROUP</b>
          </div>
        </div>
        <div className="BNavBar" />

        <div className="OnToTheNextOne" />
        <br />
        <br />
        <div
          className="scrollbar"
          data-simplebar
          data-simplebar-auto-hide="false"
        >
          {postitems}
        </div>
      </main>
    );
  }
}
const mapStateToProps = state => ({
  name: state.posts.groupName,
  id: state.posts.groupId
});

export default connect(
  mapStateToProps,
  { passId, getname }
)(ViewGroups);
