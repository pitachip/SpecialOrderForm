//libs
import React from "react";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
//ui components
import {
	Card,
	Divider,
	Dimmer,
	Loader,
	Message,
	Container,
	Grid,
	Button,
} from "semantic-ui-react";
//app components
import ViewOrderHeader from "./viewOrderHeader";
import ViewPickupDetails from "./viewPickupDetails";
import ViewDeliveryDetails from "./viewDeliveryDetails";
import ViewOrderDetails from "./viewOrderDetails";
import ViewOrderTotals from "./viewOrderTotals";
import ViewPaymentDetails from "./viewPaymentDetails";
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

		const pageStyle = `{
			@media print {
				body {margin-top: 50mm; margin-bottom: 50mm; 
					  margin-left: 0mm; margin-right: 0mm}
		   }
		   @media screen {
			body {margin-top: 50mm; margin-bottom: 50mm; 
				  margin-left: 0mm; margin-right: 0mm}
	   }
		}`;

		return (
			<Container className="viewOrderContainer">
				<Grid columns={2}>
					<Grid.Column width={14}>
						<Card fluid color="green" ref={(el) => (this.componentRef = el)}>
							<Card.Content>
								<Card.Header>
									<ViewOrderHeader
										orderNumber={orderNumber}
										customerEmail={customerInformation.email}
									/>
								</Card.Header>
								<Divider />
								{orderDetails.shippingMethod === "delivery" ? (
									<ViewDeliveryDetails
										deliveryInformation={deliveryInformation}
										orderDate={orderDetails.orderDate}
										customerInformation={customerInformation}
									/>
								) : (
									<ViewPickupDetails
										pickupInformation={pickupInformation}
										orderDetails={orderDetails}
										customerInformation={customerInformation}
									/>
								)}
								<Divider />
								<ViewOrderDetails
									orderItems={orderItems}
									specialInstructions={orderDetails.specialInstructions}
								/>
								<ViewOrderTotals orderTotals={orderTotals} />
								<Divider />
								<ViewPaymentDetails paymentInformation={paymentInformation} />
							</Card.Content>
						</Card>
					</Grid.Column>
					<Grid.Column width={2}>
						<ReactToPrint
							trigger={() => <Button compact>Print Order</Button>}
							content={() => this.componentRef}
							pageStyle={pageStyle}
						/>
					</Grid.Column>
				</Grid>
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
export default connect(null, { getOrder })(ViewOrder);
