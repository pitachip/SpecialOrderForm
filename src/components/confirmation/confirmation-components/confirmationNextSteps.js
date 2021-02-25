//libs
import React from "react";
import { connect } from "react-redux";
//ui components
import Card from "react-bootstrap/Card";
import { Button } from "semantic-ui-react";
//utils
import { history } from "../../../utils/history";
//css
import "../confirmation-css/orderConfirmation.css";

class ConfirmationNextSteps extends React.Component {
	render() {
		return (
			<div className="sticky-top stickyTopOffset">
				<Card>
					<Card.Header>
						<b>What's next?</b>
					</Card.Header>
					<Card.Body>
						<Card.Title>In the meantime you can...</Card.Title>
						<Button fluid compact onClick={() => history.push("/order")}>
							Submit Another Order
						</Button>
						<div className="nextSteps">
							<h5>
								<span>or</span>
							</h5>
						</div>
						<Button
							fluid
							compact
							onClick={() => history.push("/account/orders")}
						>
							View Your Orders
						</Button>
					</Card.Body>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, {})(ConfirmationNextSteps);
