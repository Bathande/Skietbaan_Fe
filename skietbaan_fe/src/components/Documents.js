import React, { Component } from "react";
import "../components/Documents.css";
import { getCookie } from "./cookie.js";
import { Collapse } from "react-collapse";
import { BASE_URL, handleErrors } from "../actions/types.js";
import { connect } from "react-redux";
import { updateUserLOS, updateUserLOGS } from "../actions/notificationAction"

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendLogsReturn: "",
      sendLosReturn: "",
      collapseFilterLOGS: false,
      collapseFilterLOS: false,
      getDataUserLOGS: false,
      getDataUserLOS: false,
      exceptionCaught: false
    };
    this.sendLOGS = this.sendLOGS.bind(this);
    this.sendLOS = this.sendLOS.bind(this);
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    if (!getCookie("token")) {
      window.location = "/registerPage";
    }
    let token = getCookie("token");
    await fetch(BASE_URL + "/api/Documents/UserLOGS/" + token)
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({ sendLogsReturn: data, getDataUserLOGS: true });
        }
        if (this.state.getDataUserLOGS && this.props.userLOGS === false) {
          this.props.updateUserLOGS(true);
        } else {
          this.props.updateUserLOGS(false);
        }
      })
      .catch(err => {
        this.setState({ exceptionCaught: true })
      });

    await fetch(BASE_URL + "/api/Documents/UserLOS/" + token)
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({ sendLosReturn: data, getDataUserLOS: true });
        }
        if (this.state.getDataUserLOS && this.props.userLOS === false) {
          this.props.updateUserLOS(true);
        } else {
          this.props.updateUserLOS(false);
        }
      })
      .catch(err => {
        this.setState({ exceptionCaught: true })
      });
  }

  sendLOGS() {
    let token = getCookie("token");
    fetch(BASE_URL + "/api/Documents/SendLOGS/" + token, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(token)
    })
      .then(handleErrors)
      .catch(err => {
        return Promise.reject();
      });

    if (this.state.collapseFilterLOGS) {
      this.setState({
        collapseFilterLOGS: false
      });
    } else {
      this.setState({
        collapseFilterLOGS: true
      });
    }
  }

  sendLOS() {
    let token = getCookie("token");
    fetch(BASE_URL + "/api/Documents/SendLOS/" + token, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(token)
    })
      .then(handleErrors)
      .catch(err => {
        return Promise.reject();
      });
    if (this.state.collapseFilterLOS) {
      this.setState({
        collapseFilterLOS: false
      });
    } else {
      this.setState({
        collapseFilterLOS: true
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (!getCookie("token")) {
      window.location = "/registerPage";
    }
    return (
      <div className="documents-background ">
        <div className={(this.state.getDataUserLOGS && this.state.getDataUserLOS) === false
          && this.state.exceptionCaught === false
          ? "loader-container-documents" : "hidden"}>
          <div className={(this.state.getDataUserLOGS && this.state.getDataUserLOS) === false
            && this.state.exceptionCaught === false
            ? "loader" : "hidden"}>
          </div>
          <div className={(this.state.getDataUserLOGS && this.state.getDataUserLOS) === false
            && this.state.exceptionCaught === false
            ? "target-loader-image" : "hidden"}>
          </div>
          <div className={(this.state.getDataUserLOGS && this.state.getDataUserLOS) === false
            && this.state.exceptionCaught === false
            ? "loading-message-profile" : "hidden"}>Loading...</div>
        </div>
        <div className={this.state.getDataUserLOGS && this.state.getDataUserLOS ? "documents-center" : "hidden"}>
          <div className="label-select-document">
            {this.state.sendLogsReturn === "Document" &&
              this.state.sendLosReturn === "Document"
              ? "Select Document"
              : "You've got some shooting to do!"}
          </div>

          <div className="button-upload-document-3">
            <button
              className={
                this.state.sendLogsReturn === "Document"
                  ? "Documents-btn-active document-btn-bottom-3"
                  : "documents-btn-default document-btn-bottom-3"
              }
              onClick={
                this.state.sendLogsReturn === "Document" ? this.sendLOGS : null
              }
            >
              LETTER OF GOOD STANDING
            </button>

            {this.state.sendLogsReturn !== "Document" ? (
              <div className="document-requirements3">
                <div>
                  <b>Letter of Good Standing: </b>
                  requires you to pay your membership and participate in atleast
                  one competition
                </div>
              </div>
            ) : (
                <div />
              )}
            <Collapse isOpened={this.state.collapseFilterLOGS}>
              <div className="documents-collapse">
                Document Sent via email
                <img
                  className="document-image-icon"
                  src={require("../components/assets/bulletImage.png")}
                  alt=""
                />
              </div>
            </Collapse>
            <hr className="documents-div-line" />
          </div>
          <div className="button-upload-document-2">
            <button
              className={
                this.state.sendLosReturn === "Document"
                  ? "Documents-btn-active document-btn-bottom-2"
                  : "documents-btn-default document-btn-bottom-2"
              }
              onClick={
                this.state.sendLosReturn === "Document" ? this.sendLOS : null
              }
            >
              LETTER OF DEDICATED STATUS
            </button>

            {this.state.sendLosReturn !== "Document" ? (
              <div className="document-requirements3">
                <div>
                  <b>Letter of Status: </b>
                  {this.state.sendLosReturn}
                </div>
              </div>
            ) : null}

            <Collapse isOpened={this.state.collapseFilterLOS}>
              <div className="documents-collapse">
                Document Sent via email
                <img
                  className="document-image-icon"
                  src={require("../components/assets/bulletImage.png")}
                  alt=""
                />
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userLOGS: state.notificationOBJ.userLOGS,
  userLOS: state.notificationOBJ.userLOS
});

export default connect(mapStateToProps, { updateUserLOGS, updateUserLOS })(Documents);
