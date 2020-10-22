//libs
import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
//utils
import { history } from "./utils/history";
//app components
import NavBar from "./components/navBar";
import SpecialOrder from "./components/SpecialOrder";
import CheckoutContact from "./components/checkout-components/checkoutContact";
import CheckoutPayment from "./components/checkout-components/checkoutPayment";
import ConfirmationDetails from "./components/checkout-components/checkoutConfirmation";
//css
import "./App.css";

function App() {
	return (
		<div>
			<NavBar />
			<Router history={history}>
				<Switch>
					<Route path="/order" exact component={SpecialOrder} />
					<Route path="/checkout/details" exact component={CheckoutContact} />
					<Route path="/checkout/payment" exact component={CheckoutPayment} />
					<Route
						path="/checkout/confirmation"
						exact
						component={ConfirmationDetails}
					/>
					<Redirect path="/" exact to="/order" />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
