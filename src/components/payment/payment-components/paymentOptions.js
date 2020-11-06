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
import { updatePaymentType } from "../../../actions";
//css
import "../payment-css/paymentDetails.css";

class PaymentOptions extends React.Component {
	paymentButtonClicked = (paymentType) => {
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
	};
};

export default connect(mapStateToProps, { updatePaymentType })(
	reduxForm({
		form: "paymentInformationForm",
	})(PaymentOptions)
);
