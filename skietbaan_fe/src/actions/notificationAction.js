import { FETCH_NOTIFICATION, UPDATE_IS_READ, BASE_URL } from "../actions/types";
import confirmation from "../components/Notification-Img/confirmation.png";
import renewal from "../components/Notification-Img/renewal.png";
import leaderboard from "../components/Notification-Img/leaderboard-unselected.png";
import document from "../components/Notification-Img/document-unselected.png";
import award from "../components/Notification-Img/award-unselected.png";
import announcement from "../components/Notification-Img/announcement-unselected.png";

export const updateIsReadProperty = id => dispatch => {
  fetch(BASE_URL + "/api/Notification/UpdateIsReadProperty/" + id, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(id)
  })
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: UPDATE_IS_READ,
        payload: data
      });
    });
};

export const getNotifications = token => dispatch => {
  fetch(BASE_URL + "/api/Notification/GetNotificationsByUser?token=" + token)
    .then(response => response.json())
    .then(data => {
      const newArray = data.map(notification => {
        notification.markedForDeletion = false;
        if (notification.typeOfNotification === "Confirmation") {
          notification.images = confirmation;
        } else if (notification.typeOfNotification === "Renewal") {
          notification.images = renewal;
        } else if (
          notification.typeOfNotification === "Competition" ||
          notification.typeOfNotification === "Group"
        ) {
          notification.images = leaderboard;
        } else if (notification.typeOfNotification === "Award") {
          notification.images = award;
        } else if (notification.typeOfNotification === "Document") {
          notification.images = document;
        }
        return notification;
      });
      dispatch({
        type: FETCH_NOTIFICATION,
        payload: newArray
      });
    });
};
