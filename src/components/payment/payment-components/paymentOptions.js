//libs
import React from "react";
import { connect } from "react-redux";
import { reduxForm, getFormValues, Field } from "redux-form";
//ui components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MdCreditCard, MdAccountBalance, MdSchool } from "react-icons/md";
//app components
import paymentOptionButton from "./paymentOptionButton";
//actions
import { updatePaymentType, updateOrderTotals } from "../../../actions";
//css
import "../payment-css/paymentDetails.css";

class PaymentOptions extends React.Component {
	paymentButtonClicked = (paymentType) => {
		/**
		 * Add tax back in if they chose tax exempt option
		 * They can choose it again on new chosen payment type
		 */
		if (this.props.paymentInformation.taxExempt) {
			const totals = this.props.orderTotals;
			let addTaxToTotal = totals;
			addTaxToTotal = {
				subTotal: totals.subTotal,
				tax: totals.subTotal * this.props.menuConfig.settings.taxRate,
				delivery: totals.delivery,
				total:
					totals.subTotal +
					totals.subTotal * this.props.menuConfig.settings.taxRate +
					totals.delivery,
			};

			this.props.updateOrderTotals(addTaxToTotal);
		}
		this.props.reset("paymentInformationForm");
		this.props.change("paymentType", paymentType);
	};

	render() {
		return (
			<div>
				<Row>
					<Col className="d-flex justify-content-center">
						<Field
							name="paymentType"
							component={paymentOptionButton}
							buttonClicked={(paymentType) =>
								this.paymentButtonClicked(paymentType)
							}
							paymentType="cc"
							paymentTypeText="Credit Card"
							paymentIcon={<MdCreditCard />}
						/>
					</Col>
					<Col className="d-flex justify-content-center">
						<Field
							name="paymentType"
							component={paymentOptionButton}
							buttonClicked={(paymentType) =>
								this.paymentButtonClicked(paymentType)
							}
							paymentType="check"
							paymentTypeText="Check/Purchase Order"
							paymentIcon={<MdAccountBalance />}
						/>
					</Col>
					<Col className="d-flex justify-content-center">
						<Field
							name="paymentType"
							component={paymentOptionButton}
							buttonClicked={(paymentType) =>
								this.paymentButtonClicked(paymentType)
							}
							paymentType="univ"
							paymentTypeText="University Money Account"
							paymentIcon={<MdSchool />}
						/>
					</Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		paymentInformation: getFormValues("paymentInformationForm")(state),
		orderTotals: state.order.totals,
		menuConfig: state.menu.menuConfig,
	};
};

export default connect(mapStateToProps, {
	updatePaymentType,
	updateOrderTotals,
})(
	reduxForm({
		form: "paymentInformationForm",
	})(PaymentOptions)
);
