import {
	FETCH_POSTS,
	NEW_POST,
	UPDATENAME,
	CREATEGROUP,
	GETGROUP,
	GETNAME,
	URLADD,
	URLUSER,
	URLGROUP
  } from "./types";

  /** The method to feth the already available data for posts*/
  export const fetchPosts = () => dispatch => {
	fetch(URLUSER)
	  .then(res => res.json())
	  .then(posts => {
		const newdata = posts.map(users => {
		  users.highlighted = false;
		  return users;
		});
		dispatch({
		  type: FETCH_POSTS,
		  payload: newdata
		});
	  });
  };
  export const createGroups = usersadded => dispatch => {
	fetch(URLGROUP, {
	  method: "POST",
	  headers: {
		"content-type": "application/json"
	  },
	  body: JSON.stringify(usersadded)
	})
	  .then(res => res.json())
	  .then(post =>
		dispatch({
		  type: CREATEGROUP,
		  payload: post
		})
	  );
  };
  
  {
	/** the method to post new data from the PostForm */
  }
  export const createPost = users => dispatch => {
	fetch(URLADD, {
	  method: "Post",
	  headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	  },
	  body: JSON.stringify(users)
	})
	  .then(function(response) {})
	  .then(function(data) {})
	  .catch(function(data) {});
  };
  
  export const getname = name => {
	//Return an action
	return dispatch => {
	  dispatch({
		type: UPDATENAME,
		payload: name
	  });
	};
  };
  
  export const getGroup = () => dispatch => {
	fetch(URLUSER)
	  .then(res => res.json())
	  .then(posts =>
		dispatch({
		  type: GETGROUP,
		  payload: posts
		})
		);	
  };
/** The method to feth leaderboard filter data (groups array and competitions array*/
	export const fetchleaderboadfilterdata = () => (dispatch) => {
		fetch('https://api.skietbaan.retrotest.co.za/api/Leaderboard/GetLeaderboardFilterData?UserID=' + 1)
				.then(res => res.json())
				.then(data => dispatch({
				type: FETCH_LEADERBOARDFILTER_DATA,
				payload: data
			})
		);
	};
	/** The method to feth leaderboard rank table data ( arrayy of users scores)*/
	export const fetchleaderboadtabledata = (filterSelection) => (dispatch) => {
		fetch('https://api.skietbaan.retrotest.co.za/api/Leaderboard/GetLeaderboardRankings?competitionID=' + filterSelection.selectedCompetition  + '&groupID=' + filterSelection.selectedGroup  + '&userToken=' + filterSelection.userToken)
			.then(res => res.json())
			.then(data =>
			dispatch({
				type: FETCH_LEADERBOARDTABLE_DATA,
				payload: data
			})
		);
	};