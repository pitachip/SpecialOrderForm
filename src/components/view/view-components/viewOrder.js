//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import {
	Card,
	Divider,
	Dimmer,
	Loader,
	Message,
	Container,
} from "semantic-ui-react";
//app components
import ViewOrderHeader from "./viewOrderHeader";
//actions
import { getOrder } from "../../../actions";
//css
import "../view-css/viewOrder.css";

class ViewOrder extends React.Component {
	state = { isLoading: true, didError: false, order: {} };

	componentDidMount = async () => {
		window.scrollTo(0, 0);
		/**TODO
		 * display the order using the same confirmation components you already made
		 */
		try {
			const order = await this.props.getOrder(
				this.props.computedMatch.params.id
			);
			this.setState({ isLoading: false, order: order });
		} catch (error) {
			console.log(error);
			this.setState({ didError: true, isLoading: false });
		}
	};

	renderErrorMessage = () => {
		return (
			<div style={{ height: "100vh" }}>
				<Message negative>
					<Message.Header>Error!</Message.Header>
					<p>You do not have access to view this order.</p>
				</Message>
			</div>
		);
	};

	renderLoader = () => {
		return (
			<div style={{ height: "100vh" }}>
				<Dimmer active inverted>
					<Loader inverted>Retrieving Your Order</Loader>
				</Dimmer>
			</div>
		);
	};

	renderViewOrder = (order) => {
		console.log(order);
		const {
			orderNumber,
			customerInformation,
			deliveryInformation,
			orderDetails,
			orderItems,
			orderTotals,
			paymentInformation,
			pickupInformation,
		} = order;
		return (
			<Container className="viewOrderContainer">
				<Card fluid color="green" centered>
					<Card.Content>
						<Card.Header>
							<ViewOrderHeader
								orderNumber={orderNumber}
								customerEmail={customerInformation.email}
							/>
						</Card.Header>
						<Divider />
					</Card.Content>
				</Card>
			</Container>
		);
	};

	render() {
		const { isLoading, didError, order } = this.state;

		if (isLoading && !didError) {
			return this.renderLoader();
		} else if (!isLoading && didError) {
			return this.renderErrorMessage();
		} else if (!isLoading && !didError) {
			return this.renderViewOrder(order);
		}
	}
}

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, { getOrder })(ViewOrder);
