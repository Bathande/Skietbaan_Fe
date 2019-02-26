import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postActions";
import { createPost } from "../actions/postActions";
import './add.css'

export class createGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: [],
      checked: false,
      userss:[]
    };
    this.submitChange = this.submitChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSave = this.onSave.bind(this);
     this.changeColor = this.changeColor.bind(this);
  }
  static propTypes = {
    prop: PropTypes
  };
  componentWillMount() {
    this.props.fetchPosts();
  }
  onClick(e) {
    if (this.state.isChecked.indexOf(e) >= 0) {
      let index = this.state.isChecked.indexOf(e)
      this.state.isChecked.splice(index, 1);
      
    } else {
      this.state.isChecked.push(e);
      console.log(this.state.isChecked)
    }
  }
  submitChange() {
    if (this.state.check == false) {
      for (let i = 0; i < this.props.data.length; i++) {
        this.state.isChecked.push(this.props.data[i].id);
        this.setState({ check: true });
      }
    } else {
      for (let i = 0; i < this.props.data.length; i++) {
        this.state.isChecked.splice(i, 1);
        this.setState({ check: false });
      }
    }
  }

  onSave() {
    
    for(let i=0;i<this.state.isChecked.length;i++){
      console.log(this.state.userss.push(this.props.data[this.state.isChecked.indexOf(this.state.isChecked[i])]))
      this.state.userss.push(this.props.data[this.state.isChecked[i]]);

    }
    
    const postsitems = {
      users: this.state.userss
    };
    console.log(postsitems)
    this.props.createPost(postsitems);
  }

  changeColor(){
    if(this.state.checked==false){
      this.setState({checked:true})
    }else{
      this.setState({checked:false})
    }
  }
  render() {
   
   
    const postitems = (
      <div class="list-group">
        {this.state.posts.map((post, index)=>(
          <a key={post} href="#" class="list-group-item">Second item</a>
        
        ))
        }
        </div>
      );
    return (
      <div className="Top">
        <div className="top_bar">
          <a href="#" class="fa fa-angle-left" />
          <div className="center_label">
            <b>Users 1</b>
          </div>
        </div>
        <div className="the_middle">
          <input className="theText" type="text" placeholder="Search.." />
          <button className="select" onClick={this.changeColor}>
            {" "}
            Select all
          </button>
          <div className="nextpage">
            <button  className="circles" onClick={this.onSave}>NEXT</button>
          </div>
        </div>
        <div className="theList">{postitems}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.groupData.allItems,
  groupName: state.groupData.groupName
});

export default connect(
  mapStateToProps,
  { fetchPosts, createPost }
)(createGroup);
