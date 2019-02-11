import React, { Component } from "react";
import { Table, Jumbotron } from "react-bootstrap";
import '../components/ListStyle.css'
class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts :[]
    }
  }
  componentWillMount() {
    fetch('http://skietbaan.retrotest.co.za/api/User')
    .then(res => res.json())
    .then(data =>this.setState({posts : data}));
  }
  render() {
    const postItems = (
      <Table striped hover condensed>
        <thead>
         <tr>
          <td><b>USER_ID</b></td>
          <td><b>USERNAME</b></td>
          <td><b>SCORES</b></td>
          </tr>
        </thead>
        <tbody>
          {this.state.posts.map(post => (
            <tr key={post.id.toString()}>
            <td><h5>{post.id}</h5></td>
              <td><h5>{post.username}</h5></td>
              <td>{post.scores}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
    return (
      <div main className="scrollbar" data-simplebar data-simplebar-auto-hide="false">
      <div>
					<Jumbotron>
						<h1>
							<b>SkietBaan App</b>
						</h1>
						<p>
							This is a simple hero unit, a simple jumbotron-style component for calling extra attention
							to featured content or information.
						</p>
					</Jumbotron>
				</div>
        {postItems}
      </div>
    );
  }
}
export default List;
