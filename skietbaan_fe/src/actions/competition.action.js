import {
  NEW_COMP,
  FETCH_COMP,
  UPDATE_COMP_STATUS,
  PARTICIPANTS_PER_COMP,
  BASE_URL,
  FETCH_REQ,
  UPDATE_REQ
} from "./types";
//fetch the array of competitions
export const fetchComp = () => dispatch => {
  fetch(BASE_URL + "/api/Competition/all")
    .then(res => res.json())
    .then(compData => {
      dispatch({
        type: FETCH_COMP,
        payload: compData
      });
    }).catch(err =>  {
      /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
    });
};
//fetch the competition requiremets as per Competition ID
export const fetchRequirements = CompID => dispatch => {
  let obj = {
    id: "",
    competition: null,
    standard: "",
    accuracy: "",
    total: ""
  };
  fetch(BASE_URL + "/R/" + CompID)
    .then(response => response.json())
    .then(requirementsData => {
      dispatch({
        type: FETCH_REQ,
        payload: requirementsData
      });
    }).catch(err =>  {
      /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
    });
};
export const updateRequirements = (compID, rData) => dispatch => {
  fetch(BASE_URL + "/Requirements/" + compID, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(rData)
  })
    .then(res => {
      res.json();
    })
    .then(ReqData => {
      dispatch({
        type: UPDATE_REQ,
        payload: ReqData
      });
    }).catch(err =>  {
      /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
    });
};

/** A method to update an existing competition and posts comps data to the designated BASE_URL /api/competition/{Id}*/
export const updateByIdComp = (compData, Id) => dispatch => {
  fetch(BASE_URL + "/api/Competition/" + Id, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(compData)
  })
    .then(res => {
      res.json();
    })
    .then(comp => {
      dispatch({
        type: UPDATE_COMP_STATUS,
        payload: comp
      });
    }).catch(err =>  {
      /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
    });
};
//fetch participants
export const fetchParticipants = () => dispatch => {
  fetch(BASE_URL + "/api/Competition/participants")
    .then(res => res.json())
    .then(participantsData => {
      dispatch({
        type: PARTICIPANTS_PER_COMP,
        payload: participantsData
      });
    }).catch(err =>  {
      /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
    });
};
//creating a single competition
export const createComp = compData => dispatch => {
  fetch(BASE_URL + "/api/Competition", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(compData)
  }).then(res => {
    if (res.ok) {
      res.json().then(() =>
        dispatch({
          type: NEW_COMP,
          payload: false
        })
      );
    } else {
      res.json().then(() => {
        dispatch({
          type: NEW_COMP,
          payload: true
        });
      });
    }
  }).catch(err =>  {
    /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
  });
};
