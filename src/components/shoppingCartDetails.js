//libs
import React from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
//ui components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { MdAdd, MdChevronRight } from "react-icons/md";
//app components
import AuthModal from "./auth-components/auth-modals/authModal";
//actions
import {
	updateShippingMethod,
	updateOrderDetails,
	updateOrderTotals,
	setAuthFormToOpen,
	updatePickupLocation,
	updateSpecialInstructions,
	updateOrderDate,
} from "../actions";
//utils
import { calculateTotals } from "../utils/orderCheckoutUtils";
import { history } from "../utils/history";
//css
import "react-datepicker/dist/react-datepicker.css";

class ShoppingCartDetails extends React.Component {
	/**
	 * TODO: Potential refactor
	 * Looks like I'm basically recreating a mini redux form. Might want to just
	 * redux form it.
	 * Also need to componetize this file a little better. Too much logic in one place
	 */
	state = {
		showTextArea:
			this.props.orderDetails.specialInstructions === "" ? false : true,
		validated: false,
		showAuthModal: false,
	};

	handleAuthModalClose = () => {
		this.setState({ showAuthModal: false });
	};

	handleAuthModalOpen = () => {
		if (!this.props.auth.user) {
			this.props.setAuthFormToOpen("signinForm");
			this.setState({ showAuthModal: true });
		} else {
			history.push("/checkout/details");
		}
	};

	handleAuthModalSuccess = () => {
		this.setState({ showAuthModal: false });
		history.push("/checkout/details");
	};

	toggleSpecialInstructionsTextArea = () => {
		if (
			this.props.orderDetails.specialInstructions === "" &&
			this.state.showTextArea
		) {
			this.setState({ showTextArea: false });
		} else if (
			this.props.orderDetails.specialInstructions === "" &&
			!this.state.showTextArea
		) {
			this.setState({ showTextArea: true });
		}
	};

	shippingMethodChanged = (e) => {
		this.props.updateShippingMethod(e.target.value);
		const calculatedAmounts = calculateTotals(
			this.props.orderItems,
			this.props.menuConfig.settings,
			e.target.value
		);
		this.props.updateOrderTotals(calculatedAmounts);
	};

	orderSubmitted = (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();
		if (form.checkValidity() === false) {
			this.setState({ validated: true });
		} else {
			let orderDetails = {
				shippingMethod: this.props.orderDetails.shippingMethod,
				orderDate: this.props.orderDetails.orderDate,
				location: this.props.orderDetails.location,
				specialInstructions: this.props.orderDetails.specialInstructions,
			};
			console.log("State Order Details: ", orderDetails);
			this.props.updateOrderDetails(orderDetails);
			this.handleAuthModalOpen();
		}
	};

	renderOrderButton = () => {
		const { subTotal } = this.props.totals;
		if (subTotal < 130) {
			return (
				<OverlayTrigger
					placement="left"
					overlay={
						<Tooltip>
							Minimum order amount not reached. Go ahead and add a few more
							items
						</Tooltip>
					}
				>
					<span className="block">
						<Button block disabled style={{ pointerEvents: "none" }}>
							Order Now
							<MdChevronRight />
						</Button>
					</span>
				</OverlayTrigger>
			);
		} else {
			return (
				<Button block type="submit">
					Order Now
					<MdChevronRight />
				</Button>
			);
		}
	};

	renderDateTimeSelector = () => {
		return (
			<DatePicker
				selected={this.props.orderDetails.orderDate}
				onChange={(date) => this.props.updateOrderDate(date)}
				timeInputLabel="Time:"
				dateFormat="MM/dd/yyyy h:mm aa"
				showTimeInput
			/>
		);
	};

	renderShippingOptions = () => {
		return (
			<Form.Group>
				<Form.Check
					type="radio"
					value="delivery"
					checked={this.props.orderDetails.shippingMethod === "delivery"}
					label="Delivery"
					onChange={(e) => this.shippingMethodChanged(e)}
				/>
				<Form.Check
					type="radio"
					value="pickup"
					checked={this.props.orderDetails.shippingMethod === "pickup"}
					label="Pick-Up"
					onChange={(e) => this.shippingMethodChanged(e)}
				/>
			</Form.Group>
		);
	};

	renderLocationDropdownOptions = () => {
		return this.props.storeInformation.locations.map((store) => {
			return (
				<option key={store.storeName}>
					{store.storeName}: {store.storeAddress}
				</option>
			);
		});
	};

	/**
	 * TODO: Fix redux in order to only update the correct part of the object
	 */
	renderLocationDropdown = () => {
		return (
			<Form.Group>
				<Form.Label>Choose Location</Form.Label>
				<Form.Control
					required
					custom
					as="select"
					size="sm"
					value={this.props.orderDetails.location}
					onChange={(e) => this.props.updatePickupLocation(e.target.value)}
				>
					<option value=""></option>
					{this.renderLocationDropdownOptions()}
				</Form.Control>
				<Form.Control.Feedback type="invalid">
					Please choose a location.
				</Form.Control.Feedback>
			</Form.Group>
		);
	};

	renderTextAreaPlaceholder = () => {
		return (
			<div
				style={{ cursor: "pointer" }}
				onClick={() => this.toggleSpecialInstructionsTextArea()}
			>
				<MdAdd />
				Special Instructions
			</div>
		);
	};

	renderTextArea = () => {
		return (
			<>
				<Form.Group>
					<Form.Control
						as="textarea"
						rows="3"
						placeholder="Let us know about any special requests you need for this order"
						onBlur={() => this.toggleSpecialInstructionsTextArea()}
						value={this.props.orderDetails.specialInstructions}
						onChange={(e) =>
							this.props.updateSpecialInstructions(e.target.value)
						}
					/>
				</Form.Group>
			</>
		);
	};

	render() {
		const { orderDetails } = this.props;
		//console.log("Order Details: ", this.props.orderDetails);
		return (
			<div>
				<Card>
					<Card.Body>
						<Form
							noValidate
							validated={this.state.validated}
							onSubmit={this.orderSubmitted}
						>
							{this.state.showTextArea
								? this.renderTextArea()
								: this.renderTextAreaPlaceholder()}
							{this.renderShippingOptions()}
							{orderDetails.shippingMethod === "pickup"
								? this.renderLocationDropdown()
								: null}
							{this.renderDateTimeSelector()}
							{this.renderOrderButton()}
						</Form>
					</Card.Body>
					<AuthModal
						show={this.state.showAuthModal}
						close={this.handleAuthModalClose}
						onSuccess={this.handleAuthModalSuccess}
					/>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		storeInformation: state.storeInformation.storeInformation,
		totals: state.order.totals,
		orderDetails: state.order.orderDetails,
		menuConfig: state.menu.menuConfig,
		orderItems: state.order.orderItems,
		auth: state.auth,
	};
};

export default connect(mapStateToProps, {
	updateShippingMethod,
	updateOrderDetails,
	updateOrderTotals,
	setAuthFormToOpen,
	updatePickupLocation,
	updateSpecialInstructions,
	updateOrderDate,
})(ShoppingCartDetails);
