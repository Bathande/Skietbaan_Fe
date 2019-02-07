import React, { Component } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import { getUser } from './api/github';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import NavbarMenu from './components/NavbarMenu';
import RegisterMember from './components/RegisterMember';
import Landing from './components/Landing';
class App extends Component {

    componentDidMount () {
        getUser('vnglst').then(data => {
            this.setState({ user: data.entity })
        })
    }

    render () {
        return (
            <div className="App">
                <BrowserRouter>
                <Switch>
                <Route path="/home" component = {Landing} exact/>
                <Route path="/landing" component = {Landing} exact/>
                <Route path="/login" component = {Login} exact/>
                <Route path="/" component = {Login} exact/>
                <Route path="/register" component = {RegisterMember} exact/>
                <Redirect from="/" to="/"/>
                </Switch>
                </BrowserRouter>
            </div>
        )
    }
	componentDidMount() {
		getUser('vnglst').then((data) => {
			this.setState({ user: data.entity });
		});
	}
	render() {
		return (
			<Provider store={store}>
				<div className="App">
				<NavbarMenu/> <hr/>
					<BrowserRouter>
						<Switch>
							<Route path="/home" component={Landing} exact />
							<Route path="/login" component={Login} exact />
							<Route path="/" component={Login} exact />
							<Route path="/register" component={RegisterMember} exact />						
							<Redirect from="/" to="/" />
						</Switch>
					</BrowserRouter>
				</div>
			</Provider>
		);
	}
}
export default App;
