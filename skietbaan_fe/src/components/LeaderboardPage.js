import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchleaderboadfilterdata } from '../actions/postActions';
import { fetchleaderboadtabledata } from '../actions/postActions';
import { updateSelectedCompetition } from '../actions/postActions';
import { updateSelectedGroup } from '../actions/postActions';
import { Collapse } from 'react-collapse';
import { Table } from "react-bootstrap";
import { getCookie } from './cookie.js'
import { MDBBtn} from "mdbreact";
import '../bootstrap/LeaderboardStyle.css';

class LeaderboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            individual: "Individual Ranking",
            selectedGroup: -1,
            selectedCompetition: 1,
            selectedScoreType: 1,
            selectedRank: null,
            collapseFilter: false,
            listType: 'competitions',
            height: window.innerHeight, 
            width: window.innerWidth,
            ranktableHeight: 500
        }
        this.setCompetitionValue = this.setCompetitionValue.bind(this);
        this.setGroupValue = this.setGroupValue.bind(this);
        this.setScoreTypeValue = this.setScoreTypeValue.bind(this);
        this.onMouseClickFilter = this.onMouseClickFilter.bind(this);
        this.getCurentUserRankNumber = this.getCurentUserRankNumber.bind(this);
        this.top3Display = this.top3Display.bind(this);
        this.closeMain = this.closeMain.bind(this);
        this.displaySelectedGroup = this.displaySelectedGroup.bind(this);
        this.setListType = this.setListType.bind(this);
        this.displayList = this.displayList.bind(this);
        this.validatedInitialLeaderboardFilterSelection = this.validatedInitialLeaderboardFilterSelection.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.checkFilterMobile = this.checkFilterMobile.bind(this);
    }
    componentDidMount() {
        // Additionally I could have just used an arrow function for the binding `this` to the component...
        window.addEventListener("resize", this.updateDimensions);
      }
    //executed when leaderboard in mounted on main app
    componentWillMount() {
        this.updateDimensions();
        //get function to get filter data from api
        this.props.fetchleaderboadfilterdata();
        this.validatedInitialLeaderboardFilterSelection();
        this.getLeaderboardData(this.state.selectedCompetition, this.state.selectedGroup);
    }
    updateDimensions() {
        this.setState({
          height: window.innerHeight, 
          width: window.innerWidth,
          ranktableHeightMobile: (this.state.height - 236),
          ranktableHeightDesktop: (this.state.height - (193 + 0))
        });
      }
    getLeaderboardData = (competition, group) => {
        let token = getCookie("token");
        var CompNum = competition + 1;
        var GroupNum = group;
        if (group != -1) {
            GroupNum = group + 1;
        }
        const filterSelection = {
            selectedCompetition: CompNum,
            selectedGroup: GroupNum,
            selectedScoreType: this.state.selectedScoreType,
            userToken: token
        }
        this.props.fetchleaderboadtabledata(filterSelection);
    }
    checkFilterMobile(){
        if(this.state.width<575 && this.state.collapseFilter == false){
            return true;
        }else if(this.state.width>575){
            return true;
        }else{
            return false;
        }
    }
    validatedInitialLeaderboardFilterSelection() {
        if (this.props.selectedCompetitionName != undefined && this.props.selectedGroupName != undefined) {
            if (this.props.selectedCompetitionName.length > 0) {
                for (var i = 0; i < this.props.competitions.length; i++) {
                    if (this.props.competitions[i] == this.props.selectedCompetitionName) {
                        this.setState({
                            selectedCompetition: i
                        });
                    }
                }
            }

            if (this.props.selectedGroupName.length > 0) {
                for (var i = 0; i < this.props.groups.length; i++) {
                    if (this.props.groups[i] == this.props.selectedGroupName) {
                        this.setState({
                            selectedGroup: i
                        });
                    }
                }
            }
        }
    }

    setCompetitionValue = (value) => {
        this.setState({
            selectedCompetition: value
        });
        this.props.updateSelectedCompetition(this.props.competitions[value].label)
        this.validatedInitialLeaderboardFilterSelection();
        this.getLeaderboardData(value, this.state.selectedGroup);
    }
    setGroupValue = (value) => {
        this.setState({
            selectedGroup: value
        });
        if (value == -1) {
            this.props.updateSelectedGroup(this.state.individual);
        } else {
            this.props.updateSelectedGroup(this.props.groups[value].label);
        }
        this.validatedInitialLeaderboardFilterSelection();
        this.getLeaderboardData(this.state.selectedCompetition, value);
    }
    setScoreTypeValue = (value) => {
        this.setState({
            selectedScoreType: value
        });
    }
    getCurentUserRankNumber(rankingList) {
        if (rankingList != undefined) {
            for (var i = 0; i < rankingList.length; i++) {
                if (rankingList[i].username === this.props.userResults.username) {
                    return rankingList[i].rank;
                }
            }
            return null;
        } else {
            return null;
        }
    }
    onMouseClickFilter() {
        if (this.state.collapseFilter) {
            this.setState({
                collapseFilter: false
            });
        } else {
            this.setState({
                collapseFilter: true
            });
        }
    }
    closeMain(isopen) {
        if (isopen === true) {
            return false;
        } else {
            return true;
        }
    }
    displaySelectedGroup(value) {
        if (value == -1) {
            return this.state.individual;
        } else {
            if (this.props.competitions.length > 0) {
                return this.props.groups[this.state.selectedGroup].label;
            } else {
                return null;
            }
        }
    }
    setListType(type) {
        if (type === "competitions") {
            this.setState({
                listType: "competitions"
            })
        } else if (type === "groups") {
            this.setState({
                listType: "groups"
            })
        }
    }
    displayList(competitionsList, groupsList) {
        if (this.state.listType === "competitions") {
            return competitionsList;
        } else if (this.state.listType === "groups") {
            return groupsList;
        }
    }
    top3Display(object) {
        if (object != null) {
            if (object.rank == 1) {
                return <div className="rank-number-container">
                    <table className="rank-num-table">
                        <tbody>
                            <tr className="up-arrow">

                            </tr>
                            <tr className="icon">
                                <td className="firstCol">
                                    <img src={require('../resources/rank1.png')} />
                                </td>
                            </tr>
                            <tr className="down-arrow">

                            </tr>
                        </tbody>
                    </table>
                </div>;
            } else if (object.rank == 2) {
                return <div className="rank-number-container">
                    <table className="rank-num-table">
                        <tbody>
                            <tr className="up-arrow">

                            </tr>
                            <tr className="icon">
                                <td className="firstCol">
                                    <img src={require('../resources/rank2.png')} />
                                </td>
                            </tr>
                            <tr className="down-arrow">

                            </tr>
                        </tbody>
                    </table>
                </div>;
            } else if (object.rank == 3) {
                return <div className="rank-number-container">
                    <table className="rank-num-table">
                        <tbody>
                            <tr className="up-arrow">

                            </tr>
                            <tr className="icon">
                                <td className="firstCol">
                                    <img src={require('../resources/rank3.png')} />
                                </td>
                            </tr>
                            <tr className="down-arrow">

                            </tr>
                        </tbody>
                    </table>
                </div>;
            } else {
                return <div className="rank-number-container">
                    <table className="rank-num-table">
                        <tbody>
                            <tr className="up-arrow">
                                <td></td>
                            </tr>
                            <tr className="icon">
                                <td className="firstCol">
                                    {object.rank != 0 ? object.rank : '--'}
                                </td>
                            </tr>
                            <tr className="down-arrow">
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                </div>;
            }
        } else {
            return null;
        }
    }
    render() {
        
        if (!getCookie("token")) {
            window.location = "/registerPage";
        }
        const groupsList = (
            <Table className="selection-table" >
                <tbody>
                    {this.props.groups.map((group, index) => (
                        <tr key={group.value.toString()} onClick={() => this.setGroupValue(index)}
                            value={group.value}>
                            <td className={this.state.selectedGroup == index ? "td-active" : "td-inactive"}>{group.label}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
        const competitionsList = (
            <Table className="selection-table" >
                <tbody>
                    {this.props.competitions.map((competition, index) => (
                        <tr key={competition.value.toString()} onClick={() => this.setCompetitionValue(index)}
                            value={competition.value}>
                            <td className={this.state.selectedCompetition == (competition.value - 1) ? "td-active" : "td-inactive"}>{competition.label}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
        const tablebody = this.props.tableData.map((post, index) => (
            <tr className="rank-row" key={index.toString()} value={index} onChange={() => this.onChange(post.id)}>
                <td className="rank-icon-col">
                    {this.top3Display(post)}
                </td>
                <td className="rank-labels-col">
                    <table className="head-table-labels">
                        <tbody>
                            <tr>
                                <td className="extra-name-col">{post.username}</td>
                                <td className="score-col-total">{post.total != 0 ? post.total : '--'}</td>
                                <td className="score-col-average">{post.average != 0 ? post.average : '--'}</td>
                                <td className="score-col-best">{post.best != 0 ? post.best : '--'}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>

        ));
        return (
            /* Leaderboard Page Main Container */
            <div className="leaderboard-container">
                <div className="row justify-content-center">
                    <div className="col-sm-8 text-left">
                        <div className="closed-filter-section">
                            <table className="filter-table1">
                                <tbody>
                                    <tr className="header-row1">
                                        <td className="competition-name-col">
                                            {this.props.competitions.length != 0 ? this.props.competitions[this.state.selectedCompetition].label : "-------"}
                                        </td>
                                        <td className="filter-icon-col">
                                            <div className="filter-icon">
                                                <MDBBtn tag="a" size="lg" floating gradient="purple"
                                                    onClick={this.onMouseClickFilter} >
                                                    <img src={require('../resources/filter.png')} />
                                                </MDBBtn>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Collapse isOpened={this.state.collapseFilter}>
                            <div className="filter-selections">
                                <div className="category-selection">
                                    <div className={this.state.listType == "competitions" ? "choose-comps-active" : "choose-comps"}  >
                                        <MDBBtn tag="a" size="lg" floating gradient="purple"
                                            onClick={() => this.setListType("competitions")} >
                                            Competitions
                                            </MDBBtn>
                                    </div>
                                    <div className={this.state.listType == "groups" ? "choose-groups-active" : "choose-groups"}>
                                        <MDBBtn tag="a" size="lg" floating gradient="purple"
                                            onClick={() => this.setListType("groups")} >
                                            Rankings by
                                            </MDBBtn>
                                    </div>
                                </div>
                                <div className="cat-visible-label">
                                    {this.state.listType == "competitions" ? "Select Competition" : "Select Ranking"}
                                </div>
                                <div className={this.state.listType == "competitions" ? "hide-my-div" : (this.state.selectedGroup == -1 ? "individual-active" : "individual-inactive")}>
                                    <MDBBtn tag="a" size="lg" floating gradient="purple"
                                        onClick={() => this.setGroupValue(-1)} >
                                        Overall ranking
                                        </MDBBtn>
                                </div>
                                <div className={this.state.listType == "groups" ? "cat-visible-groups-label" : "hide-my-div"}>
                                    Groups
                                   </div>
                                <div className="selections-container">
                                    <div className="row justify-content-center">
                                        <div className="choose">
                                            {this.state.listType == "competitions" ? competitionsList : groupsList}
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="closefilter">
                                               <MDBBtn tag="a" size="lg" floating gradient="purple"
                                                    onClick={this.onMouseClickFilter} >
                                                    <img src={require('../resources/closefilter.png')} />
                                                </MDBBtn>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                        <Collapse isOpened={this.checkFilterMobile()}>
                        <table className="ranking-table-head">
                                <tr className="header-row2">
                                    <td className="col-empty"></td>
                                    <td colSpan="2" className="grouping-label-col">
                                        {this.state.selectedGroup == -1 ? "Overall rank" : (this.props.groups.length != 0 ? this.props.groups[this.state.selectedGroup].label : "-------")}
                                    </td>
                                    <td colSpan="1" className="total-label-col">
                                        Total
                                        </td>
                                    <td colSpan="1" className="average-label-col">
                                        Average
                                        </td>
                                    <td colSpan="1" className="best-label-col">
                                        Best
                                       </td>
                                </tr>
                        </table>
                        <div className="ranking-table-section" style={{height: this.state.ranktableHeightMobile+"px"}}>
                            <table className="ranking-table" >
                                <tbody>
                                    {tablebody}
                                </tbody>
                            </table>
                        </div>
                        </Collapse>
                    </div>
                </div>
                {/* Current User Section*/}
                 <div className="userWrapper" >
                 <Collapse isOpened={this.checkFilterMobile()}>
                    <div className="row justify-content-center">
                        <div className="col-sm-8 text-left">
                            <div className="current-user-table-section">
                                <table className="ranking-table">
                                    <tbody>
                                        <tr className="rank-row">
                                            <td className="rank-icon-col">
                                                {this.top3Display(this.props.userResults)}
                                            </td>
                                            <td className="rank-labels-col">
                                                <table className="head-table-labels">
                                                    <tbody>
                                                        <tr>
                                                            <td className="extra-name-col">{this.props.userResults == null ? 'Something went wrong' : (this.props.userResults != null ? this.props.userResults.username : '--')}</td>
                                                            <td className="score-col-total">{this.props.userResults == null ? '--' : (this.props.userResults.total != 0 ? this.props.userResults.total : '--')}</td>
                                                            <td className="score-col-average">{this.props.userResults == null ? '--' : (this.props.userResults.average != 0 ? this.props.userResults.average : '--')}</td>
                                                            <td className="score-col-best">{this.props.userResults == null ? '--' : (this.props.userResults.best != 0 ? this.props.userResults.best : '--')}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    </Collapse>
                </div> 

            </div>
        );
    }
}
const mapStateToProps = state => ({
    groups: state.posts.leaderboardGroups,
    competitions: state.posts.leaderboardCompetitions,
    scoreTypes: state.posts.leaderboardScoreTypes,
    userResults: state.posts.leaderboardUserData,
    tableData: state.posts.leaderboardTableData,
    selectedGroupName: state.posts.leaderboardSelectedGroupName,
    selectedCompetitionName: state.posts.leaderboardSelectedCompetitionName,
    selectedScoreType: state.posts.leaderboardSelectedScoreType
});
export default connect(mapStateToProps, { fetchleaderboadfilterdata, fetchleaderboadtabledata, updateSelectedCompetition, updateSelectedGroup })(LeaderboardPage);

