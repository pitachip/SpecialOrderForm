//libs
import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "./apis/firebase";
import {
	HeaderSubheader,
	Embed,
	Dimmer,
	Header,
	Icon,
} from "semantic-ui-react";
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
import Account from "./components/account/account-components/account";
import ViewOrder from "./components/view/view-components/viewOrder";
import withModifyOrder from "./hoc/withModifyOrder";
import withNewOrder from "./hoc/withNewOrder";
//actions
import {
	getStoreInformation,
	getMenuConfig,
	authStateChanged,
} from "./actions";
//css
import "./App.css";
import "semantic-ui-css/semantic.min.css";

class App extends React.Component {
	state = {
		isAuthenticated: false,
		isLoading: true,
	};
	async componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({ isLoading: false, isAuthenticated: true });
				this.props.authStateChanged(user, false);
			} else {
				this.setState({ isLoading: false, isAuthenticated: false });
				this.props.authStateChanged(null, false);
			}
		});
		await this.props.getStoreInformation();
		await this.props.getMenuConfig();
	}
	render() {
		return (
			<div className="appContainer">
				{/**
				 * 				<Dimmer active page>
					<Header as="h2" icon inverted>
						<Icon name="heart" />
						Dimmed Message!
						<HeaderSubheader>Dimmer sub-header</HeaderSubheader>
						<a href="https://www.google.com" target="new">
							Link
						</a>
					</Header>
					<Embed
						id="O6Xo21L0ybE"
						placeholder="/images/image-16by9.png"
						source="youtube"
					/>
				</Dimmer>
				 *
				 */}
				<Router history={history}>
					<NavBar />
					<Switch>
						{/**Order Route*/}
						<Route path="/order" exact component={withNewOrder(SpecialOrder)} />
						<Route path="/checkout/details" component={CheckoutContact} />
						<Route path="/checkout/payment" exact component={CheckoutPayment} />
						<Route
							path="/checkout/confirmation"
							exact
							component={ConfirmationDetails}
						/>
						{/**Account Route*/}
						<PrivateRoute
							component={Account}
							path="/account"
							exact
							isLoading={this.state.isLoading}
							isAuthenticated={this.state.isAuthenticated}
						/>
						<PrivateRoute
							component={Account}
							path="/account/details"
							exact
							isLoading={this.state.isLoading}
							isAuthenticated={this.state.isAuthenticated}
						/>
						<PrivateRoute
							component={Account}
							path="/account/orders"
							exact
							isLoading={this.state.isLoading}
							isAuthenticated={this.state.isAuthenticated}
						/>
						{/**View Route*/}
						<PrivateRoute
							component={ViewOrder}
							path="/view/:id"
							isLoading={this.state.isLoading}
							isAuthenticated={this.state.isAuthenticated}
						/>
						{/**Modify Routes*/}
						<PrivateRoute
							component={ConfirmationDetails}
							path="/modify/:id/checkout/confirmation"
							isLoading={this.state.isLoading}
							isAuthenticated={this.state.isAuthenticated}
						/>
						<PrivateRoute
							component={CheckoutPayment}
							path="/modify/:id/checkout/payment"
							isLoading={this.state.isLoading}
							isAuthenticated={this.state.isAuthenticated}
						/>
						<PrivateRoute
							component={CheckoutContact}
							path="/modify/:id/checkout/details"
							isLoading={this.state.isLoading}
							isAuthenticated={this.state.isAuthenticated}
						/>
						<PrivateRoute
							component={withModifyOrder(SpecialOrder)}
							path="/modify/:id"
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

export default connect(null, {
	getStoreInformation,
	getMenuConfig,
	authStateChanged,
})(App);
