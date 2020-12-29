//libs
import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { auth } from "./apis/firebase";
//utils
import { history } from "./utils/history";
//app components
import NavBar from "./components/navBar";
import PrivateRoute from "./utils/privateRoute";
import AppFooter from "./components/appFooter";
import SpecialOrder from "./components/SpecialOrder";
import CheckoutContact from "./components/checkout-components/checkoutContact";
import CheckoutPayment from "./components/checkout-components/checkoutPayment";
import ConfirmationDetails from "./components/checkout-components/checkoutConfirmation";
import MyOrders from "./components/orderHistory/orderHistory-components/myOrders";
//css
import "./App.css";
import "semantic-ui-css/semantic.min.css";

class App extends React.Component {
	state = {
		isAuthenticated: false,
		isLoading: true,
	};
	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({ isLoading: false, isAuthenticated: true });
			} else {
				this.setState({ isLoading: false, isAuthenticated: false });
			}
		});
	}
	render() {
		return (
			<div>
				<Router history={history}>
					<NavBar />
					<Switch>
						<Route path="/order" exact component={SpecialOrder} />
						<Route path="/checkout/details" exact component={CheckoutContact} />
						<Route path="/checkout/payment" exact component={CheckoutPayment} />
						<Route
							path="/checkout/confirmation"
							exact
							component={ConfirmationDetails}
						/>
						<PrivateRoute
							component={MyOrders}
							path="/myorders"
							exact
							isLoading={this.state.isLoading}
							isAuthenticated={this.state.isAuthenticated}
						/>
						<Redirect path="/" exact to="/order" />
					</Switch>
				</Router>
				<AppFooter />
			</div>
		);
	}
}

export default App;
