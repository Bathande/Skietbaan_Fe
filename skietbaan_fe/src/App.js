

import React, { Component } from 'react'
import './App.scss';
import {Provider} from 'react-redux';
import store from './store';
import { getUser } from './api/github'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from "./components/Home"
import About from "./components/About"
import Welcome from "./components/Welcome"
import Login from "./components/Login"
import Register from "./components/Register"
//import axios from 'axios';
 
class App extends Component {
//     constructor (props) {
//         super(props)
//         this.state = { user: {} }
//     }
//     simpleAction = (event) => {
//         this.props.simpleAction();
//     }

//     handleClick() {
//         axios.get('https://localhost:44333/api/User/2',{

    //handleClick() {
        //axios.get('http://skietbaan.retrotest.co.za/api/values/',{

            
//         method: 'GET',
        
//     }).then(response => console.log(response.data))
// }

    componentDidMount () {
        getUser('vnglst').then(data => {
            this.setState({ user: data.entity })
        })
    }

    render () {
        return (
            <Provider store = {store}>
            <div className="App">

                {/* <button onClick={this.simpleAction}>Test redux action</button>
                <button onClick={this.handleClick}>Endpoint Test</button>
                <pre>
                    {
                    JSON.stringify(this.props)
                    }
                </pre> */}
                <BrowserRouter>
                <Switch>
                <Route path="/home" component = {landing} exact/>
                <Route path="/login" component = {Login} exact/>
                <Route path="/" component = {Login} exact/>
                <Route path="/register" component = {Register} exact/>
                <Route path="/about" component = {About} exact />
                <Route path="/welcome" component = {Welcome} exact/>
                <Redirect from="/" to="/"/>
                </Switch>
                </BrowserRouter>
            </div>
            </Provider>
        )
    }
}
export default App;
