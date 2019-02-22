import React, { Component } from "react";
import "./groups.css";
import { URLADD, URLUSER } from "../actions/types";

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],

      newArray: [],
      count: 0,
      black: "",
      filterText: ""
    };
    this.toggleHighlight = this.toggleHighlight.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    fetch(URLUSER)
      .then(res => res.json())
      .then(data => {
        this.setState({
          posts: data.map(users => {
            users.highlighted = false;
            return {
              ...users,
              highlighted: false
            };
          })
        });
      });    
  }
  onChange(event){
    this.setState({filterText: event.target.value});
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
      newArray: this.state.newArray
    };
    fetch(URLADD, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newArray)
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
    window.location = "/AddGroup";
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
            <li class="list-group-item list-group-item-light" key={post.id}>
              <input
                type="checkbox"
                className="boxs"
                onClick={() => this.toggleHighlight(index)}
              />
              <label className="blabe">
                {" "}
                {post.username} <br />
                {post.email}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
    return (
      <main className="TheMain" >
        <div className="TheNavBar">
          <a href="#" class="fa fa-angle-left" onClick={this.onBack} />
          <div className="center_label">
            <b>Retro Rabbit</b>
          </div>
        </div>
        <div className="BNavBar">
          <input
            className="theText"
            id="username"
            type="text"
            placeholder="Search.." 
            onChange={this.onChange}
            autoComplete="off"
          />
          <button className="select" onClick={this.handleOnClick}>
           CREATE
          </button>
        </div>

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
export default(Groups);

