import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';

class Posts extends Component {
/** *Here is a constructor for the Post component, this format of a constructor should reflect on the
 * List aka Learder board as well
*/
  constructor(props){
    super(props);
    this.state = {
      posts :[]
    }

  componentWillMount() {
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  }
  //the method to render the post data from the Fetch() method 
  render() {
    const postItems = this.props.posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));

    return (
      <div>
        {/*<h1>This is the Posts Page</h1> */}
        <Jumbotron>
						<h1>
							<b>SkietBaan App</b>
						</h1>
						<p>
						  <b>	This is a simple hero unit, a simple jumbotron-style component for calling extra attention
							to featured content or information.
              </b>
						</p>
					</Jumbotron>
        {postItems}
      </div>
    )
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item
});

export default connect(mapStateToProps, { fetchPosts })(Posts);

