import React, { Component } from "react";
import "../components/Documents.css";
import { getCookie } from "./cookie.js";
import { Collapse } from "react-collapse";
import { BASE_URL } from "../actions/types.js";

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendLogsReturn: "",
      sendLosReturn: "",
      collapseFilterLOGS: false,
      collapseFilterLOS: false
    };
    this.sendLOGS = this.sendLOGS.bind(this);
    this.sendLOS = this.sendLOS.bind(this);
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    if (!getCookie("token")) {
      window.location = "/registerPage";
    }
    let token = getCookie("token");
    fetch(BASE_URL + "/api/Documents/UserLOGS/" + token)
      .then(res => res.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({ sendLogsReturn: data });
        }
      });

    fetch(BASE_URL + "/api/Documents/UserLOS/" + token)
      .then(res => res.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({ sendLosReturn: data });
        }
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
    console.log(this.state.sendLogsReturn && this.state.sendLosReturn);
    if (!getCookie("token")) {
      window.location = "/registerPage";
    }
    return (
      <div className="documents_background ">
        <div className="documents-center">
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
              Letter of Good Standing
              {this.state.sendLogsReturn !== "Document" ? (
                <img
                  className="document-image-icon"
                  src={require("../resources/noDoc.png")}
                  alt=""
                />
              ) : null}
            </button>

            <div className="document-requirements3">
              {this.state.sendLogsReturn !== "Document" ? (
                <div>
                  <b>Letter of Good Standing:</b>
                  <p>
                    requires you to pay your membership and participate in
                    atleast one competition
                  </p>
                </div>
              ) : null}
            </div>
            <Collapse isOpened={this.state.collapseFilterLOGS}>
              <div className="documents-collapse">
                Document Sent via email
                <img
                  className="document-image-icon"
                  src={require("../resources/sendDoc.png")}
                  alt=""
                />
              </div>
            </Collapse>
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
              Letter of Status{" "}
              {this.state.sendLosReturn !== "Document" ? (
                <img
                  className="document-image-icon"
                  src={require("../resources/noDoc.png")}
                  alt=""
                />
              ) : null}
            </button>

            <div className="document-requirements3">
              {this.state.sendLosReturn !== "Document" ? (
                <div>
                  <b>Letter of Status:</b>
                  <p>{this.state.sendLosReturn}</p>
                </div>
              ) : null}
            </div>

            <Collapse isOpened={this.state.collapseFilterLOS}>
              <div className="documents-collapse">
                Document Sent via email
                <img
                  className="document-image-icon"
                  src={require("../resources/sendDoc.png")}
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

export default Documents;
