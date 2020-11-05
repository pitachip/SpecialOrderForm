//libs
import React from "react";
import { connect } from "react-redux";
import { IconContext } from "react-icons";
//ui components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MdCreditCard, MdAccountBalance, MdSchool } from "react-icons/md";
//actions
import { updatePaymentType } from "../../actions";
//css
import "./checkout-css/paymentDetails.css";

class PaymentOptions extends React.Component {
	paymentButtonClicked = (paymentType) => {
		console.log();
	};
	render() {
		return (
			<div>
				<Row>
					<Col className="d-flex justify-content-center">
						<div className="paymentType">
							<Button
								variant="outline-primary"
								size="lg"
								onClick={(e) => this.props.updatePaymentType("cc")}
							>
								<IconContext.Provider value={{ size: "2em" }}>
									<div>
										<MdCreditCard />
									</div>
								</IconContext.Provider>
							</Button>
							<p>Credit Card</p>
						</div>
					</Col>
					<Col className="d-flex justify-content-center">
						<div className="paymentType">
							<Button
								variant="outline-primary"
								size="lg"
								onClick={(e) => this.props.updatePaymentType("check")}
							>
								<IconContext.Provider value={{ size: "2em" }}>
									<div>
										<MdAccountBalance />
									</div>
								</IconContext.Provider>
							</Button>
							<p>Check/Purchase Order</p>
						</div>
					</Col>
					<Col className="d-flex justify-content-center">
						<div className="paymentType">
							<Button
								variant="outline-primary"
								size="lg"
								onClick={(e) => this.props.updatePaymentType("univ")}
							>
								<IconContext.Provider value={{ size: "2em" }}>
									<div>
										<MdSchool />
									</div>
								</IconContext.Provider>
							</Button>
							<p>University Money Account</p>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}
export default connect(null, { updatePaymentType })(PaymentOptions);
