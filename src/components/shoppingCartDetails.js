//libs
import React from "react";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";
import DatePicker from "react-datepicker";
//ui components
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
	setSpecialInstructionsToggle,
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
			history.push(`${this.props.navigation.rootUrl}checkout/details`);
		}
	};

	handleAuthModalSuccess = () => {
		this.setState({ showAuthModal: false });
		history.push(`${this.props.navigation.rootUrl}checkout/details`);
	};

	toggleSpecialInstructionsTextArea = () => {
		//TODO refactor this to use redux
		const {
			setSpecialInstructionsToggle,
			orderDetails,
			showSpecialInstructionsTextArea,
		} = this.props;
		if (
			orderDetails.specialInstructions === "" &&
			showSpecialInstructionsTextArea
		) {
			//this.setState({ showTextArea: false });
			setSpecialInstructionsToggle(false);
		} else if (
			orderDetails.specialInstructions === "" &&
			!showSpecialInstructionsTextArea
		) {
			//this.setState({ showTextArea: true });
			setSpecialInstructionsToggle(true);
		}
	};

	shippingMethodChanged = (e) => {
		this.props.updateShippingMethod(e.target.value);
		const calculatedAmounts = calculateTotals(
			this.props.orderItems,
			this.props.menuConfig.settings,
			e.target.value,
			this.props.paymentInformation,
			this.props.totals.tip
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
				pickupInformation: this.props.orderDetails.pickupInformation,
				specialInstructions: this.props.orderDetails.specialInstructions,
			};
			this.props.updateOrderDetails(orderDetails);
			this.handleAuthModalOpen();
		}
	};

	renderOrderButton = () => {
		const { subTotal } = this.props.totals;
		const { minimumOrderAmount } = this.props.menuConfig.settings;
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
							Minimum Order Amount: ${minimumOrderAmount}
							<MdChevronRight />
						</Button>
					</span>
				</OverlayTrigger>
			);
		} else {
			return (
				<Button block type="submit">
					Proceed to Checkout
					<MdChevronRight />
				</Button>
			);
		}
	};

	renderDateTimeSelector = () => {
		const { shippingMethod } = this.props.orderDetails;
		return (
			<div>
				<Form.Label>
					Choose {shippingMethod === "delivery" ? "Delivery" : "Pick-Up"} Date &
					Time:
				</Form.Label>
				<br />
				<DatePicker
					selected={new Date(this.props.orderDetails.orderDate)}
					onChange={(date) => this.props.updateOrderDate(date)}
					dateFormat="MM/dd/yyyy h:mm aa"
					showTimeSelect
					showDisabledMonthNavigation
					popperPlacement="top-left"
					minDate={new Date()}
					timeIntervals={15}
					className="form-control"
				/>
			</div>
		);
	};

	renderShippingOptions = () => {
		return (
			<Form.Group>
				<Form.Label>Choose Delivery Method:</Form.Label>
				<Form.Check
					type="radio"
					value="delivery"
					checked={this.props.orderDetails.shippingMethod === "delivery"}
					label="Delivery"
					id="shippingOptionDelivery"
					onChange={(e) => this.shippingMethodChanged(e)}
				/>
				<Form.Check
					type="radio"
					value="pickup"
					checked={this.props.orderDetails.shippingMethod === "pickup"}
					label="Pick-Up"
					id="shippingOptionPickup"
					onChange={(e) => this.shippingMethodChanged(e)}
				/>
			</Form.Group>
		);
	};

	renderLocationDropdownOptions = () => {
		return this.props.storeInformation.locations.map((store) => {
			return (
				<option key={store.storeName} value={store.storeName}>
					{store.storeName}: {store.storeAddress}
				</option>
			);
		});
	};

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
					onChange={(e) =>
						this.props.updatePickupLocation(
							e.target.value,
							this.props.storeInformation
						)
					}
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
				<p>
					<b>
						<MdAdd />
						Add Special Instructions
					</b>
				</p>
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
						placeholder="Let us know about any special requests you have for this order"
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
		const { orderDetails, showSpecialInstructionsTextArea } = this.props;
		return (
			<div>
				<Form
					noValidate
					validated={this.state.validated}
					onSubmit={this.orderSubmitted}
				>
					{showSpecialInstructionsTextArea
						? this.renderTextArea()
						: this.renderTextAreaPlaceholder()}
					<hr />
					{this.renderShippingOptions()}
					{orderDetails.shippingMethod === "pickup"
						? this.renderLocationDropdown()
						: null}
					<hr />
					{this.renderDateTimeSelector()}
					<hr />
					{this.renderOrderButton()}
				</Form>
				<AuthModal
					show={this.state.showAuthModal}
					close={this.handleAuthModalClose}
					onSuccess={this.handleAuthModalSuccess}
				/>
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
		showSpecialInstructionsTextArea: state.menu.showSpecialInstructionsTextArea,
		orderItems: state.order.orderItems,
		totals: state.order.totals,
		auth: state.auth,
		navigation: state.navigation,
		paymentInformation: getFormValues("paymentInformationForm")(state),
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
	setSpecialInstructionsToggle,
})(ShoppingCartDetails);
