//libs
import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
//utils
import { history } from "./utils/history";
//app components
import NavBar from "./components/navBar";
import SpecialOrder from "./components/SpecialOrder";
import CustomerInformationForm from "./components/checkout-components/customerInformationForm";
//css
import "./App.css";

function App() {
	return (
		<div>
			<NavBar />
			<Router history={history}>
				<Switch>
					<Route path="/order" exact component={SpecialOrder} />
					<Route
						path="/checkout/details"
						exact
						component={CustomerInformationForm}
					/>
					<Redirect path="/" exact to="/order" />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
